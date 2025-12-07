import { Wallet, AlertTriangle, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useWallet } from "@/hooks/useWallet";
import { useConfig } from "@/hooks/useConfig";
import { truncateAddress } from "@/mocks/mockApi";
import { Link } from "wouter";

export function Header() {
  const { wallet, connect, disconnect, switchToCelo, isConnecting } = useWallet();
  const { config } = useConfig();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-400">
            <span className="text-sm font-bold text-white">cP</span>
          </div>
          <span className="text-xl font-semibold tracking-tight" data-testid="text-logo">
            cPay
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          {config.mockMode && (
            <Badge variant="secondary" className="hidden text-xs sm:inline-flex">
              Mock Mode
            </Badge>
          )}

          {wallet.isConnected && !wallet.isCorrectNetwork && (
            <Button
              variant="destructive"
              size="sm"
              onClick={switchToCelo}
              className="hidden gap-1.5 sm:inline-flex"
              data-testid="button-switch-network"
            >
              <AlertTriangle className="h-4 w-4" />
              Switch to Celo
            </Button>
          )}

          {wallet.isConnected && wallet.isCorrectNetwork && (
            <Badge variant="outline" className="hidden font-normal sm:inline-flex">
              {wallet.networkName}
            </Badge>
          )}

          {wallet.isConnected ? (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 font-mono text-sm"
                data-testid="button-wallet-address"
              >
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {truncateAddress(wallet.address || "")}
                </span>
                <span className="sm:hidden">
                  {wallet.address?.slice(0, 4)}...
                </span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={disconnect}
                data-testid="button-disconnect"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={connect}
              disabled={isConnecting}
              className="gap-2"
              data-testid="button-connect-wallet"
            >
              {isConnecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Wallet className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Connect Wallet</span>
              <span className="sm:hidden">Connect</span>
            </Button>
          )}

          <ThemeToggle />
        </div>
      </div>

      {wallet.isConnected && !wallet.isCorrectNetwork && (
        <div className="flex items-center justify-center gap-2 border-t bg-destructive/10 px-4 py-2 text-sm text-destructive sm:hidden">
          <AlertTriangle className="h-4 w-4" />
          <span>Wrong network</span>
          <Button
            variant="destructive"
            size="sm"
            onClick={switchToCelo}
            data-testid="button-switch-network-mobile"
          >
            Switch
          </Button>
        </div>
      )}
    </header>
  );
}
