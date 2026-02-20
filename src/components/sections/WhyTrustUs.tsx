import { motion } from "framer-motion";
import { Shield, Lock, Brain, Eye, FileText, Server } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  { icon: Brain, label: "AI Explainability", description: "Transparent scoring with full reasoning" },
  { icon: Lock, label: "End-to-End Encryption", description: "AES-256 encryption at rest and in transit" },
  { icon: Shield, label: "DPDP & GDPR Ready", description: "Compliance-first architecture" },
  { icon: FileText, label: "Audit Logs", description: "Complete verification audit trail" },
  { icon: Eye, label: "Real-time Monitoring", description: "Live data source monitoring" },
  { icon: Server, label: "Secure Infrastructure", description: "SOC 2 compliant cloud hosting" },
];

const WhyTrustUs = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-trust/10 text-trust text-xs font-semibold rounded-full mb-4 border border-trust/20 uppercase tracking-widest">
              Security & Compliance
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Why Trust VerifyStack?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Trust is broken when verification is slow, manual, and fragmented.
              We bring AI-powered verification, real-time data, and compliance-first architecture into one platform.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card-hover rounded-xl p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-trust/10 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-trust" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{feature.label}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
