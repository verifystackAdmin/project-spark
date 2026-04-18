import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, ShieldCheck, ArrowRight, RefreshCw, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useGatewayBillingPlans,
  useMyGatewaySubscriptions,
  useSubscribeToPlanMutation,
  useWalletTopUpMutation,
} from "@/hooks/useGatewayBilling";
import { gatewayBillingPlanId, type GatewayBillingPlan } from "@/lib/bgvGatewayApi";
import { cn } from "@/lib/utils";

function planBillingCaption(billingPeriod?: string): string {
  if (!billingPeriod?.trim()) return "Check-based plan";
  const u = billingPeriod.toUpperCase();
  if (u === "MONTHLY") return "Check-based plan";
  if (u === "YEARLY") return "Annual check plan";
  if (u === "ONCE") return "One-time";
  return billingPeriod;
}

function formatMoney(amount: number | undefined, currency: string | undefined) {
  const cur = (currency ?? "INR").toUpperCase();
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: cur }).format(amount ?? 0);
  } catch {
    return `${cur} ${amount ?? 0}`;
  }
}

function featureSummary(features: unknown[] | undefined): string[] {
  if (!Array.isArray(features) || features.length === 0) return [];
  return features.map((f) => {
    if (f && typeof f === "object") {
      const o = f as Record<string, unknown>;
      const code =
        (typeof o.featureCode === "string" && o.featureCode) ||
        (typeof o.code === "string" && o.code) ||
        "";
      const qt = typeof o.quotaType === "string" ? o.quotaType : "";
      const q = o.quota;
      if (code && qt === "UNLIMITED") return `${code} (unlimited)`;
      if (code && typeof q === "number") return `${code} (${q})`;
      if (code) return code;
    }
    return String(f);
  });
}

function subscriptionTitle(sub: unknown): string {
  if (!sub || typeof sub !== "object") return "Subscription";
  const o = sub as Record<string, unknown>;
  const plan = o.plan;
  if (plan && typeof plan === "object") {
    const p = plan as Record<string, unknown>;
    if (typeof p.name === "string") return p.name;
    if (typeof p.code === "string") return p.code;
  }
  if (typeof o.planCode === "string") return o.planCode;
  if (typeof o.status === "string") return o.status;
  return "Subscription";
}

function subscriptionStatus(sub: unknown): string | null {
  if (!sub || typeof sub !== "object") return null;
  const o = sub as Record<string, unknown>;
  return typeof o.status === "string" ? o.status : null;
}

const Payments = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const userId = user?.email?.trim() ?? "";

  const fromBgv =
    (location.state as { fromBgvCheck?: boolean } | null)?.fromBgvCheck === true;

  const plansQ = useGatewayBillingPlans();
  const subsQ = useMyGatewaySubscriptions(userId);
  const subscribeMut = useSubscribeToPlanMutation();
  const walletMut = useWalletTopUpMutation();
  const [subscribingId, setSubscribingId] = useState<string | null>(null);
  const [walletRupees, setWalletRupees] = useState("");

  if (!isAuthenticated || !userId) {
    return <Navigate to="/login" replace state={{ from: { pathname: "/dashboard/payments" } }} />;
  }

  const plans = plansQ.data ?? [];
  const activePlans = plans.filter((p) => p.active !== false && gatewayBillingPlanId(p));

  const handleSubscribe = async (plan: GatewayBillingPlan) => {
    const pid = gatewayBillingPlanId(plan);
    if (!pid) {
      toast({ variant: "destructive", title: "Invalid plan", description: "This plan cannot be selected right now. Try refreshing the page." });
      return;
    }
    setSubscribingId(pid);
    try {
      const res = await subscribeMut.mutateAsync({ planId: pid, userId });
      toast({
        title: "Payment confirmed",
        description:
          res.message && res.message !== "paid"
            ? `${res.message} — subscriptions updated.`
            : `Your plan is active for ${userId}.`,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Request failed";
      if (msg === "Payment cancelled.") {
        toast({ title: "Checkout closed", description: "No charge was made." });
      } else {
        toast({
          variant: "destructive",
          title: "Could not complete payment",
          description: msg,
        });
      }
    } finally {
      setSubscribingId(null);
    }
  };

  const handleWalletTopUp = async () => {
    const parsed = parseFloat(String(walletRupees).replace(/,/g, "."));
    if (Number.isNaN(parsed) || parsed <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Enter a positive amount in INR.",
      });
      return;
    }
    const amountPaise = Math.round(parsed * 100);
    if (amountPaise < 100) {
      toast({
        variant: "destructive",
        title: "Amount too small",
        description: "Minimum top-up is ₹1 (100 paise).",
      });
      return;
    }
    try {
      const res = await walletMut.mutateAsync({ userId, amountPaise });
      const bal = res.walletBalancePaise;
      toast({
        title: "Wallet top-up successful",
        description:
          typeof bal === "number"
            ? `Balance: ${formatMoney(bal / 100, "INR")}`
            : "Funds will reflect after verification.",
      });
      setWalletRupees("");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Request failed";
      if (msg === "Payment cancelled.") {
        toast({ title: "Checkout closed", description: "No charge was made." });
      } else {
        toast({
          variant: "destructive",
          title: "Top-up failed",
          description: msg,
        });
      }
    }
  };

  return (
    <DashboardLayout title="Plans & billing" contentClassName="p-6 max-w-5xl mx-auto w-full">
      {fromBgv && (
        <Alert className="mb-6 border-primary/30 bg-primary/5">
          <ShieldCheck className="h-4 w-4" />
          <AlertTitle>Buy a plan to run checks</AlertTitle>
          <AlertDescription className="text-foreground/90">
            You need an active plan with available verifications before you can start a new check. Pick a plan below
            — or upgrade if your current usage limit is full.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Available plans</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => {
            void plansQ.refetch();
            void subsQ.refetch();
          }}
          disabled={plansQ.isFetching || subsQ.isFetching}
        >
          <RefreshCw className={cn("h-4 w-4 mr-2", (plansQ.isFetching || subsQ.isFetching) && "animate-spin")} />
          Refresh
        </Button>
      </div>

      <Card className="mb-8 border-border/80">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Your subscriptions
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Active plans tied to your account ({subsQ.isLoading ? "…" : String(subsQ.data?.length ?? 0)})
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subsQ.isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading…
            </div>
          ) : subsQ.isError ? (
            <p className="text-sm text-destructive">Could not load subscriptions.</p>
          ) : (subsQ.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground">No subscriptions yet — pick a plan below.</p>
          ) : (
            <ul className="space-y-3">
              {(subsQ.data ?? []).map((sub, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/60 bg-muted/20 px-4 py-3"
                >
                  <span className="font-medium">{subscriptionTitle(sub)}</span>
                  {subscriptionStatus(sub) ? (
                    <Badge variant="secondary">{subscriptionStatus(sub)}</Badge>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="mb-8 border-border/80">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet top-up
          </CardTitle>
          <CardDescription>
            Add funds via Razorpay (minimum ₹1). Order uses <code className="text-xs">amountPaise</code> — no plan id.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2 flex-1 max-w-xs">
            <Label htmlFor="wallet-inr">Amount (INR)</Label>
            <Input
              id="wallet-inr"
              type="text"
              inputMode="decimal"
              placeholder="e.g. 500"
              value={walletRupees}
              onChange={(e) => setWalletRupees(e.target.value)}
              autoComplete="off"
            />
          </div>
          <Button
            type="button"
            onClick={() => void handleWalletTopUp()}
            disabled={walletMut.isPending}
          >
            {walletMut.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Opening checkout…
              </>
            ) : (
              <>
                Top up with Razorpay
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {plansQ.isLoading ? (
        <div className="flex justify-center py-16 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : plansQ.isError ? (
        <Card className="border-destructive/40">
          <CardContent className="pt-6 text-sm text-destructive">
            Failed to load plans. Check your connection and try again, or contact support if this continues.
          </CardContent>
        </Card>
      ) : activePlans.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">No active plans right now. Try refresh.</CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {activePlans.map((plan) => {
            const pid = gatewayBillingPlanId(plan);
            const feats = featureSummary(plan.features as unknown[] | undefined);
            const busy = subscribingId === pid && subscribeMut.isPending;
            return (
              <Card key={pid} className="border-border/80 flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{plan.name ?? plan.code ?? "Plan"}</CardTitle>
                    {plan.code && (
                      <Badge variant="outline" className="font-mono text-xs shrink-0">
                        {plan.code}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {formatMoney(plan.price, plan.currency)}
                    <span className="text-muted-foreground"> · {planBillingCaption(plan.billingPeriod)}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  {feats.length > 0 && (
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      {feats.slice(0, 8).map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto pt-2 flex flex-wrap gap-2">
                    <Button onClick={() => void handleSubscribe(plan)} disabled={busy || !pid}>
                      {busy ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Opening Razorpay…
                        </>
                      ) : (
                        <>
                          Pay
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/run-check">Run a check</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Payments;
