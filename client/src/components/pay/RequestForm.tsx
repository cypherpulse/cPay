import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, HandCoins, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useTransactions } from "@/hooks/useTransactions";
import { TokenSelector } from "./TokenSelector";
import { requestPaymentSchema, type RequestPaymentInput } from "@shared/schema";

export function RequestForm() {
  const { toast } = useToast();
  const { requestPayment } = useTransactions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestLink, setRequestLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<RequestPaymentInput>({
    resolver: zodResolver(requestPaymentSchema),
    defaultValues: {
      payer: "",
      amount: "",
      token: "cUSD",
      note: "",
    },
  });

  const selectedToken = form.watch("token");

  const onSubmit = async (data: RequestPaymentInput) => {
    setIsSubmitting(true);
    try {
      const request = await requestPayment(data);
      const link = `${window.location.origin}/pay?requestId=${request.id}`;
      setRequestLink(link);
      toast({
        title: "Request created!",
        description: `Payment request for ${data.amount} ${data.token} sent`,
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Request failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLink = () => {
    if (requestLink) {
      navigator.clipboard.writeText(requestLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HandCoins className="h-5 w-5" />
          Request Money
        </CardTitle>
        <CardDescription>
          Request CELO or cUSD from someone
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="payer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0x..."
                      className="font-mono"
                      data-testid="input-request-payer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <TokenSelector
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="font-mono text-lg"
                      data-testid="input-request-amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's this for?"
                      className="resize-none"
                      rows={2}
                      data-testid="input-request-note"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              disabled={isSubmitting}
              data-testid="button-request-submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Request...
                </>
              ) : (
                <>
                  <HandCoins className="mr-2 h-4 w-4" />
                  Request {selectedToken}
                </>
              )}
            </Button>
          </form>
        </Form>

        {requestLink && (
          <div className="mt-4 rounded-lg border bg-muted/50 p-3">
            <p className="mb-2 text-sm font-medium">Share this payment link:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate rounded bg-background px-2 py-1 text-xs font-mono">
                {requestLink}
              </code>
              <Button
                size="icon"
                variant="outline"
                onClick={copyLink}
                data-testid="button-copy-link"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
