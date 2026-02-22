import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Building } from "lucide-react";

const TenantScreening = () => (
  <UseCasePageLayout
    badge="Tenant Verification"
    title="Screen Tenants"
    highlight="Before You Hand Over Keys"
    subtitle="Verify identity, employment, rental history, and criminal records of prospective tenants. AI-powered risk scoring helps landlords and property managers make informed decisions."
    icon={Building}
    ctaLabel="Screen a Tenant"
    ctaLink="/run-check"
    features={[
      { title: "Identity Verification", description: "Aadhaar, PAN, and government ID cross-validation to confirm the tenant's real identity." },
      { title: "Employment & Income Check", description: "Verify employment status and income to ensure the tenant can meet rental obligations." },
      { title: "Rental History", description: "Check previous landlord references and tenancy records for any disputes or defaults." },
      { title: "Criminal Record Check", description: "Screen against criminal databases and court records for safety assurance." },
      { title: "AI Risk Score", description: "Get an instant trust score combining all verification signals into a single actionable metric." },
      { title: "Digital Report", description: "Receive a comprehensive, shareable PDF report within minutes." },
    ]}
    howItWorks={[
      { step: "1", title: "Submit Details", description: "Enter the tenant's name, ID, and consent form." },
      { step: "2", title: "AI Verification", description: "Our AI cross-references government databases, court records, and employment data." },
      { step: "3", title: "Get Report", description: "Receive a detailed trust score and verification report in minutes." },
    ]}
    relatedPages={[
      { label: "Domestic Worker Verification", href: "/use-cases/domestic-worker-verification" },
      { label: "Employee Background Check", href: "/use-cases/employee-background-check" },
      { label: "Housing Society Screening", href: "/use-cases/housing-society-screening" },
      { label: "All Use Cases", href: "/use-cases" },
    ]}
  />
);

export default TenantScreening;
