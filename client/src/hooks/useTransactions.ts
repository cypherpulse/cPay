import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import type { Transaction, SendPaymentInput, RequestPaymentInput } from "@shared/schema";
import { mockGetTransactions, mockSend, mockRequest } from "@/mocks/mockApi";
import { subscribeToMockState, getSnapshot } from "@/mocks/mockState";
import { useWallet } from "./useWallet";
import { useConfig } from "./useConfig";

export function useTransactions() {
  const { wallet } = useWallet();
  const { config } = useConfig();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useSyncExternalStore(subscribeToMockState, getSnapshot);

  const fetchTransactions = useCallback(async () => {
    if (!wallet.address) {
      setTransactions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (config.mockMode) {
        const data = await mockGetTransactions(wallet.address);
        setTransactions(data);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      setError("Failed to fetch transactions");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [wallet.address, config.mockMode]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (config.mockMode && wallet.address) {
      const unsubscribe = subscribeToMockState(() => {
        mockGetTransactions(wallet.address!).then(setTransactions);
      });
      return unsubscribe;
    }
  }, [config.mockMode, wallet.address]);

  const sendPayment = useCallback(
    async (input: SendPaymentInput) => {
      if (!wallet.address) throw new Error("Not connected");

      if (config.mockMode) {
        return await mockSend(wallet.address, input);
      } else {
        throw new Error("Live mode not implemented");
      }
    },
    [wallet.address, config.mockMode]
  );

  const requestPayment = useCallback(
    async (input: RequestPaymentInput) => {
      if (!wallet.address) throw new Error("Not connected");

      if (config.mockMode) {
        return await mockRequest(wallet.address, input);
      } else {
        throw new Error("Live mode not implemented");
      }
    },
    [wallet.address, config.mockMode]
  );

  return { transactions, isLoading, error, refetch: fetchTransactions, sendPayment, requestPayment };
}
