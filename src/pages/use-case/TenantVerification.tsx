import UseCasePageLayout from "@/components/UseCasePageLayout";
import { DoorOpen } from "lucide-react";

const TenantVerification = () => (
  <UseCasePageLayout
    badge="Tenant Verification"
    title="Comprehensive"
    highlight="Tenant Screening"
    subtitle="Screen prospective tenants with identity, criminal, rental history, and address verification."
    icon={DoorOpen}
    features={[
      { title: "Identity Check", description: "Verify tenant identity through multiple documents." },
      { title: "Rental History", description: "Check previous rental records and landlord references." },
      { title: "Criminal Background", description: "Search court and police records nationwide." },
      { title: "Income Verification", description: "Confirm income and employment for rent capacity." },
      { title: "Address History", description: "Verify previous addresses and residency patterns." },
      { title: "Credit Check", description: "Assess financial responsibility and credit behavior." },
    ]}
    howItWorks={[
      { step: "1", title: "Enter Details", description: "Submit tenant's basic information with consent." },
      { step: "2", title: "AI Screening", description: "Comprehensive multi-source background check." },
      { step: "3", title: "Screening Report", description: "Get detailed tenant screening report." },
    ]}
    relatedPages={[
      { label: "Roommate Verification", href: "/use-case/roommate-verification" },
      { label: "Rental Background Check", href: "/use-case/rental-background-check" },
      { label: "Tenant & Property", href: "/solutions/tenant-property-verification" },
    ]}
  />
);

export default TenantVerification;
