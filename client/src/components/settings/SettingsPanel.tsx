import { Settings, Wallet, Globe, Code, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useConfig } from "@/hooks/useConfig";
import { useWallet } from "@/hooks/useWallet";
import { truncateAddress } from "@/mocks/mockApi";

export function SettingsPanel() {
  const { config, setMockMode } = useConfig();
  const { wallet } = useWallet();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet
          </CardTitle>
          <CardDescription>Your connected wallet information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-muted-foreground">Address</Label>
            <span className="font-mono text-sm" data-testid="text-wallet-address">
              {wallet.address ? truncateAddress(wallet.address) : "Not connected"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-muted-foreground">Network</Label>
            <Badge variant="outline" data-testid="text-network">
              {wallet.networkName}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-muted-foreground">Chain ID</Label>
            <span className="font-mono text-sm">
              {wallet.chainId || "-"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Developer Mode
          </CardTitle>
          <CardDescription>
            Toggle between mock mode and live blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Mock Mode</Label>
              <p className="text-sm text-muted-foreground">
                Use simulated data instead of live blockchain
              </p>
            </div>
            <Switch
              checked={config.mockMode}
              onCheckedChange={setMockMode}
              data-testid="switch-mock-mode"
            />
          </div>
          {config.mockMode && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
              Mock mode is enabled. All data is simulated and no real transactions will be made.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Network Configuration
          </CardTitle>
          <CardDescription>
            Contract addresses and RPC settings (read-only in mock mode)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rpc-url">Celo RPC URL</Label>
            <Input
              id="rpc-url"
              value={config.celoRpcUrl}
              readOnly
              className="font-mono text-sm"
              data-testid="input-rpc-url"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="merchant-registry">MerchantRegistry Contract</Label>
            <Input
              id="merchant-registry"
              value={config.contracts.merchantRegistry}
              readOnly
              className="font-mono text-sm"
              data-testid="input-merchant-registry"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpay-payments">cPayPayments Contract</Label>
            <Input
              id="cpay-payments"
              value={config.contracts.cPayPayments}
              readOnly
              className="font-mono text-sm"
              data-testid="input-cpay-payments"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cusd-contract">cUSD Contract</Label>
            <Input
              id="cusd-contract"
              value={config.contracts.cUSD}
              readOnly
              className="font-mono text-sm"
              data-testid="input-cusd-contract"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            About cPay
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            cPay is a social payment application built on the Celo network, enabling fast and affordable payments with CELO and cUSD stablecoins.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://celo.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Celo Network
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-muted-foreground">|</span>
            <a
              href="https://docs.celo.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Documentation
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
