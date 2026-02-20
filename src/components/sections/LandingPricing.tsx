import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "₹499",
    period: "/month",
    description: "For individuals and small teams getting started.",
    features: [
      "5 verifications/month",
      "Basic Trust Score",
      "Document verification",
      "Email support",
      "Standard reports",
    ],
    cta: "Get Started",
    link: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹2,999",
    period: "/month",
    description: "For growing businesses and agencies.",
    features: [
      "50 verifications/month",
      "Advanced AI Risk Score",
      "Criminal record checks",
      "API access",
      "Priority support",
      "Custom branding",
      "Bulk verification",
    ],
    cta: "Start Free Trial",
    link: "/signup",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations and housing societies.",
    features: [
      "Unlimited verifications",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "White-label solution",
      "Compliance dashboard",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    link: "/contact",
    popular: false,
  },
];

const LandingPricing = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 border border-primary/20 uppercase tracking-widest">
              Pricing
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free. Scale as you grow. No hidden fees.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.12}>
              <motion.div
                whileHover={{ y: -8 }}
                className={cn(
                  "glass-card rounded-2xl p-8 h-full flex flex-col relative overflow-hidden transition-all duration-500",
                  plan.popular && "border-primary/50 shadow-glow"
                )}
              >
                {plan.popular && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                      <Sparkles className="w-3 h-3" />
                      Popular
                    </div>
                  </>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.link}>
                  <Button
                    className={cn(
                      "w-full group",
                      plan.popular ? "btn-glow" : ""
                    )}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPricing;
