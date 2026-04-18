import { ShieldCheck, Lock, Building2, Factory, Network, Globe, Cloud } from "lucide-react";

const logos = [
  { name: "Enterprise", icon: Building2 },
  { name: "Startup", icon: Factory },
  { name: "Platform", icon: Network },
  { name: "Community", icon: Globe },
  { name: "Service", icon: Cloud },
];

export const TrustSignals = () => {
  return (
    <section className="bg-secondary/50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-lg font-semibold text-muted-foreground">
            Trusted by leading platforms and communities
          </p>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {logos.map((logo) => (
              <logo.icon
                key={logo.name}
                className="h-8 w-auto text-muted-foreground"
              />
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Enterprise-Grade Security & Compliance
          </h2>
          <p className="text-lg text-muted-foreground">
            Our infrastructure is built from the ground up to meet the most
            rigorous security and data protection standards. Your trust is our
            most important asset.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-trust" />
              <span className="font-medium">SOC 2 Type II (Coming Soon)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-trust" />
              <span className="font-medium">GDPR Compliant (Coming Soon)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-trust" />
              <span className="font-medium">ISO 27001 Certified (Coming Soon)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
