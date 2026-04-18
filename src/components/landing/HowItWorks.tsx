import { UploadCloud, ShieldCheck, Gauge } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: UploadCloud,
    title: "Submit Identity",
    description:
      "Upload documents, social profiles, or initiate via API. We support Aadhaar, PAN, Passport, and more.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "AI Analysis",
    description:
      "Our AI cross-references thousands of data points — document authenticity, criminal records, and network behavior.",
  },
  {
    number: "03",
    icon: Gauge,
    title: "Risk Score & Report",
    description:
      "Get a dynamic Trust Score (0–100), fraud probability, and detailed report to make informed decisions.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Deep insights with minimal friction.
          </h2>
          <p className="text-base text-muted-foreground">
            Act with speed and confidence. VerifyStack turns raw identity data into a clear, actionable Trust Score in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 z-0" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              {/* Step number badge */}
              <div className="relative z-10 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-card border-2 border-border group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300 flex items-center justify-center shadow-sm">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center leading-none">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2">
                Step {step.number} — {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            to="/run-check"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity btn-glow"
          >
            Start a Free Verification
          </Link>
          <p className="mt-3 text-xs text-muted-foreground">No signup required · DPDP 2023 Compliant · AES-256 Encrypted</p>
        </div>

      </div>
    </section>
  );
};
