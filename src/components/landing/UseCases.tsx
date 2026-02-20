import { Users, MessagesSquare, Store, Heart } from "lucide-react";
import { motion } from "framer-motion";

const useCases = [
  {
    icon: Users,
    title: "Founders & Hiring",
    description:
      "Go beyond the resume. Use network analysis to verify work history and our AI Risk Score to evaluate candidates for key roles.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
  },
  {
    icon: Store,
    title: "Marketplaces",
    description:
      "Automate seller verification, reduce fraudulent listings, and use our Trust Score to build a safer environment for transactions.",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1974&auto=format&fit=crop",
  },
  {
    icon: MessagesSquare,
    title: "Online Communities",
    description:
      "Proactively identify bad actors and potential spam with behavioral analysis, long before they can disrupt your community.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    icon: Heart,
    title: "Dating & Social Platforms",
    description:
      "Protect your users from romance scams and catfishing with our multi-layered risk assessment and identity verification.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
  },
];

export const UseCases = () => {
  return (
    <section className="bg-secondary/50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Built for Modern Platforms
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From two-sided marketplaces to online communities, VerifyStack is
            the universal trust layer for the internet.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase) => (
            <motion.div
              key={useCase.title}
              className="bg-card rounded-2xl border overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img src={useCase.image} alt={useCase.title} className="h-60 w-full object-cover" />
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 mb-4">
                  <useCase.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground">
                  {useCase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
