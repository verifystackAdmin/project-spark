import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SolutionHeroBackground from "@/components/layout/SolutionHeroBackground";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ArrowRight, HandHelping, Shield,
  Home, Car, Baby, ChefHat, UserCheck, Fingerprint, AlertTriangle,
  Clock, Lock, Star, Zap, PhoneCall, FileCheck
} from "lucide-react";
import { solutionGroups } from "@/lib/navigation";

const group = solutionGroups[2];

const features = [
  {
    icon: Home,
    title: "Maid Verification",
    description: "Full background check for housemaids — identity, criminal records, past employer references, and address verification.",
  },
  {
    icon: Car,
    title: "Driver Verification",
    description: "Verify personal and commercial drivers — driving license validation, criminal history, and previous employer check.",
  },
  {
    icon: Baby,
    title: "Caregiver Verification",
    description: "Thorough screening for nannies and elderly caregivers. Includes mental health flags, criminal records, and reference checks.",
  },
  {
    icon: ChefHat,
    title: "Cook Verification",
    description: "Background and identity verification for home cooks — past employment, identity documents, and criminal record check.",
  },
  {
    icon: UserCheck,
    title: "Househelp Background Check",
    description: "Comprehensive background screening for all household staff. Get a single report covering all key risk factors.",
  },
  {
    icon: AlertTriangle,
    title: "Criminal Record Check",
    description: "Pan-India criminal database search, court records, and police verification specifically for domestic workers.",
  },
];

const stats = [
  { value: "5 Lakh+", label: "Workers Verified" },
  { value: "< 6hrs", label: "Express TAT" },
  { value: "99.1%", label: "Match Accuracy" },
  { value: "1 Lakh+", label: "Families Protected" },
];

const howItWorks = [
  {
    step: "1",
    title: "Enter Worker Details",
    description: "Share the worker's name, phone number, and any available ID. We'll handle the rest.",
  },
  {
    step: "2",
    title: "AI-Powered Deep Check",
    description: "Our system scans criminal databases, identity records, and past employer history across India.",
  },
  {
    step: "3",
    title: "Trust Score Report",
    description: "Receive a detailed report with a trust score, red flags (if any), and a verification certificate.",
  },
];

const whyChoose = [
  { icon: Zap, title: "Express 6-Hour Results", description: "For urgent hirings — get verified results in as little as 6 hours." },
  { icon: Lock, title: "Police Verification Support", description: "Reports formatted for police verification submission in all major states." },
  { icon: Star, title: "Employer Reference Calls", description: "Our team personally calls past employers to verify work history and behavior." },
  { icon: FileCheck, title: "Verification Certificate", description: "Issue a VerifyStack-certified badge to verified domestic workers." },
  { icon: PhoneCall, title: "Dedicated Agent Support", description: "Every check is overseen by a human verification agent for accuracy." },
  { icon: Clock, title: "Re-verification Reminders", description: "Auto-reminders to re-screen staff annually or after any incident." },
];

const DomesticWorkerVerificationPage = () => (
  <div className="min-h-screen bg-background">
    <Header />

    {/* Hero */}
    <section className="relative border-b border-border/30 pt-32 pb-20 overflow-hidden">
      <SolutionHeroBackground routePath="/solutions/domestic-worker-verification" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-primary text-xs font-medium mb-6 border border-primary/20"
          >
            <HandHelping className="w-3.5 h-3.5" />
            <span className="font-mono uppercase tracking-widest">For Households &amp; Families</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
          >
            Domestic Worker{" "}
            <span className="gradient-text">Verification</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            Your family deserves safety. Verify maids, drivers, cooks, caregivers, and all household staff with AI-powered background checks before they enter your home.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/run-check">
              <Button size="lg" className="w-full sm:w-auto group btn-glow">
                Verify Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-border/50">
                View Pricing
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-12 border-y border-border/50 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div>
                <p className="text-3xl font-extrabold gradient-text mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Verification Services */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Verification Services
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Comprehensive background screening for every type of household staff
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="glass-card rounded-xl p-6 h-full border border-border/50 hover:border-primary/30 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">How It Works</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Verify any household staff member in 3 simple steps
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {howItWorks.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Why VerifyStack */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Why Families Choose VerifyStack
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            The only platform built specifically for domestic worker verification in India
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {whyChoose.map((w, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="flex items-start gap-4 p-5 glass-card rounded-xl border border-border/50 hover:border-primary/20 transition-all">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <w.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{w.title}</h3>
                  <p className="text-sm text-muted-foreground">{w.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 text-center">
        <ScrollReveal>
          <div className="glass-card rounded-2xl p-10 max-w-3xl mx-auto border border-border/50">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Family's Safety Matters
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Don't let a stranger into your home without verification. Get peace of mind with VerifyStack — results in hours, not days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/run-check">
                <Button size="lg" className="btn-glow">
                  Verify Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="border-border/50">View Pricing</Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Related Use Cases */}
    <section className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6 text-center">
          Explore Use Cases
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {group.useCases.map((uc, i) => (
            <Link key={i} to={uc.href}>
              <Button variant="outline" size="sm" className="text-xs border-border/50 hover:border-primary/50 flex items-center gap-1.5">
                <uc.icon className="w-3 h-3" />
                {uc.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default DomesticWorkerVerificationPage;
