import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Smile } from "lucide-react";

const DatingProfileVerification = () => (
  <UseCasePageLayout
    badge="Dating Verification"
    title="Verify"
    highlight="Dating Profiles"
    subtitle="Stay safe in online dating. Verify the identity and background of people you meet online."
    icon={Smile}
    features={[
      { title: "Photo Verification", description: "AI facial matching to confirm real photos." },
      { title: "Identity Check", description: "Verify real name and identity documents." },
      { title: "Criminal Screen", description: "Check for criminal records and offenses." },
      { title: "Social Media Cross-check", description: "Verify social media profile consistency." },
      { title: "Catfish Detection", description: "AI-powered fake profile detection." },
      { title: "Discreet & Private", description: "Completely confidential verification." },
    ]}
    howItWorks={[
      { step: "1", title: "Share Profile", description: "Submit dating profile details." },
      { step: "2", title: "AI Analysis", description: "Cross-reference identity and records." },
      { step: "3", title: "Trust Score", description: "Get a safety trust score report." },
    ]}
    relatedPages={[
      { label: "Relationship Check", href: "/use-case/relationship-background-check" },
      { label: "Social Risk Check", href: "/use-case/social-risk-check" },
      { label: "Identity Verification", href: "/use-case/identity-verification" },
    ]}
  />
);

export default DatingProfileVerification;
