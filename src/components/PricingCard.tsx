import { Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  /** When set with `onCtaClick`, renders a button instead of linking to signup. */
  onCtaClick?: () => void | Promise<void>;
  ctaLoading?: boolean;
  /** Link target when `onCtaClick` is not used. Default `/signup`. */
  ctaHref?: string;
}

const PricingCard = ({
  name,
  price,
  period,
  description,
  features,
  popular = false,
  buttonText = "Get Started",
  onCtaClick,
  ctaLoading = false,
  ctaHref = "/signup",
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "relative bg-card rounded-2xl border p-6 md:p-8 flex flex-col transition-all duration-300",
        popular
          ? "border-primary shadow-xl shadow-primary/10 scale-105 z-10"
          : "border-border/50 hover:border-primary/50 hover:shadow-lg"
      )}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold rounded-full shadow-lg">
            <Sparkles className="w-4 h-4" />
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">{name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-foreground">{price}</span>
          {period && (
            <span className="text-muted-foreground text-sm">/{period}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-trust/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-trust" />
            </div>
            <span className="text-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {onCtaClick ? (
        <Button
          type="button"
          variant={popular ? "hero" : "default"}
          className="w-full"
          size="lg"
          disabled={ctaLoading}
          onClick={() => void onCtaClick()}
        >
          {ctaLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
              {buttonText}
            </>
          ) : (
            buttonText
          )}
        </Button>
      ) : (
        <Link to={ctaHref}>
          <Button variant={popular ? "hero" : "default"} className="w-full" size="lg">
            {buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default PricingCard;
