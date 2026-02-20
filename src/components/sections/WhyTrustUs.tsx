import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle, Brain, Fingerprint } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const badges = [
  { icon: CheckCircle, label: "GDPR Ready" },
  { icon: Shield, label: "India DPDP Compliant" },
  { icon: Lock, label: "Secure Infrastructure" },
  { icon: Brain, label: "AI-Powered Risk Scoring" },
];

const WhyTrustUs = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Built on Trust
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Trust VerifyStack?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Trust is broken when verification is slow, manual, and fragmented.
              VerifyStack brings AI-powered identity verification, real-time data sources, and compliance-first architecture into one platform.
              Whether you're a hiring manager, an agency owner, or a homeowner—VerifyStack ensures you never trust blindly again.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap items-center justify-center gap-6 max-w-3xl mx-auto">
          {badges.map((badge, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.08, y: -4 }}
                className="flex items-center gap-3 bg-card rounded-2xl px-6 py-4 border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-trust/10 flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-trust" />
                </div>
                <span className="font-medium text-foreground">{badge.label}</span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
