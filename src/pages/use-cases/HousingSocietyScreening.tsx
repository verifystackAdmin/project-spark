import UseCasePageLayout from "@/components/UseCasePageLayout";
import usePageMeta from "@/hooks/usePageMeta";
import { Home } from "lucide-react";

const HousingSocietyScreening = () => {
  usePageMeta({ title: "Housing Society Screening – Bulk Staff & Tenant Verification", description: "Streamline background verification for housing societies: bulk staff screening, tenant pre-checks, vendor verification & society admin dashboard." });
  return (
  <UseCasePageLayout
    badge="Housing Society Security"
    title="Secure Your Community"
    highlight="At Scale"
    subtitle="Streamline background verification for domestic help, maintenance staff, tenants, and service vendors across hundreds of households in your housing society."
    icon={Home}
    ctaLabel="Partner With Us"
    ctaLink="/contact"
    features={[
      { title: "Bulk Staff Verification", description: "Screen all domestic workers, security guards, and maintenance staff across the society." },
      { title: "Tenant Pre-Screening", description: "Verify incoming tenants before they move in with identity and background checks." },
      { title: "Vendor Verification", description: "Ensure all service vendors and contractors are verified before entry." },
      { title: "Society Admin Dashboard", description: "Centralized dashboard for society management to track all verifications." },
      { title: "Digital Entry Passes", description: "Verified workers get digital entry passes linked to their verification status." },
      { title: "Monthly Reports", description: "Automated monthly security reports for society management committees." },
    ]}
    howItWorks={[
      { step: "1", title: "Onboard Society", description: "Society admin signs up and adds household and staff details." },
      { step: "2", title: "Bulk Verification", description: "All staff and vendors are verified through our AI-powered system." },
      { step: "3", title: "Ongoing Monitoring", description: "Continuous verification status tracking and alerts for the society." },
    ]}
    relatedPages={[
      { label: "Domestic Worker Verification", href: "/use-cases/domestic-worker-verification" },
      { label: "Tenant Screening", href: "/use-cases/tenant-screening" },
      { label: "Staffing Agency Verification", href: "/use-cases/staffing-agency-verification" },
      { label: "All Use Cases", href: "/use-cases" },
    ]}
  />
);

export default HousingSocietyScreening;
