import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Home } from "lucide-react";

const MaidVerification = () => (
  <UseCasePageLayout
    badge="Maid Verification"
    title="Verify Your"
    highlight="Maid & Housekeeper"
    subtitle="Comprehensive background checks for maids and housekeepers before you welcome them into your home."
    icon={Home}
    features={[
      { title: "Identity Check", description: "Verify Aadhaar, PAN, and other ID documents." },
      { title: "Criminal Record", description: "Search police and court databases." },
      { title: "Address Verification", description: "Confirm current and permanent address." },
      { title: "Work History", description: "Verify previous employer references." },
      { title: "Behavioral Assessment", description: "AI-powered risk profiling." },
      { title: "Quick Results", description: "Get reports within 24 hours." },
    ]}
    howItWorks={[
      { step: "1", title: "Submit Details", description: "Enter maid's basic details and ID." },
      { step: "2", title: "AI Check", description: "Comprehensive background verification." },
      { step: "3", title: "Trust Report", description: "Receive detailed safety report." },
    ]}
    relatedPages={[
      { label: "Driver Verification", href: "/use-case/driver-verification" },
      { label: "Caregiver Verification", href: "/use-case/caregiver-verification" },
      { label: "Domestic Worker", href: "/solutions/domestic-worker-verification" },
    ]}
  />
);

export default MaidVerification;
