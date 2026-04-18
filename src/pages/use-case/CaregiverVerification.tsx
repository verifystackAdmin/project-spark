import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Baby } from "lucide-react";

const CaregiverVerification = () => (
  <UseCasePageLayout
    badge="Caregiver Verification"
    title="Verify"
    highlight="Caregivers & Nannies"
    subtitle="Ensure the safety of your loved ones with thorough caregiver and nanny background checks."
    icon={Baby}
    features={[
      { title: "Identity Check", description: "Full identity document verification." },
      { title: "Criminal Background", description: "Comprehensive criminal record screening." },
      { title: "Medical Credentials", description: "Verify healthcare certifications if applicable." },
      { title: "Reference Check", description: "Contact and verify previous employer references." },
      { title: "Child Safety Screen", description: "Specialized checks for child-related offenses." },
      { title: "Address Verification", description: "Confirm current residential address." },
    ]}
    howItWorks={[
      { step: "1", title: "Submit Info", description: "Enter caregiver's details and documents." },
      { step: "2", title: "Deep Check", description: "AI performs specialized caregiver screening." },
      { step: "3", title: "Trust Report", description: "Receive comprehensive safety report." },
    ]}
    relatedPages={[
      { label: "Maid Verification", href: "/use-case/maid-verification" },
      { label: "Househelp Background Check", href: "/use-case/househelp-background-check" },
      { label: "Domestic Worker", href: "/solutions/domestic-worker-verification" },
    ]}
  />
);

export default CaregiverVerification;
