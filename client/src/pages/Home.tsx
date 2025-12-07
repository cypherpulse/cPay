import { Link } from "wouter";
import { ArrowRight, Wallet, Send, FileText, Users, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWallet } from "@/hooks/useWallet";

const features = [
  {
    icon: Send,
    title: "Send & Receive",
    description: "Transfer CELO and cUSD instantly to any wallet address with optional notes",
  },
  {
    icon: FileText,
    title: "Invoices",
    description: "Create and manage invoices for your business or freelance work",
  },
  {
    icon: Users,
    title: "Social Feed",
    description: "See your payment activity and stay connected with your network",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Built on Celo's secure, mobile-first blockchain network",
  },
  {
    icon: Zap,
    title: "Fast & Cheap",
    description: "Sub-second finality with minimal transaction fees",
  },
  {
    icon: Wallet,
    title: "Multi-Token",
    description: "Pay with native CELO or cUSD stablecoin based on your preference",
  },
];

export default function Home() {
  const { wallet, connect, isConnecting } = useWallet();

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(250,204,21,0.1),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm backdrop-blur">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Built on Celo Network
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Send Money
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                {" "}Like a Message
              </span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Send and receive CELO and cUSD with friends and merchants. 
              Create invoices, pay with stablecoins or native CELO, and see your social money feed.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {wallet.isConnected ? (
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2" data-testid="button-open-dashboard">
                    Open Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  onClick={connect}
                  disabled={isConnecting}
                  className="gap-2"
                  data-testid="button-hero-connect"
                >
                  <Wallet className="h-5 w-5" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-explore">
                  Explore cPay
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Everything You Need</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              cPay combines the best of crypto payments with social features for a seamless money experience
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mb-8 text-muted-foreground">
              Connect your wallet and start sending and receiving payments on Celo today.
            </p>
            {wallet.isConnected ? (
              <Link href="/dashboard">
                <Button size="lg" className="gap-2" data-testid="button-cta-dashboard">
                  Go to Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={connect}
                disabled={isConnecting}
                className="gap-2"
                data-testid="button-cta-connect"
              >
                <Wallet className="h-5 w-5" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-400">
                <span className="text-sm font-bold text-white">cP</span>
              </div>
              <span className="font-semibold">cPay</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by Celo Network
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
