import { UploadCloud, ShieldCheck, Gauge } from "lucide-react";

const steps = [
  {
    icon: UploadCloud,
    title: "1. Submit an Identity",
    description:
      "Initiate a check with an email, social profile, or document via our secure portal or API.",
  },
  {
    icon: ShieldCheck,
    title: "2. AI Analyzes Digital & Real-world Data",
    description:
      "Our AI engine cross-references thousands of data points, from document authenticity to network behavior.",
  },
  {
    icon: Gauge,
    title: "3. Receive Actionable Risk Insights",
    description:
      "Get a dynamic Trust Score, fraud probability, and detailed report to make an immediate, informed decision.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="bg-secondary/50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            From Data to Decision in 3 Simple Steps
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Our streamlined process delivers deep insights with minimal friction,
            enabling you to act with speed and confidence.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
