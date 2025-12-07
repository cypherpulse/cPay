import { Link, useLocation } from "wouter";
import { Home, ArrowUpRight, FileText, Activity, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { Loader2, Wallet } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/pay", label: "Pay & Request", icon: ArrowUpRight },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { href: "/dashboard/feed", label: "Activity", icon: Activity },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { wallet, connect, isConnecting } = useWallet();

  if (!wallet.isConnected) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Wallet className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-2xl font-semibold">Connect Your Wallet</h2>
          <p className="mb-6 text-muted-foreground">
            Connect your wallet to access the cPay dashboard and start sending and receiving payments.
          </p>
          <Button
            size="lg"
            onClick={connect}
            disabled={isConnecting}
            className="gap-2"
            data-testid="button-connect-dashboard"
          >
            {isConnecting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Wallet className="h-5 w-5" />
            )}
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <aside className="hidden w-56 shrink-0 border-r bg-sidebar lg:block">
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? location === "/dashboard"
                : location.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 font-medium",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
          {children}
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t bg-background lg:hidden">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? location === "/dashboard"
              : location.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 text-xs",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                data-testid={`nav-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label.split(" ")[0]}</span>
              </button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
