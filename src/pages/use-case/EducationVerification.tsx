import UseCasePageLayout from "@/components/UseCasePageLayout";
import { GraduationCap } from "lucide-react";

const EducationVerification = () => (
  <UseCasePageLayout
    badge="Education Verification"
    title="Verify Academic"
    highlight="Credentials & Degrees"
    subtitle="Authenticate degrees, diplomas, certifications, and academic records with AI-powered verification."
    icon={GraduationCap}
    features={[
      { title: "Degree Verification", description: "Confirm degree authenticity with universities directly." },
      { title: "Transcript Check", description: "Verify academic transcripts and grade records." },
      { title: "Certification Validation", description: "Check professional certifications and licenses." },
      { title: "Institution Verification", description: "Confirm the institution is accredited and legitimate." },
      { title: "International Degrees", description: "Verify foreign educational credentials." },
      { title: "Fake Degree Detection", description: "AI-powered detection of fraudulent certificates." },
    ]}
    howItWorks={[
      { step: "1", title: "Upload Documents", description: "Submit degree certificates or candidate details." },
      { step: "2", title: "AI Analysis", description: "Our system verifies with issuing institutions." },
      { step: "3", title: "Verified Report", description: "Get authenticated results with confidence score." },
    ]}
    relatedPages={[
      { label: "Employment Verification", href: "/use-case/employment-verification" },
      { label: "Identity Verification", href: "/use-case/identity-verification" },
      { label: "Business Verification", href: "/solutions/business-background-verification" },
    ]}
  />
);

export default EducationVerification;
