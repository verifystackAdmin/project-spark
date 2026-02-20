import { motion } from "framer-motion";
import { Shield, AlertTriangle, ArrowRight, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const IndividualsCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow animation-delay-300" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="scale">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border text-center max-w-4xl mx-auto">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6"
            >
              <UserCheck className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Verify Before You Trust
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Hiring a nanny, driver, tenant, or service worker?
              Fake identities and fraud are rising. VerifyStack gives you enterprise-grade background checks in minutes—without paperwork or agencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/run-check">
                <Button size="xl" className="group hover-glow">
                  👉 Run a Background Check Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="xl" className="hover-lift">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IndividualsCTA;
