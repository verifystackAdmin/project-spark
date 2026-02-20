import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import AIParticleBackground from "../AIParticleBackground";

export const Hero = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Magical AI Particle Background */}
      <AIParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-secondary/50" />

      <div className="relative container mx-auto px-4 pt-24 pb-20 md:pt-40 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="text-center md:text-left">

            {/* Hero Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
            >
              Trust, Verified. For Everyone.
            </motion.h1>

            {/* Subheadline / Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-xl mx-auto md:mx-0 text-base md:text-xl text-muted-foreground mb-10"
            >
              Enterprise-grade background verification for businesses, agencies, housing societies, and individuals—powered by AI and real-time data.
            </motion.p>

            {/* Call-to-Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4"
            >
              <Link to="/signup">
                <Button size="lg" variant="hero">
                  Start Verification
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="bg-background">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="AI Dashboard showing verification & trust analytics"
              className="rounded-2xl shadow-2xl border border-white/10"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
