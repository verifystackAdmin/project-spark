import UseCasePageLayout from "@/components/UseCasePageLayout";
import { Globe } from "lucide-react";

const SocialRiskCheck = () => (
  <UseCasePageLayout
    badge="Social Risk Check"
    title="Social Media"
    highlight="Risk Assessment"
    subtitle="AI-powered analysis of social media profiles to identify potential risks, red flags, and behavioral patterns."
    icon={Globe}
    features={[
      { title: "Profile Analysis", description: "Deep analysis of social media presence." },
      { title: "Sentiment Analysis", description: "AI evaluates tone and content patterns." },
      { title: "Red Flag Detection", description: "Identify concerning posts and behavior." },
      { title: "Network Analysis", description: "Assess social connections and associations." },
      { title: "Fake Profile Detection", description: "Identify bot or fake accounts." },
      { title: "Risk Score", description: "Get an overall social risk assessment." },
    ]}
    howItWorks={[
      { step: "1", title: "Provide Profiles", description: "Submit social media handles." },
      { step: "2", title: "AI Analysis", description: "Deep learning analyzes digital footprint." },
      { step: "3", title: "Risk Report", description: "Get comprehensive social risk report." },
    ]}
    relatedPages={[
      { label: "Dating Profile Verification", href: "/use-case/dating-profile-verification" },
      { label: "Identity Verification", href: "/use-case/identity-verification" },
      { label: "Personal Identity", href: "/solutions/personal-identity-verification" },
    ]}
  />
);

export default SocialRiskCheck;
