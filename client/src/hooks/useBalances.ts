import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import type { Balances } from "@shared/schema";
import { mockGetBalances } from "@/mocks/mockApi";
import { subscribeToMockState, getSnapshot } from "@/mocks/mockState";
import { useWallet } from "./useWallet";
import { useConfig } from "./useConfig";

export function useBalances() {
  const { wallet } = useWallet();
  const { config } = useConfig();
  const [balances, setBalances] = useState<Balances>({ celo: "0.00", cusd: "0.00" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useSyncExternalStore(subscribeToMockState, getSnapshot);

  const fetchBalances = useCallback(async () => {
    if (!wallet.address) {
      setBalances({ celo: "0.00", cusd: "0.00" });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (config.mockMode) {
        const data = await mockGetBalances(wallet.address);
        setBalances(data);
      } else {
        setBalances({ celo: "0.00", cusd: "0.00" });
      }
    } catch (err) {
      setError("Failed to fetch balances");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [wallet.address, config.mockMode]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  useEffect(() => {
    if (config.mockMode && wallet.address) {
      const unsubscribe = subscribeToMockState(() => {
        mockGetBalances(wallet.address!).then(setBalances);
      });
      return unsubscribe;
    }
  }, [config.mockMode, wallet.address]);

  return { balances, isLoading, error, refetch: fetchBalances };
}
