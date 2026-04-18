import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBackground from "@/components/layout/HeroBackground";
import SolutionHeroBackground from "@/components/layout/SolutionHeroBackground";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ArrowRight, Home, Shield, CheckCircle,
  DoorOpen, Users, BedDouble, FileSearch, MapPin, Fingerprint,
  Clock, Lock, AlertTriangle, Star, Zap, PhoneCall
} from "lucide-react";
import { solutionGroups } from "@/lib/navigation";

const group = solutionGroups[1];

const features = [
  {
    icon: DoorOpen,
    title: "Tenant Verification",
    description: "Full background check on prospective tenants — identity, employment, criminal history, and rental references.",
  },
  {
    icon: Users,
    title: "Roommate Verification",
    description: "Verify co-living partners before sharing your space. Check identity, background, and social risk factors.",
  },
  {
    icon: BedDouble,
    title: "PG Resident Verification",
    description: "Streamlined screening for PG owners and hostel managers. Bulk verification supported for faster onboarding.",
  },
  {
    icon: FileSearch,
    title: "Rental Background Check",
    description: "Comprehensive rental history check — previous landlord references, payment track record, and eviction history.",
  },
  {
    icon: MapPin,
    title: "Address Verification",
    description: "Confirm permanent and current address with physical verification and geo-tagged documentation.",
  },
  {
    icon: Fingerprint,
    title: "Identity Verification",
    description: "Verify Aadhaar, PAN, passport, and other government IDs with AI-powered face match and liveness detection.",
  },
];

const stats = [
  { value: "2 Lakh+", label: "Tenants Screened" },
  { value: "< 12hrs", label: "Average TAT" },
  { value: "98.7%", label: "Accuracy Rate" },
  { value: "40,000+", label: "Property Owners" },
];

const howItWorks = [
  {
    step: "1",
    title: "Share Tenant Details",
    description: "Enter the tenant's name, phone, and ID number via the dashboard or share a self-verification link.",
  },
  {
    step: "2",
    title: "AI Screens in Real-Time",
    description: "Our system instantly cross-checks criminal records, identity databases, and rental history.",
  },
  {
    step: "3",
    title: "Get the Full Report",
    description: "Receive a clear, easy-to-read report with a trust score — know before you hand over the keys.",
  },
];

const whyChoose = [
  {
    icon: Zap, title: "Results in Hours", description: "Most tenant checks are complete within 12 hours of submission.",
    iconColor: "text-purple-500", iconBg: "bg-purple-500/10", hoverBorder: "hover:border-purple-500/20"
  },
  {
    icon: Lock, title: "Police Verification Ready", description: "Reports accepted for police verification in major cities.",
    iconColor: "text-primary", iconBg: "bg-primary/10", hoverBorder: "hover:border-primary/20"
  },
  {
    icon: AlertTriangle, title: "Red Flag Alerts", description: "Instant alerts for criminal records, fraud history, or identity mismatches.",
    iconColor: "text-orange-500", iconBg: "bg-orange-500/10", hoverBorder: "hover:border-orange-500/20"
  },
  {
    icon: Star, title: "Rental Reference Check", description: "We call previous landlords and verify payment and behavior history.",
    iconColor: "text-green-500", iconBg: "bg-green-500/10", hoverBorder: "hover:border-green-500/20"
  },
  {
    icon: PhoneCall, title: "Dedicated Support", description: "A verification specialist is assigned to every check for accuracy.",
    iconColor: "text-sky-500", iconBg: "bg-sky-500/10", hoverBorder: "hover:border-sky-500/20"
  },
  {
    icon: Clock, title: "24/7 Dashboard Access", description: "Monitor all your tenant checks in one place, any time.",
    iconColor: "text-indigo-500", iconBg: "bg-indigo-500/10", hoverBorder: "hover:border-indigo-500/20"
  },
];

const TenantPropertyVerification = () => (
  <div className="min-h-screen bg-background">
    <Header />

    {/* Hero */}
    <section className="relative pt-32 pb-20 overflow-hidden border-b border-border/30">
      <SolutionHeroBackground routePath="/solutions/tenant-property-verification" />
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-primary text-xs font-medium mb-6 border border-primary/20"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="font-mono uppercase tracking-widest">For Property Owners &amp; Landlords</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
          >
            Tenant &amp; Property{" "}
            <span className="gradient-text">Verification</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            Know who's moving into your property. Screen tenants, roommates, and PG residents with AI-powered background checks — protect your asset and ensure a safe environment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/run-check">
              <Button size="lg" className="w-full sm:w-auto group btn-glow">
                Screen a Tenant <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

    {/* Screening Solutions */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Screening Solutions
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Comprehensive tenant and property verification for landlords, PG owners, and housing societies
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
            Screen any tenant in 3 simple steps — no physical paperwork needed
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
    <section className="py-20 relative overflow-hidden">
      <HeroBackground
        imageUrl="https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        altText="Abstract background with keys and security elements"
      />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Why Landlords Trust VerifyStack
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Designed specifically for the Indian rental market — fast, accurate, and legally reliable
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {whyChoose.map((w, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={`flex items-start gap-4 p-5 glass-card rounded-xl border border-border/50 ${w.hoverBorder} transition-all group`}>
                <div className={`w-9 h-9 rounded-lg ${w.iconBg} flex items-center justify-center flex-shrink-0 group-hover:bg-opacity-20 transition-colors`}>
                  <w.icon className={`w-5 h-5 ${w.iconColor}`} />
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
              Protect Your Property Today
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Don't leave your property to chance. Get comprehensive tenant screening in minutes — before you hand over the keys.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/run-check">
                <Button size="lg" className="btn-glow">
                  Screen Now <ArrowRight className="w-4 h-4 ml-2" />
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

export default TenantPropertyVerification;
