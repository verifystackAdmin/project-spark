import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, Lock, Eye, Server, CheckCircle } from "lucide-react";

const Security = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <section className="relative pt-32 pb-20">
      <div className="absolute inset-0 neural-grid opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Security & <span className="gradient-text">Compliance</span></h1>
          <p className="text-lg text-muted-foreground">Enterprise-grade security protecting your data at every layer.</p>
        </div>
      </div>
    </section>
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Lock, title: "AES-256 Encryption", desc: "All data encrypted at rest and in transit." },
            { icon: Shield, title: "SOC 2 Ready", desc: "Enterprise compliance framework in place." },
            { icon: Eye, title: "DPDP 2023 Compliant", desc: "Full compliance with India's data protection law." },
            { icon: Server, title: "Secure Infrastructure", desc: "Hosted on enterprise cloud with 99.9% uptime." },
            { icon: CheckCircle, title: "Access Controls", desc: "Role-based access and audit logging." },
            { icon: Shield, title: "Regular Audits", desc: "Periodic security assessments and pen testing." },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="glass-card rounded-xl p-6 border border-border/50">
                <item.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Security;
