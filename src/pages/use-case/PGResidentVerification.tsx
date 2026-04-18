import UseCasePageLayout from "@/components/UseCasePageLayout";
import { BedDouble } from "lucide-react";

const PGResidentVerification = () => (
  <UseCasePageLayout
    badge="PG Verification"
    title="PG Resident"
    highlight="Background Check"
    subtitle="Screen paying guest applicants with identity, criminal, and behavioral checks for safe PG accommodations."
    icon={BedDouble}
    features={[
      { title: "Identity Check", description: "Verify PG applicant identity and documents." },
      { title: "Criminal Screening", description: "Check for criminal records and court cases." },
      { title: "Employment/Student Check", description: "Confirm occupation or student enrollment." },
      { title: "Address History", description: "Verify previous living addresses." },
      { title: "Reference Check", description: "Contact provided references." },
      { title: "Quick Turnaround", description: "Get results within hours, not days." },
    ]}
    howItWorks={[
      { step: "1", title: "Submit Info", description: "Enter PG applicant's details." },
      { step: "2", title: "Rapid Screening", description: "AI verifies identity and background." },
      { step: "3", title: "Instant Report", description: "Receive verification report quickly." },
    ]}
    relatedPages={[
      { label: "Tenant Verification", href: "/use-case/tenant-verification" },
      { label: "Roommate Verification", href: "/use-case/roommate-verification" },
      { label: "Rental Background Check", href: "/use-case/rental-background-check" },
    ]}
  />
);

export default PGResidentVerification;
