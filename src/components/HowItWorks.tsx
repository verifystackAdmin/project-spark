import { Upload, Cpu, FileCheck, ArrowRight, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Upload,
    title: "Upload Documents",
    description: "Upload identity documents, photos, or chat exports securely. We support Aadhaar, PAN, Passport, and more.",
    color: "from-primary to-primary/80",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop",
  },
  {
    icon: Cpu,
    title: "AI Verification",
    description: "Our advanced AI analyzes documents, verifies authenticity, checks criminal records, and scans social presence.",
    color: "from-accent to-teal-400",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
  },
  {
    icon: FileCheck,
    title: "Get Trust Report",
    description: "Receive a comprehensive verification report with Trust Score (0-100) and detailed findings within minutes.",
    color: "from-trust to-teal-500",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float animation-delay-200" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4 animate-bounce-in">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-slide-up">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up animation-delay-100">
            Get comprehensive background verification in three simple steps
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-32 left-[20%] right-[20%] h-1 bg-gradient-to-r from-primary via-accent to-trust rounded-full" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Step Card */}
                <div className="bg-card rounded-3xl p-6 border border-border shadow-lg hover:shadow-xl transition-all duration-500 w-full hover:-translate-y-2">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className={cn(
                      "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg",
                      step.color
                    )}>
                      <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden mb-6 mt-4">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                    
                    {/* Icon Overlay */}
                    <div className={cn(
                      "absolute bottom-3 right-3 w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300",
                      step.color
                    )}>
                      <step.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden mt-6 animate-bounce">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowDown className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                )}

                {/* Arrow between cards - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-32 -right-6 z-10">
                    <div className="w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;