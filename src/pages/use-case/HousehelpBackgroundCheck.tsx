import UseCasePageLayout from "@/components/UseCasePageLayout";
import { UserCheck } from "lucide-react";

const HousehelpBackgroundCheck = () => (
  <UseCasePageLayout
    badge="Househelp Check"
    title="Househelp"
    highlight="Background Check"
    subtitle="All-in-one background verification for any type of household staff — maids, gardeners, guards, and more."
    icon={UserCheck}
    features={[
      { title: "Comprehensive ID Check", description: "Multi-document identity verification." },
      { title: "Criminal Screening", description: "Court and police record search." },
      { title: "Address Verification", description: "Physical address confirmation." },
      { title: "Previous Employment", description: "Verify past work references." },
      { title: "Behavioral Profiling", description: "AI-powered risk assessment." },
      { title: "Ongoing Monitoring", description: "Continuous background monitoring." },
    ]}
    howItWorks={[
      { step: "1", title: "Enter Details", description: "Submit househelp's basic information." },
      { step: "2", title: "Full Check", description: "AI runs comprehensive screening." },
      { step: "3", title: "Safety Report", description: "Get detailed background report." },
    ]}
    relatedPages={[
      { label: "Maid Verification", href: "/use-case/maid-verification" },
      { label: "Driver Verification", href: "/use-case/driver-verification" },
      { label: "Cook Verification", href: "/use-case/cook-verification" },
    ]}
  />
);

export default HousehelpBackgroundCheck;
