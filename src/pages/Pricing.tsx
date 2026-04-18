import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PricingCard from "@/components/PricingCard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useGatewayBillingPlans, useSubscribeToPlanMutation } from "@/hooks/useGatewayBilling";
import { gatewayBillingPlanId, type GatewayBillingPlan } from "@/lib/bgvGatewayApi";
import { CALENDLY_BOOK_DEMO_URL } from "@/lib/siteLinks";
import { HelpCircle, Check, User, Building2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SALES_EMAIL = "sales@verifystack.in";
const SALES_MAILTO = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent("VerifyStack Enterprise pricing inquiry")}`;

function formatMoney(amount: number | undefined, currency: string | undefined) {
  const cur = (currency ?? "INR").toUpperCase();
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(
      amount ?? 0,
    );
  } catch {
    return `${cur} ${amount ?? 0}`;
  }
}

function featureLabels(features: unknown[] | undefined): string[] {
  if (!Array.isArray(features) || features.length === 0) return ["BGV reports & checks (per your plan)"];
  return features.map((f) => {
    if (f && typeof f === "object") {
      const o = f as Record<string, unknown>;
      const code =
        (typeof o.featureCode === "string" && o.featureCode) ||
        (typeof o.code === "string" && o.code) ||
        "";
      const qt = typeof o.quotaType === "string" ? o.quotaType : "";
      const q = o.quota;
      if (code && qt === "UNLIMITED") return `${code} — unlimited`;
      if (code && typeof q === "number") return `${code} — ${q} included`;
      if (code) return code;
    }
    return String(f);
  });
}

/** Price suffix: plans are check / verification packs, not “per calendar month” framing. */
function periodSlug(billingPeriod?: string): string {
  const u = (billingPeriod ?? "").toUpperCase();
  if (u === "MONTHLY") return "check plan";
  if (u === "YEARLY") return "annual check plan";
  if (u === "ONCE") return "one-time";
  return billingPeriod?.trim() ? billingPeriod.toLowerCase() : "check plan";
}

const Pricing = () => {
  const [segment, setSegment] = useState<"individual" | "business">("individual");
  const [subscribingId, setSubscribingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const userId = user?.email?.trim() ?? "";

  const plansQ = useGatewayBillingPlans();
  const subscribeMut = useSubscribeToPlanMutation();

  const plans = (plansQ.data ?? []).filter((p) => p.active !== false && gatewayBillingPlanId(p));
  const mid = Math.max(0, Math.floor((plans.length - 1) / 2));

  const handleSubscribe = async (plan: GatewayBillingPlan) => {
    const pid = gatewayBillingPlanId(plan);
    if (!pid) return;
    if (!isAuthenticated || !userId) {
      navigate("/dashboard/payments");
      return;
    }
    setSubscribingId(pid);
    try {
      await subscribeMut.mutateAsync({ planId: pid, userId });
      toast({
        title: "Payment confirmed",
        description: "You can run checks from the dashboard.",
      });
      navigate("/dashboard/payments");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not complete payment.";
      if (msg === "Payment cancelled.") {
        toast({ title: "Checkout closed", description: "No charge was made." });
      } else {
        toast({
          title: "Payment failed",
          description: msg,
          variant: "destructive",
        });
      }
    } finally {
      setSubscribingId(null);
    }
  };

  const renderBusinessEnterprise = () => (
    <div className="mx-auto flex max-w-lg flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm md:p-8">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Enterprise & teams</h3>
        <p className="mt-1 text-sm text-muted-foreground">Volume pricing, API access, and SLAs.</p>
      </div>
      <div className="mb-4">
        <span className="text-3xl font-bold">Custom</span>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Email{" "}
        <a href={SALES_MAILTO} className="font-medium text-primary hover:underline">
          {SALES_EMAIL}
        </a>{" "}
        or use the contact page.
      </p>
      <ul className="mb-8 flex-1 space-y-3">
        {["Volume discounts", "API access", "SLA support", "Dedicated manager"].map((feat, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 shrink-0 text-primary" /> {feat}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-2">
        <Button className="w-full" type="button" onClick={() => navigate("/contact")}>
          Contact us
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <a href={CALENDLY_BOOK_DEMO_URL} target="_blank" rel="noopener noreferrer">
            Book a demo call
          </a>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <a href={SALES_MAILTO}>
            <Mail className="mr-2 h-4 w-4" />
            Email sales
          </a>
        </Button>
      </div>
    </div>
  );

  const renderPlans = () => {
    if (segment === "business") {
      return renderBusinessEnterprise();
    }

    if (plansQ.isLoading) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (plansQ.isError) {
      return (
        <div className="text-center text-destructive max-w-lg mx-auto">
          <p className="font-medium">Could not load plans</p>
        </div>
      );
    }

    if (plans.length === 0) {
      return (
        <div className="mx-auto max-w-lg text-center text-muted-foreground">
          <p>No active plans right now.</p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const pid = gatewayBillingPlanId(plan);
          const priceStr = formatMoney(plan.price, plan.currency);
          const period = periodSlug(plan.billingPeriod);
          const feats = featureLabels(plan.features as unknown[] | undefined);
          const busy = subscribingId === pid && subscribeMut.isPending;
          const popular = plans.length > 1 && index === mid;

          return (
            <PricingCard
              key={pid}
              name={plan.name ?? plan.code ?? "Plan"}
              price={priceStr}
              period={period}
              description={plan.code ? `${plan.code}${plan.type ? ` · ${plan.type}` : ""}` : "Subscription plan"}
              features={feats}
              popular={popular}
              buttonText="Subscribe"
              onCtaClick={() => void handleSubscribe(plan)}
              ctaLoading={busy}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Pricing</span>
          </h1>

          <div className="mt-8 inline-flex bg-muted p-1 rounded-full">
            <button
              type="button"
              onClick={() => setSegment("individual")}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all",
                segment === "individual"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <User className="w-4 h-4" />
              For individuals
            </button>
            <button
              type="button"
              onClick={() => setSegment("business")}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all",
                segment === "business"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Building2 className="w-4 h-4" />
              For business
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              {segment === "business" ? "Talk to us" : "Our plans"}
            </h2>
          </div>
          {renderPlans()}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How accurate is the verification?",
                a: "Our engine cross-references authoritative sources; exact coverage depends on the checks included in your plan.",
              },
              {
                q: "Is my data secure?",
                a: "We use strong encryption in transit and follow strict access controls. Your data is used only for verification you request.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card rounded-xl border border-border/50 p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
