import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Users } from "lucide-react";

const DomesticWorkerVerification = () => (
  <UseCasePageLayout
    badge="Domestic Help Verification"
    title="Verify Household Staff"
    highlight="With Confidence"
    subtitle="Background check maids, drivers, nannies, cooks, and other domestic workers before welcoming them into your home. AI-powered identity and criminal record verification."
    icon={Users}
    ctaLabel="Verify a Worker"
    ctaLink="/run-check"
    features={[
      { title: "Government ID Verification", description: "Aadhaar, voter ID, and PAN card validation against government databases." },
      { title: "Criminal Record Screening", description: "Check police records and court databases for any criminal history." },
      { title: "Address Verification", description: "Confirm the worker's residential address through physical and digital verification." },
      { title: "Previous Employment Check", description: "Verify references and work history from previous employers." },
      { title: "Face Match Technology", description: "AI-powered facial recognition to match the person with their ID documents." },
      { title: "Instant Trust Badge", description: "Verified workers receive a shareable digital trust badge for future employers." },
    ]}
    howItWorks={[
      { step: "1", title: "Upload ID & Details", description: "Submit the worker's government ID and basic information with consent." },
      { step: "2", title: "AI Background Check", description: "Our AI scans criminal records, verifies identity, and checks references." },
      { step: "3", title: "Receive Verification", description: "Get a comprehensive report with trust score and risk assessment." },
    ]}
    relatedPages={[
      { label: "Tenant Screening", href: "/use-cases/tenant-screening" },
      { label: "Housing Society Screening", href: "/use-cases/housing-society-screening" },
      { label: "Freelancer Verification", href: "/use-cases/freelancer-verification" },
      { label: "All Use Cases", href: "/use-cases" },
    ]}
  />
);

export default DomesticWorkerVerification;
