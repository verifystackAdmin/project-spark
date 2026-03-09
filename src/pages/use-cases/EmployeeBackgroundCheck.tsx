import UseCasePageLayout from "@/components/UseCasePageLayout";
import usePageMeta from "@/hooks/usePageMeta";
import { Shield } from "lucide-react";

const EmployeeBackgroundCheck = () => {
  usePageMeta({ title: "Employee Background Check – Pre-Employment Screening", description: "Enterprise-grade employee background verification: identity, criminal records, education, employment history & reference checks at scale." });
  return (
  <UseCasePageLayout
    badge="Employee Screening"
    title="Hire With"
    highlight="Complete Confidence"
    subtitle="Enterprise-grade pre-employment background verification. Screen identity, criminal records, education, employment history, and professional references at scale."
    icon={Shield}
    ctaLabel="Start Screening"
    ctaLink="/run-check"
    features={[
      { title: "Identity Verification", description: "Multi-document identity validation including Aadhaar, PAN, passport, and driving license." },
      { title: "Criminal Record Check", description: "Comprehensive screening against national and state criminal databases and court records." },
      { title: "Education Verification", description: "Validate degrees, certifications, and academic credentials directly with institutions." },
      { title: "Employment History", description: "Verify previous employers, job titles, tenure, and reasons for leaving." },
      { title: "Professional References", description: "Structured reference checks with automated outreach and response collection." },
      { title: "Bulk Screening API", description: "REST API for high-volume screening integrated into your existing HR workflow." },
    ]}
    howItWorks={[
      { step: "1", title: "Submit Candidate Info", description: "Upload candidate details via dashboard or API with consent documentation." },
      { step: "2", title: "AI-Powered Screening", description: "Our AI cross-references multiple databases and validates all documents." },
      { step: "3", title: "Detailed Report", description: "Receive a risk-scored report with actionable insights for hiring decisions." },
    ]}
    relatedPages={[
      { label: "Staffing Agency Verification", href: "/use-cases/staffing-agency-verification" },
      { label: "Vendor & Supplier Check", href: "/use-cases/vendor-verification" },
      { label: "Tenant Screening", href: "/use-cases/tenant-screening" },
      { label: "All Use Cases", href: "/use-cases" },
    ]}
  />
  );
};

export default EmployeeBackgroundCheck;
