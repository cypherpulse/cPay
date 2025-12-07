import { z } from "zod";

export type TokenType = "CELO" | "cUSD";

export type TransactionType = "send" | "receive" | "invoice_created" | "invoice_paid" | "request_created" | "request_received";

export type InvoiceStatus = "pending" | "paid" | "expired";

export type FeedItemType = "send" | "receive" | "invoice_created" | "invoice_paid" | "request_sent" | "request_received";

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
  networkName: string;
  isCorrectNetwork: boolean;
}

export interface Balances {
  celo: string;
  cusd: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  from: string;
  to: string;
  amount: string;
  token: TokenType;
  note?: string;
  timestamp: number;
  txHash?: string;
}

export interface Invoice {
  id: string;
  merchant: string;
  payer: string | null;
  amount: string;
  token: TokenType;
  description: string;
  status: InvoiceStatus;
  createdAt: number;
  paidAt?: number;
}

export interface PaymentRequest {
  id: string;
  requester: string;
  payer: string | null;
  amount: string;
  token: TokenType;
  note?: string;
  createdAt: number;
  isPaid: boolean;
}

export interface FeedItem {
  id: string;
  type: FeedItemType;
  actor: string;
  recipient?: string;
  amount: string;
  token: TokenType;
  note?: string;
  invoiceId?: string;
  timestamp: number;
}

export interface UserProfile {
  address: string;
  username?: string;
  avatarSeed: string;
}

export const sendPaymentSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  amount: z.string().min(1, "Amount is required").refine((val) => parseFloat(val) > 0, "Amount must be greater than 0"),
  token: z.enum(["CELO", "cUSD"]),
  note: z.string().optional(),
});

export type SendPaymentInput = z.infer<typeof sendPaymentSchema>;

export const requestPaymentSchema = z.object({
  payer: z.string().min(1, "Payer address is required"),
  amount: z.string().min(1, "Amount is required").refine((val) => parseFloat(val) > 0, "Amount must be greater than 0"),
  token: z.enum(["CELO", "cUSD"]),
  note: z.string().optional(),
});

export type RequestPaymentInput = z.infer<typeof requestPaymentSchema>;

export const createInvoiceSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine((val) => parseFloat(val) > 0, "Amount must be greater than 0"),
  token: z.enum(["CELO", "cUSD"]),
  payer: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;

export interface AppConfig {
  mockMode: boolean;
  celoRpcUrl: string;
  contracts: {
    merchantRegistry: string;
    cPayPayments: string;
    cUSD: string;
  };
}

export const CELO_MAINNET_CHAIN_ID = 42220;
export const CELO_ALFAJORES_CHAIN_ID = 44787;
