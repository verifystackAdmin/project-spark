import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PricingCard from "@/components/PricingCard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { getPlans, subscribeToPlan, Plan } from "@/lib/billingApi";
import { HelpCircle, Check, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribing, setIsSubscribing] = useState<string | null>(null);
  const [segment, setSegment] = useState<'individual' | 'business'>('individual');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlans();
        if (response.success) {
          setPlans(response.data);
        } else {
          setError(response.message || "Failed to fetch plans.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId: string) => {
    setIsSubscribing(planId);
    try {
      const response = await subscribeToPlan(planId);
      if (response.success) {
        toast({
          title: "Success!",
          description: "You have successfully subscribed to the plan.",
        });
        navigate("/subscription");
      } else {
        toast({
          title: "Subscription failed",
          description: response.message || "Could not subscribe to the plan.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(null);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
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

    if (error) {
      return (
        <div className="text-center text-destructive">
          <p>Error: {error}</p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Individual: Pay Per Check (Static) */}
        {segment === 'individual' && (
          <PricingCard
            name="Pay As You Go"
            price="₹499"
            period="check"
            description="Instant verification for a single person."
            features={["Identity Verification", "Criminal Record Check", "Instant Results"]}
            buttonText="Run Check"
          />
        )}

        {/* API Plans (Displayed for both, or filtered if data allowed) */}
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            name={plan.name}
            price={`₹${plan.price}`}
            period="month"
            description={plan.name}
            features={plan.features}
            buttonText="Subscribe"
          />
        ))}

        {/* Business: Enterprise (Static) */}
        {segment === 'business' && (
          <div className="flex flex-col p-6 bg-card rounded-xl border border-border shadow-sm">
            <div className="mb-4">
              <h3 className="font-semibold text-xl">Enterprise</h3>
              <p className="text-sm text-muted-foreground">For large teams</p>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-bold">Custom</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {["Volume Discounts", "API Access", "SLA Support", "Dedicated Manager"].map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" /> {feat}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/contact-sales')}
              className="w-full py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors"
            >
              Contact Sales
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Pricing
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs and get started today.
          </p>

          {/* Segment Toggle */}
          <div className="mt-8 inline-flex bg-muted p-1 rounded-full">
            <button
              onClick={() => setSegment('individual')}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all",
                segment === 'individual'
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <User className="w-4 h-4" />
              For Individuals
            </button>
            <button
              onClick={() => setSegment('business')}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all",
                segment === 'business'
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Building2 className="w-4 h-4" />
              For Business
            </button>
          </div>
        </div>
      </section>

      {/* Subscriptions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Our Plans
            </h2>
          </div>
          {renderContent()}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How accurate is the verification?",
                a: "Our AI-powered system achieves 99.2% accuracy by cross-referencing multiple data sources and using advanced document analysis.",
              },
              {
                q: "Is my data secure?",
                a: "Yes, we use 256-bit SSL encryption and are fully GDPR compliant. Your data is never shared with third parties.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border/50 p-6"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
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
