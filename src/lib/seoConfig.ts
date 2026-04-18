import { blogPostList } from "@/data/blogPosts";

/** Canonical origin — must match index.html & sitemap */
export const SITE_ORIGIN = "https://verifystack.in";

/**
 * Default Open Graph / Twitter image (1200×630 in /public).
 * Bump the `v` query when the PNG changes so social crawlers refetch the asset.
 */
export const SITE_OG_IMAGE = `${SITE_ORIGIN}/og-image.png?v=4`;

/**
 * Bump when favicon assets change (forces browsers + Google favicon cache refresh).
 * Keep in sync: `index.html` (`?v=`), `public/site.webmanifest`, `public/_redirects` targets.
 */
export const FAVICON_VERSION = "9";

export type SeoEntry = {
  title: string;
  description: string;
  /** App/auth areas: keep out of index when possible */
  noindex?: boolean;
};

const HOME: SeoEntry = {
  title: "VerifyStack | AI-Powered Identity & Trust Infrastructure",
  description:
    "The complete AI trust infrastructure for continuous risk monitoring, background screening, and identity validation. Build secure onboarding workflows in minutes with VerifyStack.",
};

/** Blog posts: exact titles/descriptions aligned with article pages & JSON-LD */
const BLOG_SEO: Record<string, SeoEntry> = {
  "degree-mills-forged-certificates-education-verification-2026": {
    title:
      "The $21 Billion Paper Fraud: Degree Mills & Forged Certificates (2026) | VerifyStack",
    description:
      "Diploma fraud is a $21 billion global industry. Learn how to identify fake degree mills, spot AI-forged university certificates, and automate education verification using VerifyStack's AI forensics.",
  },
  "landlords-checklist-2026-handover-property-management": {
    title:
      "The Landlord's Checklist: 2026 Master Guide to Handover & Property Management | VerifyStack",
    description:
      "Master the 2026 rental landscape. From the Model Tenancy Act compliance to AI-powered tenant screening, use this ultimate landlord checklist to protect your property and ensure recurring rental peace of mind.",
  },
  "maid-digital-verification-aadhaar-not-enough-2026": {
    title:
      "Aadhaar Not Enough: Maid Digital Verification & BNS 188 (2026) | VerifyStack",
    description:
      "Handing over your house keys? Learn why a simple Aadhaar photocopy is no longer enough to secure your home in 2026. Navigate the BNS Section 188 rules and use AI to verify your domestic help in 2 minutes.",
  },
  "vendor-due-diligence-b2b-contractors-2026": {
    title: "Vendor Due Diligence: Ultimate Guide to B2B Contractor Onboarding (2026) | VerifyStack",
    description:
      "Stop B2B fraud before it hits your bottom line. Learn how to navigate the 2026 Vendor Due Diligence landscape, detect AI-generated shell companies, and ensure DPDP Act compliance with VerifyStack's AI Trust Infrastructure.",
  },
  "employee-background-verification-india-2026": {
    title: "The 2026 Guide to Employee Background Verification in India | VerifyStack",
    description:
      "Master the 2026 hiring landscape. Learn how to navigate DPDP Act compliance, detect AI-driven resume fraud with 12.4% discrepancy rates, and verify employees in minutes using the latest AI Trust Infrastructure.",
  },
};

const ROUTES: Record<string, SeoEntry> = {
  "/": HOME,
  "/how-it-works": {
    title: "How VerifyStack Works | AI Background Verification Flow",
    description:
      "See how VerifyStack turns documents and consent into Trust Scores and reports—from upload to court-ready verification in minutes.",
  },
  "/use-cases": {
    title: "Use Cases | Tenant, Employee & Workforce Verification — VerifyStack",
    description:
      "Background verification for employers, landlords, housing societies, agencies, and individuals across India. Explore use cases for VerifyStack.",
  },
  "/pricing": {
    title: "Pricing | VerifyStack Plans & Verification Credits",
    description:
      "Transparent pricing for AI-powered background verification, identity checks, and Trust Scores. Choose a plan that fits your team or household.",
  },
  "/about": {
    title: "About VerifyStack | Trust Infrastructure for India",
    description:
      "VerifyStack LLP builds AI-powered identity and background verification for businesses, families, and communities in India—DPDP-aware and security-first.",
  },
  "/about/team": {
    title: "Leadership Team | VerifyStack",
    description: "Meet the leadership team building VerifyStack’s trust infrastructure for India.",
  },
  "/careers": {
    title: "Careers | VerifyStack",
    description: "Join VerifyStack and help build safer hiring, renting, and onboarding across India.",
  },
  "/contact": {
    title: "Contact Us | VerifyStack",
    description:
      "Get in touch with VerifyStack for sales, support, or partnerships—background verification and identity trust for India.",
  },
  "/blog": {
    title: "Blog | Insights on Background Verification & Trust — VerifyStack",
    description:
      "Articles on employee screening, tenant verification, DPDP compliance, vendor risk, and AI trust infrastructure in India.",
  },
  "/demo": {
    title: "Book a Demo | VerifyStack",
    description:
      "Schedule a live demo of VerifyStack—Shield, RiskEngine, TrustScore, and enterprise verification workflows.",
  },
  "/faq": {
    title: "FAQ | Background Verification Questions — VerifyStack",
    description:
      "Answers about how VerifyStack works, turnaround times, compliance, Trust Score, and security for Indian users.",
  },
  "/help": {
    title: "Help Center | VerifyStack",
    description: "Help articles and guidance for using VerifyStack verification and your account.",
  },
  "/security": {
    title: "Security & Compliance | VerifyStack",
    description:
      "How VerifyStack protects data—encryption, access controls, and alignment with India’s DPDP Act.",
  },
  "/status": {
    title: "System Status | VerifyStack",
    description: "Uptime and service status for VerifyStack verification platforms.",
  },
  "/api-docs": {
    title: "API Documentation | VerifyStack",
    description:
      "Developer docs for VerifyStack APIs are coming soon. Contact us for early access to verification and trust integrations.",
  },
  "/sample-report": {
    title: "Sample Verification Report | VerifyStack",
    description:
      "See what a VerifyStack background verification report looks like—Trust Score, checks, and clarity.",
  },
  "/sample-report/view": {
    title: "Sample Report Preview | VerifyStack",
    description: "Interactive preview of a VerifyStack verification report layout and sections.",
  },
  "/document-verification": {
    title: "Document Verification | VerifyStack",
    description:
      "AI-powered document authenticity checks for IDs, certificates, and uploads—fast fraud detection for India.",
  },
  "/business-verification": {
    title: "Business Verification | VerifyStack",
    description:
      "Verify companies, GST, and business entities before partnerships and vendor onboarding.",
  },
  "/trust-score": {
    title: "Trust Score Explained | VerifyStack",
    description:
      "Understand the 0–100 VerifyStack Trust Score—how identity, background, and risk signals combine into one verdict.",
  },
  "/privacy": {
    title: "Privacy Policy | VerifyStack",
    description: "How VerifyStack collects, uses, and protects personal data under Indian law and DPDP.",
  },
  "/terms": {
    title: "Terms of Service | VerifyStack",
    description: "Terms governing use of VerifyStack services, accounts, and verification reports.",
  },
  "/refund": {
    title: "Refund Policy | VerifyStack",
    description: "VerifyStack refund and cancellation terms for verification purchases.",
  },
  "/cookies": {
    title: "Cookie Policy | VerifyStack",
    description: "How VerifyStack uses cookies and similar technologies on verifystack.in.",
  },
  "/newsletter": {
    title: "Newsletter | VerifyStack",
    description: "Subscribe to product updates and trust-industry insights from VerifyStack.",
  },
  "/solutions/business-background-verification": {
    title: "Corporate Risk & Trust Intelligence Platform for Businesses | VerifyStack",
    description:
      "Protect your business ecosystem. VerifyStack delivers AI-powered risk intelligence and entity screening to onboard workforce and vendors with absolute certainty.",
  },
  "/solutions/tenant-property-verification": {
    title: "Tenant & Property Verification | VerifyStack",
    description:
      "Screen tenants and property-related parties with identity, employment, and risk checks before you hand over keys.",
  },
  "/solutions/personal-identity-verification": {
    title: "Individual Identity Verification | VerifyStack",
    description:
      "Fast, AI-assisted identity verification for individuals—KYC-style checks with Indian documents and Trust Score.",
  },
  "/solutions/domestic-worker-verification": {
    title: "Domestic Workforce Verification | Maids, Drivers & Help — VerifyStack",
    description:
      "Verify domestic staff—maids, drivers, nannies, cooks—with background checks trusted by families across India.",
  },
  "/product/verifystack-shield": {
    title: "VerifyStack Shield — AI Identity & Document Verification | VerifyStack",
    description:
      "VerifyStack Shield is your first line of defence against identity fraud. Instantly authenticate government IDs, detect forged documents, and verify faces with AI-powered precision.",
  },
  "/product/verifystack-riskengine": {
    title: "VerifyStack RiskEngine — AI Background Screening & Risk Intelligence | VerifyStack",
    description:
      "VerifyStack RiskEngine is a deep background screening engine that surfaces criminal, employment, financial, and reputational risks across 200+ data sources — fast, accurate, and AI-powered.",
  },
  "/product/verifystack-trustscore": {
    title: "VerifyStack TrustScore — AI Trust Scoring for People & Entities | VerifyStack",
    description:
      "VerifyStack TrustScore aggregates identity, background, employment, and social signals into a single 0-100 AI trust score — giving you one clear verdict on anyone.",
  },
  "/use-case/identity-verification": {
    title: "AI-Powered Identity Screening & Fraud Detection | VerifyStack",
    description:
      "Secure your onboarding with multi-layer identity screening. VerifyStack uses AI to authenticate credentials and detect identity fraud, providing the first layer of human trust.",
  },
  "/use-case/employment-verification": {
    title: "Employment Verification | VerifyStack",
    description:
      "Verify employment history, references, and credentials for hiring in India with AI-assisted checks.",
  },
  "/use-case/education-verification": {
    title: "Education Verification | VerifyStack",
    description: "Validate degrees, transcripts, and institutions—spot fake certificates with VerifyStack.",
  },
  "/use-case/contractor-vendor-verification": {
    title: "Contractor & Vendor Verification | VerifyStack",
    description:
      "Onboard vendors and contractors with business registration, compliance, and risk screening.",
  },
  "/use-case/address-verification": {
    title: "Address Verification | VerifyStack",
    description: "Confirm residential and permanent addresses with document-backed verification.",
  },
  "/use-case/criminal-record-check": {
    title: "Criminal Record Check | VerifyStack",
    description:
      "Screen against court and police records for safer hiring, renting, and onboarding in India.",
  },
  "/use-case/tenant-verification": {
    title: "Tenant Verification | VerifyStack",
    description:
      "Tenant screening with identity, income, and risk signals before you rent out your property.",
  },
  "/use-case/roommate-verification": {
    title: "Roommate Verification | VerifyStack",
    description: "Verify roommates and co-tenants with identity and background checks you can trust.",
  },
  "/use-case/pg-resident-verification": {
    title: "PG Resident Verification | VerifyStack",
    description: "PG and hostel resident screening for operators and owners across India.",
  },
  "/use-case/rental-background-check": {
    title: "Rental Background Check | VerifyStack",
    description: "Rental-focused checks for landlords and property managers—fast, structured reports.",
  },
  "/use-case/maid-verification": {
    title: "Maid & Household Staff Verification | VerifyStack",
    description: "Background verification for maids and domestic help—safety-first checks for families.",
  },
  "/use-case/driver-verification": {
    title: "Driver Verification | VerifyStack",
    description: "Verify drivers for families and fleets—identity, licence, and risk screening.",
  },
  "/use-case/caregiver-verification": {
    title: "Caregiver & Nanny Verification | VerifyStack",
    description: "Caregiver background checks for child and elder care—trust before access to your home.",
  },
  "/use-case/cook-verification": {
    title: "Cook Verification | VerifyStack",
    description: "Verify cooks and kitchen staff for homes and businesses with VerifyStack.",
  },
  "/use-case/househelp-background-check": {
    title: "Househelp Background Check | VerifyStack",
    description: "Comprehensive screening for household staff across roles and risk categories.",
  },
  "/use-case/relationship-background-check": {
    title: "Relationship Background Check | VerifyStack",
    description:
      "Discreet verification options for personal relationships—identity and risk awareness.",
  },
  "/use-case/dating-profile-verification": {
    title: "Dating Profile Verification | VerifyStack",
    description: "Reduce catfishing—verify dating profiles with liveness and identity signals.",
  },
  "/use-case/online-seller-verification": {
    title: "Online Seller Verification | VerifyStack",
    description: "Verify sellers and merchants before high-value purchases or marketplace deals.",
  },
  "/use-case/social-risk-check": {
    title: "Social Risk Check | VerifyStack",
    description: "Digital footprint and social signal analysis to complement formal background checks.",
  },
  "/use-case/freelancer-verification": {
    title: "Freelancer Verification | VerifyStack",
    description:
      "Verify freelancers—identity, portfolio signals, and risk—before you award work.",
  },
  "/use-cases/tenant-screening": {
    title: "Tenant Screening | VerifyStack",
    description: "End-to-end tenant screening for landlords—identity, employment, and rental history.",
  },
  "/use-cases/employee-background-check": {
    title: "Employee Background Check | VerifyStack",
    description: "Pre-employment screening for Indian employers—scalable, DPDP-aware workflows.",
  },
  "/use-cases/freelancer-verification": {
    title: "Freelancer Verification (Legacy) | VerifyStack",
    description: "Verify freelancers and gig workers before contracts and payouts.",
  },
  "/use-cases/housing-society-screening": {
    title: "Housing Society Screening | VerifyStack",
    description: "Bulk verification for staff, vendors, and residents across housing societies.",
  },
  "/use-cases/staffing-agency-verification": {
    title: "Staffing Agency Verification | VerifyStack",
    description: "Pre-verify agency workers and contractors for clients at scale.",
  },
  "/use-cases/vendor-verification": {
    title: "Vendor Verification | VerifyStack",
    description: "KYB-style vendor and supplier verification before procurement and contracts.",
  },
};

function normalizePathname(pathname: string): string {
  const raw = pathname.split("?")[0] || "/";
  if (raw !== "/" && raw.endsWith("/")) {
    return raw.slice(0, -1) || "/";
  }
  return raw;
}

function authAreaSeo(path: string): SeoEntry | null {
  const map: Record<string, SeoEntry> = {
    "/login": {
      title: "Sign In | VerifyStack",
      description: "Sign in to your VerifyStack account to run verifications and view reports.",
      noindex: true,
    },
    "/signup": {
      title: "Create Account | VerifyStack",
      description: "Create a VerifyStack account to start background verification and identity checks.",
      noindex: true,
    },
    "/forgot-password": {
      title: "Forgot Password | VerifyStack",
      description: "Reset your VerifyStack account password securely.",
      noindex: true,
    },
    "/reset-password": {
      title: "Reset Password | VerifyStack",
      description: "Set a new password for your VerifyStack account.",
      noindex: true,
    },
    "/upload-documents": {
      title: "Upload Documents | VerifyStack",
      description: "Upload documents for your verification session.",
      noindex: true,
    },
    "/run-check": {
      title: "Run Check | VerifyStack",
      description: "Complete your VerifyStack verification flow.",
      noindex: true,
    },
    "/report": {
      title: "Verification Report | VerifyStack",
      description: "View your VerifyStack verification report.",
      noindex: true,
    },
  };
  return map[path] ?? null;
}

/** Resolve title & meta description for the current pathname */
export function resolveSeo(pathname: string): SeoEntry {
  const path = normalizePathname(pathname);

  if (path.startsWith("/dashboard")) {
    if (path === "/dashboard/reports") {
      return {
        title: "Verification Reports | VerifyStack",
        description:
          "View and manage your background verification reports. Search by subject or report ID, filter by status, sort by date, and download completed reports.",
        noindex: true,
      };
    }
    if (path === "/dashboard/profile") {
      return {
        title: "Profile | VerifyStack",
        description:
          "Manage your VerifyStack profile—name, organization, and read-only account details from the API gateway.",
        noindex: true,
      };
    }
    if (path === "/dashboard/settings") {
      return {
        title: "Settings | VerifyStack",
        description:
          "Security, preferences, notifications, active sessions, and account options for your VerifyStack dashboard.",
        noindex: true,
      };
    }
    return {
      title: "Dashboard | VerifyStack",
      description: "Your VerifyStack dashboard—reports, usage, and account settings.",
      noindex: true,
    };
  }

  const auth = authAreaSeo(path);
  if (auth) return auth;

  const blogMatch = /^\/blog\/([^/]+)$/.exec(path);
  if (blogMatch) {
    const slug = blogMatch[1];
    const override = BLOG_SEO[slug];
    if (override) return override;
    const listed = blogPostList.find((b) => b.slug === slug);
    if (listed) {
      return {
        title: `${listed.title} | VerifyStack`,
        description: listed.excerpt,
      };
    }
    return {
      title: "Blog | VerifyStack",
      description: HOME.description,
    };
  }

  if (ROUTES[path]) return ROUTES[path];

  return {
    title: "Page Not Found | VerifyStack",
    description:
      "The page you requested could not be found. Explore VerifyStack for background verification and identity trust in India.",
    noindex: true,
  };
}

export function canonicalUrl(pathname: string): string {
  const path = normalizePathname(pathname);
  if (path === "/") return SITE_ORIGIN;
  return `${SITE_ORIGIN}${path}`;
}
