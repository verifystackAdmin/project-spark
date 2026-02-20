import {
  Fingerprint,
  Users,
  BrainCircuit,
  Network,
  Code,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  {
    icon: Fingerprint,
    title: "Identity Verification",
    description:
      "Verify users against 11,000+ government-issued documents, backed by biometric analysis and fraud detection.",
    link: "/features/identity-verification",
  },
  {
    icon: Users,
    title: "Social Profile Validation",
    description:
      "Analyze digital footprints across online platforms to corroborate identity and uncover behavioral risk signals.",
    link: "/features/social-validation",
  },
  {
    icon: BrainCircuit,
    title: "AI Risk Scoring Engine",
    description:
      "Our machine learning models provide a comprehensive risk score based on hundreds of data points, enabling you to automate decisions and flag high-risk users instantly.",
    link: "/features/risk-scoring",
  },
  {
    icon: Network,
    title: "Trust Graph Analysis",
    description:
      "Leverage network analysis to understand community connections and reputation, identifying trusted users and potential fraud rings.",
    link: "/features/reputation-graph",
  },
  {
    icon: Code,
    title: "Developer API Access",
    description:
      "Integrate our powerful trust infrastructure into your own platform with our simple, well-documented REST API.",
    link: "/api-docs",
  },
];

export const Features = () => {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            The New Standard in Digital Trust
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            VerifyStack provides the complete infrastructure to quantify trust online.
            Move beyond simple checks and balances with a dynamic, data-driven approach to risk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="bg-card p-8 rounded-2xl border flex flex-col"
              whileHover={{ scale: 1.03, borderColor: "hsl(var(--primary))" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex-grow">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {feature.description}
                </p>
              </div>
              <Link
                to={feature.link}
                className="text-sm font-semibold text-primary inline-flex items-center group"
              >
                Learn more
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
