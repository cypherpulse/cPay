import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBalances } from "@/hooks/useBalances";
import { useTransactions } from "@/hooks/useTransactions";
import { truncateAddress, mockGetUsername } from "@/mocks/mockApi";
import { formatDistanceToNow } from "date-fns";

function CeloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="12" fill="url(#celoGradient)" />
      <path
        d="M12 5C8.13 5 5 8.13 5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="celoGradient" x1="0" y1="0" x2="24" y2="24">
          <stop stopColor="#FCFF52" />
          <stop offset="1" stopColor="#35D07F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CusdIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="12" fill="#45CD85" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        fontFamily="Inter, sans-serif"
      >
        $
      </text>
    </svg>
  );
}

export function OverviewCards() {
  const { balances, isLoading: balancesLoading } = useBalances();
  const { transactions, isLoading: txLoading } = useTransactions();

  const recentTx = transactions.slice(0, 5);

  const totalSent = transactions
    .filter((t) => t.type === "send")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalReceived = transactions
    .filter((t) => t.type === "receive" || t.type === "invoice_paid")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-emerald-400/10 to-emerald-600/10" />
          <CardHeader className="relative flex flex-row items-center justify-between gap-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              CELO Balance
            </CardTitle>
            <CeloIcon className="h-8 w-8" />
          </CardHeader>
          <CardContent className="relative">
            {balancesLoading ? (
              <Skeleton className="h-9 w-32" />
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold" data-testid="text-celo-balance">
                  {parseFloat(balances.celo).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-sm text-muted-foreground">CELO</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-emerald-600/10" />
          <CardHeader className="relative flex flex-row items-center justify-between gap-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              cUSD Balance
            </CardTitle>
            <CusdIcon className="h-8 w-8" />
          </CardHeader>
          <CardContent className="relative">
            {balancesLoading ? (
              <Skeleton className="h-9 w-32" />
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold" data-testid="text-cusd-balance">
                  {parseFloat(balances.cusd).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-sm text-muted-foreground">cUSD</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sent
            </CardTitle>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {txLoading ? (
              <Skeleton className="h-7 w-24" />
            ) : (
              <p className="font-mono text-2xl font-semibold" data-testid="text-total-sent">
                ${totalSent.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Received
            </CardTitle>
            <ArrowDownLeft className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {txLoading ? (
              <Skeleton className="h-7 w-24" />
            ) : (
              <p className="font-mono text-2xl font-semibold" data-testid="text-total-received">
                ${totalReceived.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {txLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </div>
          ) : recentTx.length === 0 ? (
            <p className="py-6 text-center text-muted-foreground">
              No recent transactions
            </p>
          ) : (
            <div className="space-y-4">
              {recentTx.map((tx) => {
                const isSend = tx.type === "send";
                const otherAddress = isSend ? tx.to : tx.from;
                const username = mockGetUsername(otherAddress);

                return (
                  <div
                    key={tx.id}
                    className="flex items-center gap-3"
                    data-testid={`tx-item-${tx.id}`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isSend
                          ? "bg-destructive/10 text-destructive"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {isSend ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : (
                        <ArrowDownLeft className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">
                        {isSend ? "Sent to " : "Received from "}
                        <span className="text-muted-foreground">@{username}</span>
                      </p>
                      {tx.note && (
                        <p className="truncate text-sm text-muted-foreground">
                          {tx.note}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-mono font-semibold ${
                          isSend ? "text-destructive" : "text-primary"
                        }`}
                      >
                        {isSend ? "-" : "+"}
                        {tx.amount} {tx.token}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
