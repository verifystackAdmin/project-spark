import { Upload, Cpu, FileCheck, ArrowRight, ArrowDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Submit Identity",
    description: "Upload documents, social profiles, or initiate via API. We support Aadhaar, PAN, Passport, and more.",
    accent: "primary",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analysis",
    description: "Our AI cross-references thousands of data points—document authenticity, criminal records, network behavior.",
    accent: "accent",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Risk Score & Report",
    description: "Get a dynamic Trust Score (0-100), fraud probability, and detailed report to make immediate decisions.",
    accent: "trust",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 border border-primary/20 uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              From Data to Decision in 3 Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep insights with minimal friction. Act with speed and confidence.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[15%] right-[15%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-primary/40 via-accent/40 to-trust/40" />
            <div className="absolute inset-0 data-flow-line h-px" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="group relative flex flex-col items-center text-center">
                  <div className="glass-card-hover rounded-2xl p-8 w-full">
                    {/* Step number */}
                    <div className="text-xs font-mono text-muted-foreground mb-4 tracking-widest uppercase">
                      Step {step.step}
                    </div>

                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110",
                      step.accent === "primary" && "bg-primary/10 text-primary group-hover:bg-primary/20",
                      step.accent === "accent" && "bg-accent/10 text-accent group-hover:bg-accent/20",
                      step.accent === "trust" && "bg-trust/10 text-trust group-hover:bg-trust/20",
                    )}>
                      <step.icon className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="md:hidden mt-4">
                      <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
