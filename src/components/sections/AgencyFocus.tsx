import { motion } from "framer-motion";
import { Shield, CheckCircle, ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const benefits = [
  "Pre-verify your entire candidate pool at once",
  "Security guards, housekeeping, delivery—all verified",
  "Market as a \"Verified-Only Workforce Provider\"",
  "Win premium contracts with enterprise credibility",
];

const AgencyFocus = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <ScrollReveal direction="scale">
            <div className="glass-card rounded-2xl p-8 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Agency Dashboard</p>
                  <p className="font-bold text-foreground">Bulk Verification</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Security Guard", status: "Verified", color: "text-trust" },
                  { name: "Housekeeping Staff", status: "Verified", color: "text-trust" },
                  { name: "Delivery Partner", status: "Pending", color: "text-warning" },
                  { name: "Driver", status: "Verified", color: "text-trust" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-secondary/50 rounded-lg p-3 flex items-center justify-between text-sm border border-border/50"
                  >
                    <span className="text-foreground">{item.name}</span>
                    <span className={`font-medium ${item.color}`}>{item.status}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 border border-primary/20 uppercase tracking-widest">
                For Agencies
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Verify Your Workforce at the Source
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Enable agencies to pre-verify their entire candidate pool. Market as "Verified-Only Workforce Providers" and build unmatched credibility with enterprise clients.
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button className="group btn-glow">
                  Become a Verified Agency Partner
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AgencyFocus;
