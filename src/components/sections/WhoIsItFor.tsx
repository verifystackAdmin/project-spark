import { motion } from "framer-motion";
import { Building, Users, Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const audiences = [
  {
    icon: Building,
    title: "Businesses",
    description: "Hire with confidence. Prevent fraud. Reduce onboarding risk with AI-powered screening.",
    cta: "Employee Screening",
    link: "/use-cases/employee-background-check",
    accent: "from-primary to-primary/60",
  },
  {
    icon: Users,
    title: "Individuals & Families",
    description: "Verify a nanny, driver, tenant, or partner before you trust them.",
    cta: "Tenant Screening",
    link: "/use-cases/tenant-screening",
    accent: "from-accent to-accent/60",
  },
  {
    icon: Home,
    title: "Agencies & Societies",
    description: "Verify at scale. Build a trusted workforce ecosystem with bulk verification.",
    cta: "Society Screening",
    link: "/use-cases/housing-society-screening",
    accent: "from-purple-500 to-primary",
  },
];

const WhoIsItFor = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 border border-primary/20 uppercase tracking-widest">
              Built for Everyone
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Who Is VerifyStack For?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade verification built for businesses, agencies and individuals.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {audiences.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group glass-card-hover rounded-2xl p-8 h-full flex flex-col"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">{item.description}</p>
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold btn-glow hover:opacity-90 transition-all group/btn"
                >
                  {item.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
