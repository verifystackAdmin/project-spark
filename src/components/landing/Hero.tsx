import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, PlayCircle, ShieldCheck, Zap, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import AIParticleBackground from "../AIParticleBackground";

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } },
  item: {
    hidden:  { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  },
};

export const Hero = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* AI Particle Background */}
      <AIParticleBackground />

      {/* Animated gradient orbs */}
      <div
        className="orb-pulse absolute top-1/4 left-[15%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.07) 0%, transparent 70%)" }}
      />
      <div
        className="orb-pulse-slow absolute bottom-1/4 right-[10%] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(185 100% 50% / 0.06) 0%, transparent 70%)" }}
      />
      <div
        className="orb-pulse absolute top-[60%] left-[50%] w-[260px] h-[260px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(265 85% 58% / 0.05) 0%, transparent 70%)", animationDelay: "3s" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-secondary/50" />

      <div className="relative container mx-auto px-4 pt-24 pb-20 md:pt-40 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — staggered text */}
          <motion.div
            className="text-center md:text-left"
            variants={stagger.container}
            initial="hidden"
            animate="visible"
          >
            {/* Trust badge */}
            <motion.div variants={stagger.item} className="mb-5 flex justify-center md:justify-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 glass-card rounded-full text-xs font-medium text-primary border border-primary/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                DPDP 2023 Compliant &nbsp;·&nbsp; AES-256 Encrypted
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={stagger.item}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5"
            >
              Trust, Verified.{" "}
              <span className="gradient-text">For Everyone.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={stagger.item}
              className="max-w-xl mx-auto md:mx-0 text-base md:text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Enterprise-grade background verification for businesses, agencies, housing societies, and individuals — powered by AI and real-time data.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={stagger.item}
              className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-3 mb-10"
            >
              <Link to="/signup">
                <Button size="lg" variant="hero" className="btn-glow group">
                  Start Verification
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="bg-background hover:bg-secondary/40 transition-colors">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  View Demo
                </Button>
              </Link>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              variants={stagger.item}
              className="flex flex-wrap justify-center md:justify-start gap-5 text-xs text-muted-foreground"
            >
              {[
                { icon: BadgeCheck, label: "10M+ Records Verified" },
                { icon: Zap, label: "< 24hr TAT" },
                { icon: ShieldCheck, label: "99.2% Accuracy" },
              ].map((s) => (
                <span key={s.label} className="flex items-center gap-1.5">
                  <s.icon className="w-3.5 h-3.5 text-primary" />
                  {s.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — image with entrance animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block relative"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl scale-95 opacity-60" />
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="AI Dashboard showing verification & trust analytics"
              className="relative rounded-2xl shadow-2xl border border-white/10"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
