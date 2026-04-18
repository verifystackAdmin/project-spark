import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Heart } from "lucide-react";

const RelationshipBackgroundCheck = () => (
  <UseCasePageLayout
    badge="Relationship Check"
    title="Relationship"
    highlight="Background Check"
    subtitle="Verify the person you're in a relationship with. Know before you commit with discreet, AI-powered checks."
    icon={Heart}
    features={[
      { title: "Identity Verification", description: "Confirm their real identity and documents." },
      { title: "Marital Status Check", description: "Verify marital and relationship history." },
      { title: "Criminal Background", description: "Screen for criminal records and cases." },
      { title: "Social Profile Analysis", description: "AI analysis of online presence." },
      { title: "Financial Standing", description: "Basic financial background assessment." },
      { title: "Confidential Report", description: "100% discreet and confidential results." },
    ]}
    howItWorks={[
      { step: "1", title: "Submit Info", description: "Enter basic details about the person." },
      { step: "2", title: "Discreet Check", description: "AI performs confidential background analysis." },
      { step: "3", title: "Private Report", description: "Receive secure, private report." },
    ]}
    relatedPages={[
      { label: "Dating Profile Verification", href: "/use-case/dating-profile-verification" },
      { label: "Identity Verification", href: "/use-case/identity-verification" },
      { label: "Social Risk Check", href: "/use-case/social-risk-check" },
    ]}
  />
);

export default RelationshipBackgroundCheck;
