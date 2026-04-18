import { Users, MessagesSquare, Store, Heart } from "lucide-react";
import { motion } from "framer-motion";

const useCases = [
  {
    icon: Users,
    title: "Founders & Hiring",
    description:
      "Go beyond the resume. Use network analysis to verify work history and our AI Risk Score to evaluate candidates for key roles.",
    image: "",
  },
  {
    icon: Store,
    title: "Marketplaces",
    description:
      "Automate seller verification, reduce fraudulent listings, and use our Trust Score to build a safer environment for transactions.",
    image: "",
  },
  {
    icon: MessagesSquare,
    title: "Online Communities",
    description:
      "Proactively identify bad actors and potential spam with behavioral analysis, long before they can disrupt your community.",
    image: "",
  },
  {
    icon: Heart,
    title: "Dating & Social Platforms",
    description:
      "Protect your users from romance scams and catfishing with our multi-layered risk assessment and identity verification.",
    image: "",
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
              {useCase.image && <img src={useCase.image} alt={useCase.title} className="h-60 w-full object-cover" />}
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
