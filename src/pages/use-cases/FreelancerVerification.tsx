import UseCasePageLayout from "@/components/UseCasePageLayout";
import usePageMeta from "@/hooks/usePageMeta";
import { Briefcase } from "lucide-react";

const FreelancerVerification = () => {
  usePageMeta({ title: "Freelancer Verification – Verify Before You Hire", description: "Verify freelancers and contractors: identity confirmation, portfolio authenticity, professional background checks & client references with AI." });
  return (
  <UseCasePageLayout
    badge="Freelancer Verification"
    title="Verify Freelancers"
    highlight="Before You Hire"
    subtitle="Confirm identity, portfolio authenticity, and professional background of freelancers and independent contractors before engaging them for projects."
    icon={Briefcase}
    ctaLabel="Verify a Freelancer"
    ctaLink="/run-check"
    features={[
      { title: "Identity Confirmation", description: "Verify the freelancer's real identity against government-issued documents." },
      { title: "Portfolio Authenticity", description: "AI analysis of work samples to detect plagiarism or misrepresentation." },
      { title: "Professional Background", description: "Check LinkedIn, professional registrations, and certifications." },
      { title: "Client References", description: "Automated reference checks from previous clients and platforms." },
      { title: "Social Presence Analysis", description: "Cross-reference social media profiles for consistency and credibility." },
      { title: "Trust Badge", description: "Verified freelancers receive a digital trust badge to boost their credibility." },
    ]}
    howItWorks={[
      { step: "1", title: "Enter Freelancer Details", description: "Submit name, portfolio links, and government ID with consent." },
      { step: "2", title: "AI Verification", description: "Our AI validates identity, scans portfolios, and checks references." },
      { step: "3", title: "Review Results", description: "Get a trust score and detailed report on the freelancer's credibility." },
    ]}
    relatedPages={[
      { label: "Employee Background Check", href: "/use-cases/employee-background-check" },
      { label: "Domestic Worker Verification", href: "/use-cases/domestic-worker-verification" },
      { label: "Vendor Verification", href: "/use-cases/vendor-verification" },
      { label: "All Use Cases", href: "/use-cases" },
    ]}
  />
);

export default FreelancerVerification;
