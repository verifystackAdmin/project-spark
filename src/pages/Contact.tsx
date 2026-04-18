import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBackground from "@/components/layout/HeroBackground";
import { siteIndia } from "@/lib/siteIdentity";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, ArrowRight, Building, Users, Home, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CALENDLY_BOOK_DEMO_URL } from "@/lib/siteLinks";

const contactCards = [
  { icon: Mail, title: "Support", detail: "support@verifystack.in", href: "mailto:support@verifystack.in" },
  {
    icon: Briefcase,
    title: "Enterprise sales",
    detail: "sales@verifystack.in",
    href: "mailto:sales@verifystack.in?subject=VerifyStack%20Enterprise%20pricing%20inquiry",
    callHref: CALENDLY_BOOK_DEMO_URL,
    callLabel: "Book a 30-minute demo call",
  },
  { icon: MapPin, title: "Head office", detail: "Pune, Maharashtra, India", href: null },
  { icon: Clock, title: "Response Time", detail: "Within 24 hours", href: null },
];

const partnerTypes = [
  {
    icon: Building,
    title: "Businesses",
    desc: "Enterprise-grade verification at scale",
    img: "https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    icon: Users,
    title: "Staffing Agencies",
    desc: "Become a Verified Agency Partner",
    img: "https://images.pexels.com/photos/8199563/pexels-photo-8199563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    icon: Home,
    title: "Housing Societies",
    desc: "Secure your community at scale",
    img: "https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16">
        <section className="relative overflow-hidden border-b border-border/30 pt-28 pb-12 md:pb-16">
          <HeroBackground
            imageUrl="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            altText="A team collaborating in an office"
          />
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4 border border-border/60">
                  Get in Touch
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 gradient-text">
                  Let's Build Trust Together
                </h1>
                <p className="text-lg text-muted-foreground">
                  Whether you're a business, agency, housing society, or individual — we'd love to hear from you.
                </p>
                <p className="mt-3 text-sm text-muted-foreground/90">{siteIndia.trustLine}</p>
                <p className="mt-2 text-xs text-muted-foreground">{siteIndia.locationWithTz}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
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
                    <div className="space-y-2">
                      <a href={item.href} className="text-primary hover:underline text-sm block">
                        {item.detail}
                      </a>
                      {"callHref" in item && item.callHref ? (
                        <a
                          href={item.callHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm font-medium block"
                        >
                          {"callLabel" in item ? item.callLabel : "Book a call"}
                        </a>
                      ) : null}
                    </div>
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 gradient-text">
                Partner With VerifyStack
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Join the trust ecosystem. We work with businesses, agencies, and communities to make verification seamless.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {partnerTypes.map((type, i) => (
              <ScrollReveal key={type.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-border bg-card overflow-hidden h-full flex flex-col group transition-shadow hover:shadow-lg">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={type.img}
                      alt={type.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                        <type.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-foreground mb-1">{type.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1">{type.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                VerifyStack is building the Trust Infrastructure for India.
              </p>
              <Button size="lg" className="group hover-glow" asChild>
                <a href={CALENDLY_BOOK_DEMO_URL} target="_blank" rel="noopener noreferrer">
                  Request Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
