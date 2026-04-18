import UseCasePageLayout from "@/components/UseCasePageLayout";
import { ChefHat } from "lucide-react";

const CookVerification = () => (
  <UseCasePageLayout
    badge="Cook Verification"
    title="Verify Your"
    highlight="Personal Cook"
    subtitle="Background checks for personal cooks and kitchen staff to ensure hygiene, safety, and trust."
    icon={ChefHat}
    features={[
      { title: "Identity Check", description: "Verify cook's identity documents." },
      { title: "Criminal Record", description: "Screen for any criminal history." },
      { title: "Health Certification", description: "Check food handling certifications." },
      { title: "Work History", description: "Verify previous cooking employment." },
      { title: "Address Verification", description: "Confirm residential address." },
      { title: "Reference Check", description: "Contact previous employers." },
    ]}
    howItWorks={[
      { step: "1", title: "Submit Details", description: "Enter cook's information." },
      { step: "2", title: "AI Screening", description: "Comprehensive background check." },
      { step: "3", title: "Get Report", description: "Receive verified safety report." },
    ]}
    relatedPages={[
      { label: "Maid Verification", href: "/use-case/maid-verification" },
      { label: "Caregiver Verification", href: "/use-case/caregiver-verification" },
      { label: "Domestic Worker", href: "/solutions/domestic-worker-verification" },
    ]}
  />
);

export default CookVerification;
