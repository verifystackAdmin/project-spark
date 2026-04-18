export type BlogPostListItem = {
  /** Present when a detail page exists at /blog/:slug */
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
};

export const blogPostList: BlogPostListItem[] = [
  {
    slug: "degree-mills-forged-certificates-education-verification-2026",
    title:
      "The $21 Billion Paper Fraud: Detecting Degree Mills and Forged Certificates in 2026",
    excerpt:
      "Diploma fraud is a $21 billion global industry. Learn how to identify fake degree mills, spot AI-forged university certificates, and automate education verification using VerifyStack's AI forensics.",
    date: "April 2, 2026",
    category: "Compliance & HR",
    readTime: "13 min read",
  },
  {
    slug: "landlords-checklist-2026-handover-property-management",
    title:
      "The Landlord's Checklist: A 2026 Master Guide to Handover, Property Management",
    excerpt:
      "Master the 2026 rental landscape. From the Model Tenancy Act compliance to AI-powered tenant screening, use this ultimate landlord checklist to protect your property and ensure recurring rental peace of mind.",
    date: "April 1, 2026",
    category: "Real Estate & Rentals",
    readTime: "12 min read",
  },
  {
    slug: "maid-digital-verification-aadhaar-not-enough-2026",
    title:
      "Aadhaar Card is Not Enough! 5 Reasons Your Maid Needs a Digital Verification in 2026",
    excerpt:
      "Handing over your house keys? Learn why a simple Aadhaar photocopy is no longer enough to secure your home in 2026. Navigate the BNS Section 188 rules and use AI to verify your domestic help in 2 minutes.",
    date: "March 27, 2026",
    category: "Domestic Workforce",
    readTime: "11 min read",
  },
  {
    slug: "vendor-due-diligence-b2b-contractors-2026",
    title:
      "Vendor Due Diligence: The Ultimate Guide to Safely Onboarding B2B Contractors (2026)",
    excerpt:
      "Stop B2B fraud before it hits your bottom line. Navigate 2026 vendor due diligence, detect AI-generated shell companies, and align with DPDP using VerifyStack's AI Trust Infrastructure.",
    date: "March 26, 2026",
    category: "B2B & Vendor Risk",
    readTime: "13 min read",
  },
  {
    slug: "employee-background-verification-india-2026",
    title:
      "The 2026 Guide to Employee Background Verification in India: Navigating AI-Fraud & DPDP Compliance",
    excerpt:
      "Master the 2026 hiring landscape. Learn how to navigate DPDP Act compliance, detect AI-driven resume fraud with 12.4% discrepancy rates, and verify employees in minutes using the latest AI Trust Infrastructure.",
    date: "March 25, 2026",
    category: "Compliance & HR",
    readTime: "14 min read",
  },
  {
    title: "5 Red Flags to Watch for When Dating Online",
    excerpt:
      "Online dating has made it easier than ever to meet new people — but it's also made it easier for dishonest individuals to hide their true identity. Here are the top red flags you should never ignore.",
    date: "January 10, 2026",
    category: "Safety Tips",
    readTime: "4 min read",
  },
  {
    title: "Why Background Verification Is the New Normal in Relationships",
    excerpt:
      "Trust is the foundation of every relationship. With AI-powered verification, you can now confirm someone's identity, employment, and social history before making life-changing decisions.",
    date: "January 22, 2026",
    category: "Insights",
    readTime: "5 min read",
  },
];
