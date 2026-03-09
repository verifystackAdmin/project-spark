import UseCasePageLayout from "@/components/UseCasePageLayout";
import usePageMeta from "@/hooks/usePageMeta";
import { Truck } from "lucide-react";

const VendorVerification = () => {
  usePageMeta({ title: "Vendor Verification – Business Partner Due Diligence", description: "Verify vendors and suppliers: company registration, director screening, financial health, legal compliance & AI-powered reputation analysis." });
  return (
  <UseCasePageLayout
    badge="Vendor & Supplier Check"
    title="Verify Business Partners"
    highlight="Before You Sign"
    subtitle="Screen vendors, suppliers, and business partners before signing contracts. Company registration, compliance status, and reputation checks powered by AI."
    icon={Truck}
    ctaLabel="Verify a Vendor"
    ctaLink="/run-check"
    features={[
      { title: "Company Registration Check", description: "Validate GST, CIN, and business registration against MCA and government databases." },
      { title: "Director & Owner Screening", description: "Background check directors and key management personnel." },
      { title: "Financial Health Check", description: "Review company financial filings and credit standing." },
      { title: "Legal & Compliance", description: "Screen for pending litigations, regulatory actions, and compliance violations." },
      { title: "Reputation Analysis", description: "AI-powered analysis of online reviews, ratings, and market reputation." },
      { title: "Comprehensive Report", description: "Detailed vendor risk assessment report with actionable recommendations." },
    ]}
    howItWorks={[
      { step: "1", title: "Submit Company Details", description: "Enter the vendor's company name, GST number, or registration details." },
      { step: "2", title: "AI Due Diligence", description: "Our AI scans government registries, court records, and financial databases." },
      { step: "3", title: "Risk Assessment", description: "Receive a comprehensive vendor risk score and detailed due diligence report." },
    ]}
    relatedPages={[
      { label: "Employee Background Check", href: "/use-cases/employee-background-check" },
      { label: "Staffing Agency Verification", href: "/use-cases/staffing-agency-verification" },
      { label: "Freelancer Verification", href: "/use-cases/freelancer-verification" },
      { label: "All Use Cases", href: "/use-cases" },
    ]}
  />
);

export default VendorVerification;
