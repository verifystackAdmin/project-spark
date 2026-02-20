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
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-20 left-[5%] w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <ScrollReveal>
            <div>
              <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
                For Housing Societies & RWAs
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Secure Your Community at Scale
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Housing societies are the first line of defense for urban safety. VerifyStack streamlines background checks for domestic help, maintenance staff, tenants, and service vendors across hundreds of households. Reduce administrative burden, ensure compliance, and create a safer living environment for residents.
              </p>
              <Link to="/contact">
                <Button size="lg" className="group hover-glow">
                  👉 Partner With VerifyStack for Your Society
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale">
            <div className="grid grid-cols-2 gap-4">
              {checks.map((check, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="bg-card rounded-2xl p-6 border border-border shadow-md text-center hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mx-auto mb-3">
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
