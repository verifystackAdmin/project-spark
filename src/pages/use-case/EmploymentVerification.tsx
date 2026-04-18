import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Briefcase } from "lucide-react";

const EmploymentVerification = () => (
  <UseCasePageLayout
    badge="Employment Verification"
    title="Verify Employment"
    highlight="History & Credentials"
    subtitle="Confirm candidate work history, job titles, tenure, and performance with AI-powered employment verification."
    icon={Briefcase}
    features={[
      { title: "Work History Check", description: "Verify previous employers, job titles, and employment dates." },
      { title: "Performance Review", description: "Cross-reference performance records where available." },
      { title: "Salary Verification", description: "Confirm compensation details for lending and hiring." },
      { title: "Gap Analysis", description: "Identify unexplained employment gaps automatically." },
      { title: "Reference Check", description: "Automated outreach to listed references." },
      { title: "Real-time Results", description: "Get verified results within 24-48 hours." },
    ]}
    howItWorks={[
      { step: "1", title: "Submit Details", description: "Enter the candidate's employment details and consent." },
      { step: "2", title: "AI Verification", description: "Our AI cross-references multiple databases and contacts employers." },
      { step: "3", title: "Get Report", description: "Receive a detailed verification report with trust score." },
    ]}
    relatedPages={[
      { label: "Education Verification", href: "/use-case/education-verification" },
      { label: "Identity Verification", href: "/use-case/identity-verification" },
      { label: "Criminal Record Check", href: "/use-case/criminal-record-check" },
      { label: "Business Verification", href: "/solutions/business-background-verification" },
    ]}
  />
);

export default EmploymentVerification;
