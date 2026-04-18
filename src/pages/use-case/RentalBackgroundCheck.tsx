import UseCasePageLayout from "@/components/UseCasePageLayout";
import { FileSearch } from "lucide-react";

const RentalBackgroundCheck = () => (
  <UseCasePageLayout
    badge="Rental Background Check"
    title="Complete Rental"
    highlight="Background Check"
    subtitle="All-in-one background check package designed specifically for rental and lease situations."
    icon={FileSearch}
    features={[
      { title: "Tenant Identity", description: "Full identity verification of rental applicant." },
      { title: "Rental History", description: "Previous landlord contacts and rental records." },
      { title: "Eviction Records", description: "Search for past eviction proceedings." },
      { title: "Criminal Check", description: "Criminal background across jurisdictions." },
      { title: "Credit Assessment", description: "Financial stability and creditworthiness check." },
      { title: "Employment Confirmation", description: "Verify current employment and income." },
    ]}
    howItWorks={[
      { step: "1", title: "Apply", description: "Tenant submits application with consent." },
      { step: "2", title: "Verify", description: "AI performs comprehensive background analysis." },
      { step: "3", title: "Decide", description: "Make informed rental decisions with full report." },
    ]}
    relatedPages={[
      { label: "Tenant Verification", href: "/use-case/tenant-verification" },
      { label: "Address Verification", href: "/use-case/address-verification" },
      { label: "Identity Verification", href: "/use-case/identity-verification" },
    ]}
  />
);

export default RentalBackgroundCheck;
