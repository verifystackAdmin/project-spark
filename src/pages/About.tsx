import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Shield, Users, Target, Award, Globe, Brain, Lock, CheckCircle } from "lucide-react";

const values = [
  { icon: Shield, title: "Trust & Security", desc: "AI-powered identity verification, real-time data sources, and compliance-first architecture in one platform." },
  { icon: Users, title: "People First", desc: "Designed for businesses, agencies, housing societies, and everyday individuals who value transparency." },
  { icon: Target, title: "Our Mission", desc: "To democratize trust—making enterprise-grade background verification accessible to everyone." },
  { icon: Award, title: "Quality Commitment", desc: "Every report goes through multiple validation layers with 99.2% accuracy across all verification checks." },
];

const trustSignals = [
  { icon: CheckCircle, label: "GDPR Ready" },
  { icon: Shield, label: "India DPDP Compliant" },
  { icon: Lock, label: "Secure Infrastructure" },
  { icon: Brain, label: "AI-Powered Risk Scoring" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <ScrollReveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                The Trust Layer for the{" "}
                <span className="gradient-text">Internet & Real World</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                VerifyStack democratizes trust—making enterprise-grade background verification accessible to businesses, agencies, housing societies, and everyday individuals. Just like Stripe powers payments and AWS powers cloud infrastructure, VerifyStack is building the trust infrastructure for people and businesses.
              </p>
            </div>
          </ScrollReveal>

          {/* Values */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {values.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Trust Signals */}
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
              {trustSignals.map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-3 bg-card rounded-2xl px-5 py-3 border border-border shadow-sm cursor-default"
                >
                  <div className="w-8 h-8 rounded-full bg-trust/10 flex items-center justify-center">
                    <badge.icon className="w-4 h-4 text-trust" />
                  </div>
                  <span className="font-medium text-foreground text-sm">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Location */}
          <ScrollReveal direction="scale">
            <div className="text-center p-8 rounded-2xl bg-secondary/50 border border-border max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                <Globe className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Based in Pune, India</h2>
              <p className="text-muted-foreground mb-4">
                VerifyStack is proudly built in Pune, India, serving customers worldwide with cutting-edge verification technology.
              </p>
              <p className="text-sm font-medium gradient-text">
                VerifyStack is building the Trust Infrastructure for India.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
