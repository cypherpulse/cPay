import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
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
import { useBalances } from "@/hooks/useBalances";
import { TokenSelector } from "./TokenSelector";
import { sendPaymentSchema, type SendPaymentInput, type TokenType } from "@shared/schema";

export function SendForm() {
  const { toast } = useToast();
  const { sendPayment } = useTransactions();
  const { balances } = useBalances();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SendPaymentInput>({
    resolver: zodResolver(sendPaymentSchema),
    defaultValues: {
      recipient: "",
      amount: "",
      token: "cUSD",
      note: "",
    },
  });

  const selectedToken = form.watch("token");
  const currentBalance = selectedToken === "CELO" ? balances.celo : balances.cusd;

  const onSubmit = async (data: SendPaymentInput) => {
    setIsSubmitting(true);
    try {
      await sendPayment(data);
      toast({
        title: "Payment sent!",
        description: `Successfully sent ${data.amount} ${data.token} to ${data.recipient.slice(0, 8)}...`,
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Payment failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const setMaxAmount = () => {
    form.setValue("amount", currentBalance);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Send Money
        </CardTitle>
        <CardDescription>
          Send CELO or cUSD to any address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0x..."
                      className="font-mono"
                      data-testid="input-send-recipient"
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Amount</FormLabel>
                    <button
                      type="button"
                      onClick={setMaxAmount}
                      className="text-xs text-primary hover:underline"
                      data-testid="button-max-amount"
                    >
                      Max: {currentBalance} {selectedToken}
                    </button>
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="font-mono text-lg"
                      data-testid="input-send-amount"
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
                      data-testid="input-send-note"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              data-testid="button-send-submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send {selectedToken}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
