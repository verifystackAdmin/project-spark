import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Car } from "lucide-react";

const DriverVerification = () => (
  <UseCasePageLayout
    badge="Driver Verification"
    title="Verify Your"
    highlight="Personal Driver"
    subtitle="Screen personal and commercial drivers with license, criminal, and identity verification."
    icon={Car}
    features={[
      { title: "License Verification", description: "Verify driving license authenticity and validity." },
      { title: "Criminal Check", description: "Screen for criminal history and traffic violations." },
      { title: "Identity Verification", description: "Multi-document identity confirmation." },
      { title: "Drug Screening", description: "Integration with drug test partners where applicable." },
      { title: "Driving Record", description: "Check for accidents and traffic violations." },
      { title: "Address Check", description: "Verify residential address." },
    ]}
    howItWorks={[
      { step: "1", title: "Enter Info", description: "Submit driver's license and identity details." },
      { step: "2", title: "Verification", description: "AI verifies across multiple databases." },
      { step: "3", title: "Safety Report", description: "Get detailed driver verification report." },
    ]}
    relatedPages={[
      { label: "Maid Verification", href: "/use-case/maid-verification" },
      { label: "Caregiver Verification", href: "/use-case/caregiver-verification" },
      { label: "Criminal Record Check", href: "/use-case/criminal-record-check" },
    ]}
  />
);

export default DriverVerification;
