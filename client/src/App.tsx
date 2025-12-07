import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { ConfigContext, useConfigState } from "@/hooks/useConfig";
import { WalletContext, useWalletState } from "@/hooks/useWallet";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/:rest*" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppProviders({ children }: { children: React.ReactNode }) {
  const configState = useConfigState();
  
  return (
    <ConfigContext.Provider value={configState}>
      <WalletProviderWrapper>{children}</WalletProviderWrapper>
    </ConfigContext.Provider>
  );
}

function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  const walletState = useWalletState();
  
  return (
    <WalletContext.Provider value={walletState}>
      {children}
    </WalletContext.Provider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProviders>
          <div className="min-h-screen bg-background">
            <Header />
            <Router />
          </div>
          <Toaster />
        </AppProviders>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
