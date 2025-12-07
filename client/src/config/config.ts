import type { AppConfig } from "@shared/schema";
import { CELO_ALFAJORES_CHAIN_ID } from "@shared/schema";

export const defaultConfig: AppConfig = {
  mockMode: true,
  celoRpcUrl: "https://alfajores-forno.celo-testnet.org",
  contracts: {
    merchantRegistry: "0x0000000000000000000000000000000000000000",
    cPayPayments: "0x0000000000000000000000000000000000000000",
    cUSD: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  },
};

export const SUPPORTED_CHAIN_IDS = [42220, 44787];

export function getNetworkName(chainId: number | null): string {
  switch (chainId) {
    case 42220:
      return "Celo Mainnet";
    case 44787:
      return "Celo Alfajores";
    default:
      return "Unknown Network";
  }
}

export function isValidCeloNetwork(chainId: number | null): boolean {
  return chainId !== null && SUPPORTED_CHAIN_IDS.includes(chainId);
}

export const MOCK_USER_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71";
export const DEFAULT_CHAIN_ID = CELO_ALFAJORES_CHAIN_ID;
