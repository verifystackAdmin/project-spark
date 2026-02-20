import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Shield, ArrowRight, Building, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const contactCards = [
  { icon: Mail, title: "Email", detail: "support@verifystack.in", href: "mailto:support@verifystack.in" },
  { icon: MapPin, title: "Location", detail: "Pune, India", href: null },
  { icon: Clock, title: "Response Time", detail: "Within 24 hours", href: null },
];

const partnerTypes = [
  { icon: Building, title: "Businesses", desc: "Enterprise-grade verification at scale" },
  { icon: Users, title: "Staffing Agencies", desc: "Become a Verified Agency Partner" },
  { icon: Home, title: "Housing Societies", desc: "Secure your community at scale" },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                Get in Touch
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Let's Build Trust Together
              </h1>
              <p className="text-lg text-muted-foreground">
                Whether you're a business, agency, housing society, or individual — we'd love to hear from you.
              </p>
            </div>
          </ScrollReveal>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            {contactCards.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl border border-border bg-card text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-primary hover:underline text-sm">{item.detail}</a>
                  ) : (
                    <p className="text-muted-foreground text-sm">{item.detail}</p>
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Partnership Section */}
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Partner With VerifyStack
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Join the trust ecosystem. We work with businesses, agencies, and communities to make verification seamless.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {partnerTypes.map((type, i) => (
              <ScrollReveal key={type.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl border border-border bg-secondary/30 text-center">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <type.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                VerifyStack is building the Trust Infrastructure for India.
              </p>
              <Link to="/demo">
                <Button size="lg" className="group hover-glow">
                  Request Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
