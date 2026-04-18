import UseCasePageLayout from "@/components/UseCasePageLayout";
import { MapPin } from "lucide-react";

const AddressVerification = () => (
  <UseCasePageLayout
    badge="Address Verification"
    title="Verify Physical"
    highlight="Address & Residency"
    subtitle="Confirm residential and business addresses with AI-powered address verification and field checks."
    icon={MapPin}
    features={[
      { title: "Address Validation", description: "Verify address exists and is accurately formatted." },
      { title: "Residency Confirmation", description: "Confirm current and past residency at given address." },
      { title: "Geo-verification", description: "Cross-reference with geolocation databases." },
      { title: "Utility Check", description: "Verify through utility records where available." },
      { title: "Field Verification", description: "Physical verification through field agents when needed." },
      { title: "Digital Footprint", description: "Cross-reference with digital address records." },
    ]}
    howItWorks={[
      { step: "1", title: "Enter Address", description: "Provide the address to verify." },
      { step: "2", title: "Multi-Source Check", description: "AI verifies across databases and records." },
      { step: "3", title: "Confirmation Report", description: "Get detailed address verification report." },
    ]}
    relatedPages={[
      { label: "Identity Verification", href: "/use-case/identity-verification" },
      { label: "Tenant Verification", href: "/use-case/tenant-verification" },
      { label: "Criminal Record Check", href: "/use-case/criminal-record-check" },
    ]}
  />
);

export default AddressVerification;
