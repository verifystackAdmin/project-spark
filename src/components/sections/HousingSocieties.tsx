import { motion } from "framer-motion";
import { Home, Shield, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const checks = [
  { label: "Domestic Help", icon: Users },
  { label: "Maintenance Staff", icon: Shield },
  { label: "Tenants", icon: Home },
  { label: "Service Vendors", icon: CheckCircle },
];

const HousingSocieties = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-20 left-[5%] w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <ScrollReveal>
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-4 border border-accent/20 uppercase tracking-widest">
                For Housing Societies
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Secure Your Community at Scale
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Streamline background checks for domestic help, maintenance staff, tenants, and service vendors across hundreds of households. Reduce administrative burden and create safer communities.
              </p>
              <Link to="/contact">
                <Button className="group btn-glow">
                  Partner With VerifyStack
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale">
            <div className="grid grid-cols-2 gap-4">
              {checks.map((check, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="glass-card-hover rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <check.icon className="w-6 h-6 text-accent" />
                  </div>
                  <p className="font-semibold text-foreground text-sm">{check.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default HousingSocieties;
