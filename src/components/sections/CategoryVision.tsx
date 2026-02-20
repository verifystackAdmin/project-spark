import { motion } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const CategoryVision = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float-slow" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="scale">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8"
            >
              <Globe className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              The Trust Layer for the <br />
              <span className="gradient-text">Internet & Real World</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Just like Stripe powers payments and AWS powers cloud infrastructure,
              VerifyStack is building the <span className="font-semibold text-foreground">trust infrastructure</span> for people and businesses.
            </p>
            <div className="glass-card rounded-2xl px-8 py-4 inline-flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent" />
              <p className="text-lg font-semibold gradient-text">
                "Should I trust this person?" — VerifyStack it.
              </p>
            </div>
            <p className="mt-8 text-xs text-muted-foreground font-mono uppercase tracking-widest">
              Building the Trust Infrastructure for India
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CategoryVision;
