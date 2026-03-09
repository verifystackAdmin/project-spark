import UseCasePageLayout from "@/components/UseCasePageLayout";
import usePageMeta from "@/hooks/usePageMeta";
import { Users } from "lucide-react";

const StaffingAgencyVerification = () => {
  usePageMeta({ title: "Staffing Agency Verification – Pre-Verify Your Workforce", description: "Bulk candidate screening for staffing agencies: criminal checks, ID verification, trust badges, white-label reports & API integration." });
  return (
  <UseCasePageLayout
    badge="Staffing Agency"
    title="Verify Your Workforce"
    highlight="At the Source"
    subtitle="Pre-verify your entire candidate pool—security guards, housekeeping, delivery partners, and more. Give every worker a verified trust badge before deployment."
    icon={Users}
    ctaLabel="Partner With Us"
    ctaLink="/contact"
    features={[
      { title: "Bulk Candidate Screening", description: "Upload candidate lists and verify hundreds of workers simultaneously via dashboard or API." },
      { title: "Trust Badges", description: "Every verified worker receives a digital trust badge that clients can independently validate." },
      { title: "Criminal & ID Checks", description: "Comprehensive criminal record screening and multi-document identity verification." },
      { title: "White-Label Reports", description: "Generate verification reports branded with your agency's logo and identity." },
      { title: "API Integration", description: "REST API to integrate verification directly into your staffing management software." },
      { title: "Compliance Ready", description: "Reports meet GDPR and India DPDP compliance standards for regulated industries." },
    ]}
    howItWorks={[
      { step: "1", title: "Upload Workforce Data", description: "Submit candidate details in bulk via CSV upload or API." },
      { step: "2", title: "Automated Verification", description: "AI screens all candidates against criminal, identity, and employment databases." },
      { step: "3", title: "Deploy With Confidence", description: "Share verified reports with clients and issue trust badges to workers." },
    ]}
    relatedPages={[
      { label: "Employee Background Check", href: "/use-cases/employee-background-check" },
      { label: "Housing Society Screening", href: "/use-cases/housing-society-screening" },
      { label: "Vendor Verification", href: "/use-cases/vendor-verification" },
      { label: "All Use Cases", href: "/use-cases" },
    ]}
  />
  );
};

export default StaffingAgencyVerification;
