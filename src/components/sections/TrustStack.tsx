import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, BarChart3, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const products = [
  {
    icon: ShieldCheck,
    name: "VerifyStack Shield",
    tagline: "Identity & Fraud Protection",
    description:
      "Protects users and businesses from fraud, identity misuse and security risks through real-time document verification and instant alerts.",
    href: "/product/verifystack-shield",
    gradient: "from-primary/20 to-primary/5",
    border: "border-primary/30 hover:border-primary/60",
    iconBg: "bg-primary/10 group-hover:bg-primary/20",
    iconColor: "text-primary",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
  },
  {
    icon: Cpu,
    name: "VerifyStack RiskEngine",
    tagline: "Background & Risk Intelligence",
    description:
      "Analyzes multiple data points to detect potential threats and assigns real-time risk levels for smarter, faster decision-making.",
    href: "/product/verifystack-riskengine",
    gradient: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/30 hover:border-orange-500/60",
    iconBg: "bg-orange-500/10 group-hover:bg-orange-500/20",
    iconColor: "text-orange-500",
    badgeColor: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
  {
    icon: BarChart3,
    name: "VerifyStack TrustScore",
    tagline: "Dynamic Trust Scoring",
    description:
      "Generates a dynamic trust score from verified data, helping businesses evaluate people, vendors and entities with real confidence.",
    href: "/product/verifystack-trustscore",
    gradient: "from-purple-500/20 to-purple-500/5",
    border: "border-purple-500/30 hover:border-purple-500/60",
    iconBg: "bg-purple-500/10 group-hover:bg-purple-500/20",
    iconColor: "text-purple-500",
    badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
];

const TrustStack = () => {
  return (
    <section className="pt-10 pb-16 md:pt-12 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-10" />
      <div className="container mx-auto max-w-7xl px-4 relative z-10">

        <ScrollReveal>
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20 uppercase tracking-widest">
              The Full Stack
            </span>
          </div>
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-5">
              Your Complete AI Trust &amp; Safety Stack
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Defend your business with real-time identity checks, detect hidden threats across multiple data points and use AI Trust Scores to decide who you onboard.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          {products.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative rounded-2xl border bg-gradient-to-b ${p.gradient} ${p.border} p-7 flex flex-col h-full transition-all duration-300`}
              >
                {/* Badge */}
                <span className={`self-start text-[11px] font-semibold px-2.5 py-1 rounded-full border mb-5 ${p.badgeColor}`}>
                  {p.tagline}
                </span>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${p.iconBg}`}>
                  <p.icon className={`w-6 h-6 ${p.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-3">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>

                {/* CTA */}
                <Link
                  to={p.href}
                  className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${p.iconColor} hover:opacity-80 transition-opacity group/link`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustStack;
