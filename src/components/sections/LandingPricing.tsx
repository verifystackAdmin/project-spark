import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, User, Building2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import PricingCard from "@/components/PricingCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CALENDLY_BOOK_DEMO_URL } from "@/lib/siteLinks";
import { useGatewayBillingPlans } from "@/hooks/useGatewayBilling";
import { gatewayBillingPlanId } from "@/lib/bgvGatewayApi";

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

function periodSlug(billingPeriod?: string): string {
  const u = (billingPeriod ?? "").toUpperCase();
  if (u === "MONTHLY") return "check plan";
  if (u === "YEARLY") return "annual check plan";
  if (u === "ONCE") return "one-time";
  return billingPeriod?.trim() ? billingPeriod.toLowerCase() : "check plan";
}

const LandingPricing = () => {
  const [segment, setSegment] = useState<"individual" | "business">("individual");
  const navigate = useNavigate();

  const plansQ = useGatewayBillingPlans();
  const plans = (plansQ.data ?? []).filter((p) => p.active !== false && gatewayBillingPlanId(p));
  const mid = Math.max(0, Math.floor((plans.length - 1) / 2));

  const renderBusinessEnterprise = () => (
    <ScrollReveal>
      <div className="mx-auto flex max-w-lg flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm md:p-8 relative z-10">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-foreground">Enterprise & teams</h3>
          <p className="mt-1 text-sm text-muted-foreground">Volume pricing, API access, and SLAs.</p>
        </div>
        <div className="mb-4">
          <span className="text-3xl font-bold text-foreground">Custom</span>
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
    </ScrollReveal>
  );

  const renderPlans = () => {
    if (segment === "business") {
      return renderBusinessEnterprise();
    }

    if (plansQ.isLoading) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[400px] w-full rounded-2xl" />
            </div>
          ))}
        </div>
      );
    }

    if (plansQ.isError) {
      return (
        <div className="text-center text-destructive max-w-lg mx-auto relative z-10">
          <p className="font-medium">Could not load plans</p>
        </div>
      );
    }

    if (plans.length === 0) {
      return (
        <div className="mx-auto max-w-lg text-center text-muted-foreground relative z-10">
          <p>No active plans right now.</p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
        {plans.map((plan, index) => {
          const pid = gatewayBillingPlanId(plan);
          const priceStr = formatMoney(plan.price, plan.currency);
          const period = periodSlug(plan.billingPeriod);
          const feats = featureLabels(plan.features as unknown[] | undefined);
          const popular = plans.length > 1 && index === mid;

          return (
            <ScrollReveal key={pid} delay={index * 0.12}>
              <PricingCard
                name={plan.name ?? plan.code ?? "Plan"}
                price={priceStr}
                period={period}
                description={plan.code ? `${plan.code}${plan.type ? ` · ${plan.type}` : ""}` : "Subscription plan"}
                features={feats}
                popular={popular}
                buttonText="Get Started"
                ctaHref="/pricing"
              />
            </ScrollReveal>
          );
        })}
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 border border-primary/20 uppercase tracking-widest">
              Pricing
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-5">
              Start free. Scale as you grow. No hidden fees.
            </p>

            <div className="mt-4 mb-8 inline-flex bg-muted p-1 rounded-full relative z-20">
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
        </ScrollReveal>

        {renderPlans()}
      </div>
    </section>
  );
};

export default LandingPricing;
