import { motion } from "framer-motion";
import { Upload, Cpu, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import HeroBackground from "@/components/layout/HeroBackground";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Submit Identity",
    description:
      "Upload documents, social profiles, or initiate via API. We support Aadhaar, PAN, Passport, and more.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    numberColor: "text-primary/30",
  },
  {
    step: "02",
    icon: Cpu,
    title: "AI Analysis",
    description:
      "Our AI cross-references thousands of data points — document authenticity, criminal records, and network behavior.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    numberColor: "text-purple-500/30",
  },
  {
    step: "03",
    icon: FileCheck,
    title: "Risk Score & Report",
    description:
      "Get a dynamic Trust Score (0–100), fraud probability, and detailed report to make informed decisions.",
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    numberColor: "text-green-500/30",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-y border-border/30">
      <HeroBackground
        imageUrl="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        altText="Abstract technology background with a person interacting with a futuristic interface"
      />
      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 border border-primary/20 uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 gradient-text">
              From Data to Decision in 3 Steps
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep insights with minimal friction. Act with speed and confidence.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto relative">

          {/* Connector line — desktop only */}
          <div className="hidden sm:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-primary/20 via-purple-500/50 to-green-500/20 z-0" />

          {steps.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative flex flex-col items-center text-center p-6 md:p-8 rounded-2xl border ${s.border} bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors duration-200`}
              >
                {/* Step number — background watermark */}
                <span className={`absolute top-4 right-5 text-5xl font-extrabold ${s.numberColor} select-none pointer-events-none leading-none`}>
                  {s.step}
                </span>

                {/* Icon */}
                <div className={`relative z-10 w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center mb-5`}>
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>

                {/* Label */}
                <p className={`text-xs font-mono font-semibold tracking-widest uppercase ${s.color} mb-2`}>
                  Step {s.step}
                </p>

                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/run-check">
              <Button size="lg" className="btn-glow w-full sm:w-auto">
                Start a Free Verification
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-border/50">
                Contact Us
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            No signup required · DPDP 2023 Compliant · AES-256 Encrypted
          </p>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
