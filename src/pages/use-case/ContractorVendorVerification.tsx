import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Wrench } from "lucide-react";

const ContractorVendorVerification = () => (
  <UseCasePageLayout
    badge="Contractor & Vendor"
    title="Verify Contractors"
    highlight="& Vendors"
    subtitle="Ensure your third-party partners are trustworthy with comprehensive contractor and vendor background checks."
    icon={Wrench}
    features={[
      { title: "Business Registration", description: "Verify company registration and legal status." },
      { title: "Financial Health", description: "Check financial stability and credit history." },
      { title: "Compliance Check", description: "Ensure regulatory compliance and certifications." },
      { title: "Past Performance", description: "Review track record with previous clients." },
      { title: "Key Personnel", description: "Background check key individuals in the organization." },
      { title: "Insurance Verification", description: "Confirm adequate insurance coverage." },
    ]}
    howItWorks={[
      { step: "1", title: "Submit Details", description: "Enter contractor or vendor company information." },
      { step: "2", title: "Deep Analysis", description: "AI checks multiple databases and public records." },
      { step: "3", title: "Risk Report", description: "Receive comprehensive risk assessment report." },
    ]}
    relatedPages={[
      { label: "Employment Verification", href: "/use-case/employment-verification" },
      { label: "Business Verification", href: "/solutions/business-background-verification" },
      { label: "Identity Verification", href: "/use-case/identity-verification" },
    ]}
  />
);

export default ContractorVendorVerification;
