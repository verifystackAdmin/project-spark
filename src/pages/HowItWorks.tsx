import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Upload,
  Cpu,
  FileCheck,
  ArrowRight,
  ArrowDown,
  Shield,
  CheckCircle,
  Clock,
  Lock,
  Heart,
  MessageCircle,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Upload,
    title: "Upload Documents or Chats",
    description: "Securely upload identity documents (Aadhaar, PAN, Passport) or relationship chat exports. All data is encrypted.",
    color: "from-primary to-primary/80",
    details: ["ID documents", "Photos for face match", "Chat exports (WhatsApp, etc.)"],
  },
  {
    icon: Cpu,
    title: "AI Analyzes Everything",
    description: "Our AI verifies document authenticity, matches faces, scans for red flags, and analyzes communication patterns.",
    color: "from-accent to-teal-400",
    details: ["Identity verification", "Document forgery detection", "Behavioral analysis"],
  },
  {
    icon: FileCheck,
    title: "Get Your Trust Report",
    description: "Receive a comprehensive report with Trust Score (0-100), verified findings, and actionable insights — in minutes.",
    color: "from-trust to-teal-500",
    details: ["Trust Score", "Red flag alerts", "Detailed findings"],
  },
];

const whatWeVerify = [
  {
    icon: UserCheck,
    title: "Identity",
    items: ["Government ID verification", "Face match technology", "Social media cross-check"],
  },
  {
    icon: Heart,
    title: "Relationships",
    items: ["Dating profile authenticity", "Background history", "Social presence analysis"],
  },
  {
    icon: MessageCircle,
    title: "Communication",
    items: ["Manipulation detection", "Gaslighting patterns", "Emotional health score"],
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[15%] w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-semibold">
            Simple & Secure Process
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              VerifyStack
            </span>{" "}
            Works
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Get peace of mind in three simple steps. Our AI-powered verification gives you the truth — fast, secure, and confidential.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              256-bit Encryption
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="w-8 h-8 rounded-full bg-trust/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-trust" />
              </div>
              Results in Minutes
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-accent" />
              </div>
              100% Confidential
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="relative max-w-5xl mx-auto">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-24 left-[20%] right-[20%] h-1 bg-gradient-to-r from-primary via-accent to-trust rounded-full" />

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Step Card */}
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-500 w-full hover:-translate-y-2">
                    {/* Step Number Badge */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                      <div className={cn(
                        "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg",
                        step.color
                      )}>
                        <span className="text-lg font-bold text-primary-foreground">{index + 1}</span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className={cn(
                      "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300",
                      step.color
                    )}>
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden mt-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ArrowDown className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  )}

                  {/* Arrow between cards - Desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-6 z-10">
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

      {/* What We Verify */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              What We Verify
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive verification across identity, relationships, and communication patterns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {whatWeVerify.map((category, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            It only takes a few minutes to get your verification report. Know the truth before you commit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/run-check">
              <Button variant="hero" size="lg" className="gap-2">
                Start Verification
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;