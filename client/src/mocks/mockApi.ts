import type { 
  Balances, 
  Transaction, 
  Invoice, 
  PaymentRequest, 
  FeedItem, 
  TokenType,
  SendPaymentInput,
  RequestPaymentInput,
  CreateInvoiceInput,
} from "@shared/schema";
import { mockState, notifyListeners } from "./mockState";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const generateId = () => Math.random().toString(36).substring(2, 15);

export async function mockGetBalances(address: string): Promise<Balances> {
  await delay(300);
  return mockState.balances[address] || { celo: "0.00", cusd: "0.00" };
}

export async function mockSend(
  from: string,
  input: SendPaymentInput
): Promise<Transaction> {
  await delay(800);

  const { recipient, amount, token, note } = input;
  
  const currentBalance = mockState.balances[from] || { celo: "0.00", cusd: "0.00" };
  const balanceKey = token === "CELO" ? "celo" : "cusd";
  const currentAmount = parseFloat(currentBalance[balanceKey]);
  const sendAmount = parseFloat(amount);

  if (sendAmount > currentAmount) {
    throw new Error("Insufficient balance");
  }

  mockState.balances[from] = {
    ...currentBalance,
    [balanceKey]: (currentAmount - sendAmount).toFixed(2),
  };

  if (!mockState.balances[recipient]) {
    mockState.balances[recipient] = { celo: "0.00", cusd: "0.00" };
  }
  const recipientBalance = mockState.balances[recipient];
  const recipientAmount = parseFloat(recipientBalance[balanceKey]);
  mockState.balances[recipient] = {
    ...recipientBalance,
    [balanceKey]: (recipientAmount + sendAmount).toFixed(2),
  };

  const transaction: Transaction = {
    id: generateId(),
    type: "send",
    from,
    to: recipient,
    amount,
    token,
    note,
    timestamp: Date.now(),
    txHash: "0x" + generateId() + generateId(),
  };

  mockState.transactions.unshift(transaction);

  const feedItem: FeedItem = {
    id: generateId(),
    type: "send",
    actor: from,
    recipient,
    amount,
    token,
    note,
    timestamp: Date.now(),
  };
  mockState.feedItems.unshift(feedItem);

  notifyListeners();
  return transaction;
}

export async function mockRequest(
  requester: string,
  input: RequestPaymentInput
): Promise<PaymentRequest> {
  await delay(500);

  const { payer, amount, token, note } = input;

  const request: PaymentRequest = {
    id: generateId(),
    requester,
    payer,
    amount,
    token,
    note,
    createdAt: Date.now(),
    isPaid: false,
  };

  mockState.paymentRequests.unshift(request);

  const feedItem: FeedItem = {
    id: generateId(),
    type: "request_sent",
    actor: requester,
    recipient: payer,
    amount,
    token,
    note,
    timestamp: Date.now(),
  };
  mockState.feedItems.unshift(feedItem);

  notifyListeners();
  return request;
}

export async function mockCreateInvoice(
  merchant: string,
  input: CreateInvoiceInput
): Promise<Invoice> {
  await delay(600);

  const { amount, token, payer, description } = input;

  const invoice: Invoice = {
    id: "inv_" + generateId(),
    merchant,
    payer: payer || null,
    amount,
    token,
    description,
    status: "pending",
    createdAt: Date.now(),
  };

  mockState.invoices.unshift(invoice);

  const feedItem: FeedItem = {
    id: generateId(),
    type: "invoice_created",
    actor: merchant,
    amount,
    token,
    note: description,
    invoiceId: invoice.id,
    timestamp: Date.now(),
  };
  mockState.feedItems.unshift(feedItem);

  notifyListeners();
  return invoice;
}

export async function mockPayInvoice(
  payer: string,
  invoiceId: string
): Promise<Invoice> {
  await delay(800);

  const invoice = mockState.invoices.find((i) => i.id === invoiceId);
  if (!invoice) {
    throw new Error("Invoice not found");
  }

  if (invoice.status === "paid") {
    throw new Error("Invoice already paid");
  }

  const balanceKey = invoice.token === "CELO" ? "celo" : "cusd";
  const payerBalance = mockState.balances[payer] || { celo: "0.00", cusd: "0.00" };
  const currentAmount = parseFloat(payerBalance[balanceKey]);
  const invoiceAmount = parseFloat(invoice.amount);

  if (invoiceAmount > currentAmount) {
    throw new Error("Insufficient balance");
  }

  mockState.balances[payer] = {
    ...payerBalance,
    [balanceKey]: (currentAmount - invoiceAmount).toFixed(2),
  };

  const merchantBalance = mockState.balances[invoice.merchant] || { celo: "0.00", cusd: "0.00" };
  const merchantAmount = parseFloat(merchantBalance[balanceKey]);
  mockState.balances[invoice.merchant] = {
    ...merchantBalance,
    [balanceKey]: (merchantAmount + invoiceAmount).toFixed(2),
  };

  invoice.status = "paid";
  invoice.paidAt = Date.now();
  invoice.payer = payer;

  const transaction: Transaction = {
    id: generateId(),
    type: "invoice_paid",
    from: payer,
    to: invoice.merchant,
    amount: invoice.amount,
    token: invoice.token,
    note: invoice.description,
    timestamp: Date.now(),
    txHash: "0x" + generateId() + generateId(),
  };
  mockState.transactions.unshift(transaction);

  const feedItem: FeedItem = {
    id: generateId(),
    type: "invoice_paid",
    actor: payer,
    recipient: invoice.merchant,
    amount: invoice.amount,
    token: invoice.token,
    note: invoice.description,
    invoiceId: invoice.id,
    timestamp: Date.now(),
  };
  mockState.feedItems.unshift(feedItem);

  notifyListeners();
  return invoice;
}

export async function mockGetInvoicesForUser(address: string): Promise<Invoice[]> {
  await delay(300);
  return mockState.invoices.filter(
    (i) => i.merchant === address || i.payer === address
  );
}

export async function mockGetFeed(filter?: string): Promise<FeedItem[]> {
  await delay(300);
  if (!filter || filter === "all") {
    return [...mockState.feedItems];
  }
  return mockState.feedItems.filter((item) => {
    if (filter === "sent") return item.type === "send" || item.type === "request_sent";
    if (filter === "received") return item.type === "receive" || item.type === "request_received";
    if (filter === "invoices") return item.type === "invoice_created" || item.type === "invoice_paid";
    return true;
  });
}

export async function mockGetTransactions(address: string): Promise<Transaction[]> {
  await delay(300);
  return mockState.transactions.filter(
    (t) => t.from === address || t.to === address
  );
}

export function mockGetUser(address: string) {
  return mockState.users[address];
}

export function mockGetUsername(address: string): string {
  const user = mockState.users[address];
  return user?.username || truncateAddress(address);
}

export function truncateAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
