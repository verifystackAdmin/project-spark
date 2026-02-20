import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    priceSuffix: "",
    description: "For individuals and small projects getting started.",
    features: [
      "5 Verifications/month",
      "Basic Identity Checks",
      "Community Support",
    ],
    cta: "Get Started",
    ctaLink: "/signup",
    isFeatured: false,
  },
  {
    name: "Pro",
    price: "$99",
    priceSuffix: "/ month",
    description: "For growing platforms that need more power and support.",
    features: [
      "500 Verifications/month",
      "Advanced Identity & Social Analysis",
      "AI Risk Scoring",
      "Developer API Access",
      "Priority Email Support",
    ],
    cta: "Choose Pro",
    ctaLink: "/signup?plan=pro",
    isFeatured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSuffix: "",
    description: "For large-scale platforms requiring custom solutions.",
    features: [
      "Unlimited Verifications",
      "Reputation Graph Analysis",
      "Volume Discounts",
      "Dedicated Account Manager",
      "SLA & 24/7 Support",
    ],
    cta: "Contact Sales",
    ctaLink: "/contact",
    isFeatured: false,
  },
];

export const Pricing = () => {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Pricing Plans for Every Scale
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Choose the right plan for your needs. All plans come with our
            commitment to security and privacy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "bg-card rounded-2xl border flex flex-col p-8",
                tier.isFeatured ? "border-primary shadow-2xl" : ""
              )}
            >
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-primary">
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  {tier.priceSuffix && (
                    <span className="text-muted-foreground">
                      {tier.priceSuffix}
                    </span>
                  )}
                </div>
                <p className="mt-6 text-muted-foreground">
                  {tier.description}
                </p>
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-trust flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to={tier.ctaLink} className="mt-8">
                <Button
                  size="lg"
                  variant={tier.isFeatured ? "hero" : "outline"}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
