import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  FileText, 
  CheckCircle, 
  HandCoins,
  Activity 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useFeed } from "@/hooks/useFeed";
import { truncateAddress, mockGetUsername } from "@/mocks/mockApi";
import type { FeedItem, FeedItemType } from "@shared/schema";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "sent", label: "Sent" },
  { value: "received", label: "Received" },
  { value: "invoices", label: "Invoices" },
];

const feedTypeConfig: Record<FeedItemType, { icon: typeof ArrowUpRight; label: string; colorClass: string }> = {
  send: {
    icon: ArrowUpRight,
    label: "Sent to",
    colorClass: "bg-destructive/10 text-destructive",
  },
  receive: {
    icon: ArrowDownLeft,
    label: "Received from",
    colorClass: "bg-primary/10 text-primary",
  },
  invoice_created: {
    icon: FileText,
    label: "Created invoice",
    colorClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  invoice_paid: {
    icon: CheckCircle,
    label: "Invoice paid by",
    colorClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  request_sent: {
    icon: HandCoins,
    label: "Requested from",
    colorClass: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  request_received: {
    icon: HandCoins,
    label: "Request from",
    colorClass: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
};

function FeedItemCard({ item }: { item: FeedItem }) {
  const config = feedTypeConfig[item.type];
  const Icon = config.icon;

  const getDescription = () => {
    switch (item.type) {
      case "send":
        return `${config.label} @${mockGetUsername(item.recipient || "")}`;
      case "receive":
        return `${config.label} @${mockGetUsername(item.actor)}`;
      case "invoice_created":
        return `${config.label} #${item.invoiceId}`;
      case "invoice_paid":
        return `${config.label} @${mockGetUsername(item.actor)}`;
      case "request_sent":
        return `${config.label} @${mockGetUsername(item.recipient || "")}`;
      case "request_received":
        return `${config.label} @${mockGetUsername(item.actor)}`;
      default:
        return "";
    }
  };

  const getAmountPrefix = () => {
    if (item.type === "send" || item.type === "request_sent") return "-";
    if (item.type === "receive" || item.type === "invoice_paid") return "+";
    return "";
  };

  const getAmountColor = () => {
    if (item.type === "send" || item.type === "request_sent") return "text-destructive";
    if (item.type === "receive" || item.type === "invoice_paid") return "text-primary";
    return "";
  };

  return (
    <div
      className="flex items-start gap-3 border-b py-4 last:border-b-0"
      data-testid={`feed-item-${item.id}`}
    >
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", config.colorClass)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium">{getDescription()}</p>
        {item.note && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            "{item.note}"
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          {formatDistanceToNow(item.timestamp, { addSuffix: true })}
        </p>
      </div>
      <div className="text-right">
        <p className={cn("font-mono font-semibold", getAmountColor())}>
          {getAmountPrefix()}{item.amount}
        </p>
        <p className="text-sm text-muted-foreground">{item.token}</p>
      </div>
    </div>
  );
}

export function FeedList() {
  const [filter, setFilter] = useState("all");
  const { feedItems, isLoading } = useFeed(filter);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Activity Feed
        </CardTitle>
        <div className="flex gap-1 overflow-x-auto">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                filter === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover-elevate"
              )}
              data-testid={`filter-${option.value}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-3 py-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : feedItems.length === 0 ? (
          <div className="py-12 text-center">
            <Activity className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No activity yet</p>
            <p className="text-muted-foreground">
              Your payment activity will appear here
            </p>
          </div>
        ) : (
          <div>
            {feedItems.map((item) => (
              <FeedItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
