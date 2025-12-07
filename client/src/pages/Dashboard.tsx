import { Route, Switch } from "wouter";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OverviewCards } from "@/components/overview/OverviewCards";
import { SendForm } from "@/components/pay/SendForm";
import { RequestForm } from "@/components/pay/RequestForm";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { FeedList } from "@/components/social/FeedList";
import { SettingsPanel } from "@/components/settings/SettingsPanel";

function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Overview</h1>
        <p className="text-muted-foreground">Your cPay dashboard at a glance</p>
      </div>
      <OverviewCards />
    </div>
  );
}

function PayPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Pay & Request</h1>
        <p className="text-muted-foreground">Send money or request payment from others</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SendForm />
        <RequestForm />
      </div>
    </div>
  );
}

function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Invoices</h1>
        <p className="text-muted-foreground">Create and manage your payment invoices</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <InvoiceForm />
        </div>
        <div className="lg:col-span-2">
          <InvoiceTable />
        </div>
      </div>
    </div>
  );
}

function FeedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Activity</h1>
        <p className="text-muted-foreground">Your social money feed</p>
      </div>
      <FeedList />
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Settings</h1>
        <p className="text-muted-foreground">Configure your cPay experience</p>
      </div>
      <SettingsPanel />
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="pb-20 lg:pb-0">
        <Switch>
          <Route path="/dashboard" component={OverviewPage} />
          <Route path="/dashboard/pay" component={PayPage} />
          <Route path="/dashboard/invoices" component={InvoicesPage} />
          <Route path="/dashboard/feed" component={FeedPage} />
          <Route path="/dashboard/settings" component={SettingsPage} />
        </Switch>
      </div>
    </DashboardLayout>
  );
}
