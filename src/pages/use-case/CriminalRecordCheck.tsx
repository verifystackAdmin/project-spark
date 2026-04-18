import UseCasePageLayout from "@/components/UseCasePageLayout";
import { AlertTriangle } from "lucide-react";

const CriminalRecordCheck = () => (
  <UseCasePageLayout
    badge="Criminal Record Check"
    title="Criminal Record"
    highlight="& Court Check"
    subtitle="Comprehensive criminal background screening across courts and police records with AI-powered analysis."
    icon={AlertTriangle}
    features={[
      { title: "Court Record Search", description: "Search district, high court, and supreme court records." },
      { title: "Police Verification", description: "Cross-reference with police database records." },
      { title: "FIR Check", description: "Search for filed FIRs and pending cases." },
      { title: "Multi-jurisdiction", description: "Search across multiple states and jurisdictions." },
      { title: "Watchlist Screening", description: "Check against national and global watchlists." },
      { title: "Continuous Monitoring", description: "Ongoing alerts for new records post-verification." },
    ]}
    howItWorks={[
      { step: "1", title: "Submit Details", description: "Provide individual's identity details with consent." },
      { step: "2", title: "Database Search", description: "AI searches court and police databases nationwide." },
      { step: "3", title: "Clear Report", description: "Receive detailed criminal background report." },
    ]}
    relatedPages={[
      { label: "Identity Verification", href: "/use-case/identity-verification" },
      { label: "Address Verification", href: "/use-case/address-verification" },
      { label: "Employment Verification", href: "/use-case/employment-verification" },
    ]}
  />
);

export default CriminalRecordCheck;
