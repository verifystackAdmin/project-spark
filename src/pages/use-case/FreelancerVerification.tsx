import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Briefcase } from "lucide-react";

const FreelancerVerificationUseCase = () => (
  <UseCasePageLayout
    badge="Freelancer Verification"
    title="Verify"
    highlight="Freelancers & Gig Workers"
    subtitle="Screen freelancers before hiring with identity, work history, and credential verification."
    icon={Briefcase}
    features={[
      { title: "Identity Verification", description: "Confirm freelancer's real identity." },
      { title: "Portfolio Verification", description: "Verify claimed work and portfolio." },
      { title: "Skill Assessment", description: "Cross-reference claimed skills and certifications." },
      { title: "Client Reviews", description: "Aggregate reviews from multiple platforms." },
      { title: "Criminal Check", description: "Basic criminal background screening." },
      { title: "Trust Score", description: "AI-generated freelancer trust score." },
    ]}
    howItWorks={[
      { step: "1", title: "Enter Profile", description: "Submit freelancer's profile or details." },
      { step: "2", title: "Multi-Source Check", description: "AI verifies across platforms and databases." },
      { step: "3", title: "Credibility Report", description: "Get freelancer credibility report." },
    ]}
    relatedPages={[
      { label: "Online Seller Verification", href: "/use-case/online-seller-verification" },
      { label: "Identity Verification", href: "/use-case/identity-verification" },
      { label: "Employment Verification", href: "/use-case/employment-verification" },
    ]}
  />
);

export default FreelancerVerificationUseCase;
