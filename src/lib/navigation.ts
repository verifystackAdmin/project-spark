import {
  Building,
  Home,
  Users,
  Heart,
  Shield,
  ShieldCheck,
  Cpu,
  BarChart3,
  Briefcase,
  GraduationCap,
  Wrench,
  MapPin,
  AlertTriangle,
  Fingerprint,
  DoorOpen,
  UserCheck,
  BedDouble,
  FileSearch,
  Car,
  Baby,
  ChefHat,
  HandHelping,
  ShoppingCart,
  Smile,
  Globe,
  BookOpen,
  HelpCircle,
  FileCode2,
  Lock,
  Info,
  LucideIcon,
} from "lucide-react";

export interface UseCase {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface ProductCategory {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  image?: string;
}

export interface SolutionGroup {
  title: string;
  href: string;
  icon: LucideIcon;
  useCases: UseCase[];
}

// ─── 3 Branded Products → "Products" dropdown ─────────────────────────────
export const productCategories: ProductCategory[] = [
  {
    title: "VerifyStack Shield",
    description: "AI-powered identity & document verification. Your first line of defence against fraud.",
    href: "/product/verifystack-shield",
    icon: ShieldCheck,
  },
  {
    title: "VerifyStack RiskEngine",
    description: "Deep background screening engine that surfaces criminal, employment, and financial risks.",
    href: "/product/verifystack-riskengine",
    icon: Cpu,
  },
  {
    title: "VerifyStack TrustScore",
    description: "A single 0–100 AI trust score that aggregates every signal into one clear verdict.",
    href: "/product/verifystack-trustscore",
    icon: BarChart3,
  },
];

// ─── 4 Solution Categories → "Solutions" dropdown ─────────────────────────
export const solutionLinks: ProductCategory[] = [
  {
    title: "Business Background Verification",
    description: "Employee, vendor and contractor screening for organisations of every size.",
    href: "/solutions/business-background-verification",
    icon: Building,
    image: "https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Tenant & Property Verification",
    description: "Screen tenant, roommate and PG resident before handing over the keys.",
    href: "/solutions/tenant-property-verification",
    icon: Home,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Domestic Workforce Verification",
    description: "Verify maid, driver, cook, and caregiver with confidence.",
    href: "/solutions/domestic-worker-verification",
    icon: HandHelping,
    image: "https://images.pexels.com/photos/9394443/pexels-photo-9394443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Individual Identity Verification",
    description: "Know who you're trusting — for relationships, freelancers and online interactions.",
    href: "/solutions/personal-identity-verification",
    icon: Heart,
    image: "https://images.pexels.com/photos/7841797/pexels-photo-7841797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

// ─── Use Cases grouped by intent → "Use Cases" mega menu ──────────────────
export const solutionGroups: SolutionGroup[] = [
  {
    title: "Corporate & Business",
    href: "/solutions/business-background-verification",
    icon: Building,
    useCases: [
      { label: "Employee Verification",           href: "/use-case/employment-verification",          icon: Briefcase },
      { label: "Employment Verification",          href: "/use-case/employment-verification",          icon: UserCheck },
      { label: "Education Verification",           href: "/use-case/education-verification",           icon: GraduationCap },
      { label: "Contractor & Vendor Verification", href: "/use-case/contractor-vendor-verification",   icon: Wrench },
      { label: "Address Verification",             href: "/use-case/address-verification",             icon: MapPin },
      { label: "Criminal Record Check",            href: "/use-case/criminal-record-check",            icon: AlertTriangle },
      { label: "Identity Verification",            href: "/use-case/identity-verification",            icon: Fingerprint },
    ],
  },
  {
    title: "Real Estate & Rentals",
    href: "/solutions/tenant-property-verification",
    icon: Home,
    useCases: [
      { label: "Tenant Verification",      href: "/use-case/tenant-verification",      icon: DoorOpen },
      { label: "Roommate Verification",    href: "/use-case/roommate-verification",    icon: Users },
      { label: "PG Resident Verification", href: "/use-case/pg-resident-verification", icon: BedDouble },
      { label: "Rental Background Check",  href: "/use-case/rental-background-check",  icon: FileSearch },
    ],
  },
  {
    title: "Domestic Workforce",
    href: "/solutions/domestic-worker-verification",
    icon: HandHelping,
    useCases: [
      { label: "Maid Verification",      href: "/use-case/maid-verification",      icon: Home },
      { label: "Driver Verification",    href: "/use-case/driver-verification",    icon: Car },
      { label: "Caregiver Verification", href: "/use-case/caregiver-verification", icon: Baby },
      { label: "Cook Verification",      href: "/use-case/cook-verification",      icon: ChefHat },
    ],
  },
  {
    title: "Personal & Digital Trust",
    href: "/solutions/personal-identity-verification",
    icon: Shield,
    useCases: [
      { label: "Relationship Background Check", href: "/use-case/relationship-background-check", icon: Heart },
      { label: "Dating Profile Verification",   href: "/use-case/dating-profile-verification",   icon: Smile },
      { label: "Freelancer Verification",       href: "/use-case/freelancer-verification",        icon: Briefcase },
      { label: "Online Seller Verification",    href: "/use-case/online-seller-verification",     icon: ShoppingCart },
      { label: "Social Risk Check",             href: "/use-case/social-risk-check",              icon: Globe },
    ],
  },
];

// ─── Resources dropdown ────────────────────────────────────────────────────
export const resourceLinks = [
  { label: "Blog",                  href: "/blog",      icon: BookOpen },
  { label: "Help Center",           href: "/help",      icon: HelpCircle },
  { label: "API Documentation",     href: "/api-docs",  icon: FileCode2 },
  { label: "Security & Compliance", href: "/security",  icon: Lock },
];

// ─── About Us dropdown ─────────────────────────────────────────────────────
export const aboutLinks = [
  { label: "Company Overview", href: "/about",    icon: Info },
  { label: "Careers",          href: "/careers",  icon: Briefcase },
];
