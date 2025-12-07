import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import type { Invoice, CreateInvoiceInput } from "@shared/schema";
import { mockGetInvoicesForUser, mockCreateInvoice, mockPayInvoice } from "@/mocks/mockApi";
import { subscribeToMockState, getSnapshot } from "@/mocks/mockState";
import { useWallet } from "./useWallet";
import { useConfig } from "./useConfig";

export function useInvoices() {
  const { wallet } = useWallet();
  const { config } = useConfig();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useSyncExternalStore(subscribeToMockState, getSnapshot);

  const fetchInvoices = useCallback(async () => {
    if (!wallet.address) {
      setInvoices([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (config.mockMode) {
        const data = await mockGetInvoicesForUser(wallet.address);
        setInvoices(data);
      } else {
        setInvoices([]);
      }
    } catch (err) {
      setError("Failed to fetch invoices");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [wallet.address, config.mockMode]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  useEffect(() => {
    if (config.mockMode && wallet.address) {
      const unsubscribe = subscribeToMockState(() => {
        mockGetInvoicesForUser(wallet.address!).then(setInvoices);
      });
      return unsubscribe;
    }
  }, [config.mockMode, wallet.address]);

  const createInvoice = useCallback(
    async (input: CreateInvoiceInput) => {
      if (!wallet.address) throw new Error("Not connected");

      if (config.mockMode) {
        return await mockCreateInvoice(wallet.address, input);
      } else {
        throw new Error("Live mode not implemented");
      }
    },
    [wallet.address, config.mockMode]
  );

  const payInvoice = useCallback(
    async (invoiceId: string) => {
      if (!wallet.address) throw new Error("Not connected");

      if (config.mockMode) {
        return await mockPayInvoice(wallet.address, invoiceId);
      } else {
        throw new Error("Live mode not implemented");
      }
    },
    [wallet.address, config.mockMode]
  );

  return { invoices, isLoading, error, refetch: fetchInvoices, createInvoice, payInvoice };
}
