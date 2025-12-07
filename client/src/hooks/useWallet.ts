import { useState, useCallback, createContext, useContext, useEffect } from "react";
import type { WalletState } from "@shared/schema";
import { MOCK_USER_ADDRESS, DEFAULT_CHAIN_ID, getNetworkName, isValidCeloNetwork } from "@/config/config";
import { useConfig } from "./useConfig";

interface WalletContextType {
  wallet: WalletState;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchToCelo: () => Promise<void>;
  isConnecting: boolean;
}

export const WalletContext = createContext<WalletContextType | null>(null);

export function useWalletState() {
  const { config } = useConfig();
  const [isConnecting, setIsConnecting] = useState(false);
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
    networkName: "Not Connected",
    isCorrectNetwork: false,
  });

  const connect = useCallback(async () => {
    setIsConnecting(true);
    
    try {
      if (config.mockMode) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setWallet({
          address: MOCK_USER_ADDRESS,
          isConnected: true,
          chainId: DEFAULT_CHAIN_ID,
          networkName: getNetworkName(DEFAULT_CHAIN_ID),
          isCorrectNetwork: true,
        });
      } else {
        if (typeof window !== "undefined" && (window as any).ethereum) {
          const accounts = await (window as any).ethereum.request({
            method: "eth_requestAccounts",
          });
          const chainId = await (window as any).ethereum.request({
            method: "eth_chainId",
          });
          const chainIdNum = parseInt(chainId, 16);
          
          setWallet({
            address: accounts[0],
            isConnected: true,
            chainId: chainIdNum,
            networkName: getNetworkName(chainIdNum),
            isCorrectNetwork: isValidCeloNetwork(chainIdNum),
          });
        } else {
          throw new Error("No wallet detected. Please install MetaMask or a Celo-compatible wallet.");
        }
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, [config.mockMode]);

  const disconnect = useCallback(() => {
    setWallet({
      address: null,
      isConnected: false,
      chainId: null,
      networkName: "Not Connected",
      isCorrectNetwork: false,
    });
  }, []);

  const switchToCelo = useCallback(async () => {
    if (config.mockMode) {
      setWallet((prev) => ({
        ...prev,
        chainId: DEFAULT_CHAIN_ID,
        networkName: getNetworkName(DEFAULT_CHAIN_ID),
        isCorrectNetwork: true,
      }));
      return;
    }

    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        await (window as any).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaef3" }],
        });
      } catch (error: any) {
        if (error.code === 4902) {
          await (window as any).ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xaef3",
                chainName: "Celo Alfajores Testnet",
                nativeCurrency: {
                  name: "CELO",
                  symbol: "CELO",
                  decimals: 18,
                },
                rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
                blockExplorerUrls: ["https://alfajores.celoscan.io"],
              },
            ],
          });
        }
      }
    }
  }, [config.mockMode]);

  useEffect(() => {
    if (!config.mockMode && typeof window !== "undefined" && (window as any).ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setWallet((prev) => ({
            ...prev,
            address: accounts[0],
          }));
        }
      };

      const handleChainChanged = (chainId: string) => {
        const chainIdNum = parseInt(chainId, 16);
        setWallet((prev) => ({
          ...prev,
          chainId: chainIdNum,
          networkName: getNetworkName(chainIdNum),
          isCorrectNetwork: isValidCeloNetwork(chainIdNum),
        }));
      };

      (window as any).ethereum.on("accountsChanged", handleAccountsChanged);
      (window as any).ethereum.on("chainChanged", handleChainChanged);

      return () => {
        (window as any).ethereum.removeListener("accountsChanged", handleAccountsChanged);
        (window as any).ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [config.mockMode, disconnect]);

  return { wallet, connect, disconnect, switchToCelo, isConnecting };
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
}
