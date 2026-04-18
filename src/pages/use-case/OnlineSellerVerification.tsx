import UseCasePageLayout from "@/components/UseCasePageLayout";
import { ShoppingCart } from "lucide-react";

const OnlineSellerVerification = () => (
  <UseCasePageLayout
    badge="Seller Verification"
    title="Verify"
    highlight="Online Sellers"
    subtitle="Check the credibility of online sellers before making high-value purchases. Protect yourself from scams."
    icon={ShoppingCart}
    features={[
      { title: "Business Registration", description: "Verify GST and business registration." },
      { title: "Identity Check", description: "Confirm seller's real identity." },
      { title: "Review Analysis", description: "AI analysis of seller reviews and ratings." },
      { title: "Fraud Detection", description: "Check for scam reports and complaints." },
      { title: "Address Verification", description: "Verify seller's business address." },
      { title: "Trust Score", description: "Get an AI-generated seller trust score." },
    ]}
    howItWorks={[
      { step: "1", title: "Enter Seller Info", description: "Provide seller's profile or business details." },
      { step: "2", title: "AI Check", description: "Cross-reference multiple fraud databases." },
      { step: "3", title: "Trust Report", description: "Get seller credibility report." },
    ]}
    relatedPages={[
      { label: "Freelancer Verification", href: "/use-case/freelancer-verification" },
      { label: "Identity Verification", href: "/use-case/identity-verification" },
      { label: "Social Risk Check", href: "/use-case/social-risk-check" },
    ]}
  />
);

export default OnlineSellerVerification;
