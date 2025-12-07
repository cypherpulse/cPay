import { useState } from "react";
import { format } from "date-fns";
import { FileText, Loader2, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useInvoices } from "@/hooks/useInvoices";
import { useWallet } from "@/hooks/useWallet";
import { truncateAddress } from "@/mocks/mockApi";
import type { Invoice } from "@shared/schema";

const statusConfig = {
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    icon: Clock,
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  paid: {
    label: "Paid",
    variant: "default" as const,
    icon: CheckCircle,
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  expired: {
    label: "Expired",
    variant: "outline" as const,
    icon: XCircle,
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  },
};

export function InvoiceTable() {
  const { toast } = useToast();
  const { wallet } = useWallet();
  const { invoices, isLoading, payInvoice } = useInvoices();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  const handlePayInvoice = async () => {
    if (!selectedInvoice) return;
    
    setIsPaying(true);
    try {
      await payInvoice(selectedInvoice.id);
      toast({
        title: "Invoice paid!",
        description: `Successfully paid ${selectedInvoice.amount} ${selectedInvoice.token}`,
      });
      setSelectedInvoice(null);
    } catch (error: any) {
      toast({
        title: "Payment failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsPaying(false);
    }
  };

  const canPayInvoice = (invoice: Invoice) => {
    if (invoice.status !== "pending") return false;
    if (invoice.merchant === wallet.address) return false;
    if (invoice.payer && invoice.payer !== wallet.address) return false;
    return true;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border p-4">
                  <Skeleton className="h-10 w-10 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          ) : invoices.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium">No invoices yet</p>
              <p className="text-muted-foreground">
                Create your first invoice above
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {invoices.map((invoice) => {
                const status = statusConfig[invoice.status];
                const StatusIcon = status.icon;

                return (
                  <button
                    key={invoice.id}
                    onClick={() => setSelectedInvoice(invoice)}
                    className="flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors hover-elevate"
                    data-testid={`invoice-item-${invoice.id}`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium">
                          {invoice.id}
                        </span>
                        <Badge className={status.className}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {status.label}
                        </Badge>
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {invoice.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(invoice.createdAt, "MMM d, yyyy")}
                        {invoice.payer && ` - To: ${truncateAddress(invoice.payer)}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-lg font-semibold">
                        {invoice.amount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {invoice.token}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        {selectedInvoice && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-mono">
                <FileText className="h-5 w-5" />
                {selectedInvoice.id}
              </DialogTitle>
              <DialogDescription>Invoice details</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={statusConfig[selectedInvoice.status].className}>
                  {statusConfig[selectedInvoice.status].label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-mono font-semibold">
                  {selectedInvoice.amount} {selectedInvoice.token}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Merchant</span>
                <span className="font-mono text-sm">
                  {truncateAddress(selectedInvoice.merchant)}
                </span>
              </div>
              {selectedInvoice.payer && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payer</span>
                  <span className="font-mono text-sm">
                    {truncateAddress(selectedInvoice.payer)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">
                  {format(selectedInvoice.createdAt, "MMM d, yyyy h:mm a")}
                </span>
              </div>
              {selectedInvoice.paidAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Paid</span>
                  <span className="text-sm">
                    {format(selectedInvoice.paidAt, "MMM d, yyyy h:mm a")}
                  </span>
                </div>
              )}
              <div>
                <span className="text-sm text-muted-foreground">Description</span>
                <p className="mt-1 text-sm">{selectedInvoice.description}</p>
              </div>
            </div>

            <DialogFooter>
              {canPayInvoice(selectedInvoice) && (
                <Button
                  onClick={handlePayInvoice}
                  disabled={isPaying}
                  className="w-full"
                  data-testid="button-pay-invoice"
                >
                  {isPaying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Pay {selectedInvoice.amount} {selectedInvoice.token}
                    </>
                  )}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
