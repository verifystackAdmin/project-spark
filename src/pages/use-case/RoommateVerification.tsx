import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Users } from "lucide-react";

const RoommateVerification = () => (
  <UseCasePageLayout
    badge="Roommate Verification"
    title="Verify Your"
    highlight="Potential Roommate"
    subtitle="Ensure safety before sharing your living space with comprehensive roommate background checks."
    icon={Users}
    features={[
      { title: "Identity Verification", description: "Confirm your roommate's real identity." },
      { title: "Criminal Check", description: "Screen for criminal history and court records." },
      { title: "Social Profile Check", description: "Verify social media presence and consistency." },
      { title: "Employment Check", description: "Confirm employment status and income." },
      { title: "Reference Verification", description: "Contact and verify personal references." },
      { title: "Lifestyle Assessment", description: "AI-powered compatibility insights." },
    ]}
    howItWorks={[
      { step: "1", title: "Share Details", description: "Enter your potential roommate's information." },
      { step: "2", title: "Background Check", description: "AI runs comprehensive safety screening." },
      { step: "3", title: "Safety Report", description: "Get a detailed safety and trust report." },
    ]}
    relatedPages={[
      { label: "Tenant Verification", href: "/use-case/tenant-verification" },
      { label: "PG Resident Verification", href: "/use-case/pg-resident-verification" },
      { label: "Identity Verification", href: "/use-case/identity-verification" },
    ]}
  />
);

export default RoommateVerification;
