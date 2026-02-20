import { motion } from "framer-motion";
import { ArrowRight, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const IndividualsCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="scale">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6"
            >
              <UserCheck className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Verify Before You Trust
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Hiring a nanny, driver, tenant, or service worker?
              Fake identities and fraud are rising. Get enterprise-grade background checks in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/run-check">
                <Button size="lg" className="group btn-glow">
                  Run a Background Check Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="hover-lift">
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
