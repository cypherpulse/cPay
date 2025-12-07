import type { Balances, Transaction, Invoice, PaymentRequest, FeedItem, UserProfile } from "@shared/schema";

export interface MockState {
  balances: Record<string, Balances>;
  transactions: Transaction[];
  invoices: Invoice[];
  paymentRequests: PaymentRequest[];
  feedItems: FeedItem[];
  users: Record<string, UserProfile>;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

const mockUsers: Record<string, UserProfile> = {
  "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71": {
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    username: "alice",
    avatarSeed: "alice123",
  },
  "0x8ba1f109551bD432803012645Ac136ddd64DBA72": {
    address: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    username: "bob",
    avatarSeed: "bob456",
  },
  "0xdD2FD4581271e230360230F9337D5c0430Bf44C0": {
    address: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    username: "carol",
    avatarSeed: "carol789",
  },
  "0x2546BcD3c84621e976D8185a91A922aE77ECEc30": {
    address: "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
    username: "dave",
    avatarSeed: "dave012",
  },
};

const now = Date.now();
const hour = 3600000;
const day = 86400000;

const initialFeedItems: FeedItem[] = [
  {
    id: generateId(),
    type: "send",
    actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    recipient: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    amount: "25.00",
    token: "cUSD",
    note: "Lunch at the cafe",
    timestamp: now - 2 * hour,
  },
  {
    id: generateId(),
    type: "receive",
    actor: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    recipient: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    amount: "100.00",
    token: "CELO",
    note: "Thanks for the help!",
    timestamp: now - 5 * hour,
  },
  {
    id: generateId(),
    type: "invoice_created",
    actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    amount: "500.00",
    token: "cUSD",
    note: "Web design services",
    invoiceId: "inv_001",
    timestamp: now - 1 * day,
  },
  {
    id: generateId(),
    type: "invoice_paid",
    actor: "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
    recipient: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    amount: "250.00",
    token: "cUSD",
    note: "Logo design",
    invoiceId: "inv_002",
    timestamp: now - 2 * day,
  },
  {
    id: generateId(),
    type: "request_sent",
    actor: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    recipient: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    amount: "50.00",
    token: "cUSD",
    note: "Rent share for December",
    timestamp: now - 3 * day,
  },
];

const initialTransactions: Transaction[] = [
  {
    id: generateId(),
    type: "send",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    amount: "25.00",
    token: "cUSD",
    note: "Lunch at the cafe",
    timestamp: now - 2 * hour,
    txHash: "0x" + generateId() + generateId(),
  },
  {
    id: generateId(),
    type: "receive",
    from: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    amount: "100.00",
    token: "CELO",
    note: "Thanks for the help!",
    timestamp: now - 5 * hour,
    txHash: "0x" + generateId() + generateId(),
  },
  {
    id: generateId(),
    type: "invoice_paid",
    from: "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    amount: "250.00",
    token: "cUSD",
    note: "Logo design",
    timestamp: now - 2 * day,
    txHash: "0x" + generateId() + generateId(),
  },
];

const initialInvoices: Invoice[] = [
  {
    id: "inv_001",
    merchant: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    payer: null,
    amount: "500.00",
    token: "cUSD",
    description: "Web design services",
    status: "pending",
    createdAt: now - 1 * day,
  },
  {
    id: "inv_002",
    merchant: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    payer: "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
    amount: "250.00",
    token: "cUSD",
    description: "Logo design",
    status: "paid",
    createdAt: now - 5 * day,
    paidAt: now - 2 * day,
  },
  {
    id: "inv_003",
    merchant: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71",
    payer: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    amount: "75.00",
    token: "CELO",
    description: "Consultation fee",
    status: "pending",
    createdAt: now - 12 * hour,
  },
];

export const mockState: MockState = {
  balances: {
    "0x742d35Cc6634C0532925a3b844Bc9e7595f8fF71": {
      celo: "1234.56",
      cusd: "5678.90",
    },
  },
  transactions: initialTransactions,
  invoices: initialInvoices,
  paymentRequests: [],
  feedItems: initialFeedItems,
  users: mockUsers,
};

let listeners: (() => void)[] = [];

export function subscribeToMockState(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function notifyListeners() {
  listeners.forEach((l) => l());
}

export function getSnapshot() {
  return mockState;
}
