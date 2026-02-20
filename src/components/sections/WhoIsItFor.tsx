import { motion } from "framer-motion";
import { Building, Users, Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const audiences = [
  {
    icon: Building,
    title: "Businesses",
    description: "Hire with confidence. Prevent fraud. Reduce onboarding risk.",
    cta: "Learn More",
    link: "/use-cases",
  },
  {
    icon: Users,
    title: "Individuals & Families",
    description: "Verify nannies, drivers, tenants, and partners before you trust them.",
    cta: "Verify Someone",
    link: "/run-check",
  },
  {
    icon: Home,
    title: "Agencies & Societies",
    description: "Verify at scale. Build a trusted workforce ecosystem.",
    cta: "Partner With Us",
    link: "/contact",
  },
];

const WhoIsItFor = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Built for Everyone
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who Is VerifyStack For?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              VerifyStack democratizes trust—making enterprise-grade background verification accessible to all.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {audiences.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 text-center h-full flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-6 flex-1">{item.description}</p>
                <Link to={item.link}>
                  <Button variant="outline" size="sm" className="group/btn hover-lift">
                    {item.cta}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
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
