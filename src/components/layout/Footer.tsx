import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ChevronRight,
  Shield,
  Lock,
} from "lucide-react";

const Footer = () => {
  const products = [
    { label: "VerifyStack Shield",     href: "/product/verifystack-shield" },
    { label: "VerifyStack RiskEngine", href: "/product/verifystack-riskengine" },
    { label: "VerifyStack TrustScore", href: "/product/verifystack-trustscore" },
  ];

  const solutions = [
    { label: "Business Background Verification", href: "/solutions/business-background-verification" },
    { label: "Tenant & Property Verification",   href: "/solutions/tenant-property-verification" },
    { label: "Domestic Workforce Verification",  href: "/solutions/domestic-worker-verification" },
    { label: "Individual Identity Verification", href: "/solutions/personal-identity-verification" },
  ];

  const resources = [
    { label: "Blog",                  href: "/blog" },
    { label: "Help Center",           href: "/help" },
    { label: "API Documentation",     href: "/api-docs" },
    { label: "Security & Compliance", href: "/security" },
  ];

  const aboutUs = [
    { label: "Company Overview", href: "/about" },
    { label: "Careers",          href: "/careers" },
  ];

  const legal = [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  const socialLinks = [
    { icon: Twitter,   href: "https://twitter.com/VerifyStack",              label: "Twitter" },
    { icon: Linkedin,  href: "https://www.linkedin.com/company/verifystack", label: "LinkedIn" },
    { icon: Facebook,  href: "https://www.facebook.com/VerifyStack",         label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/VerifyStack",        label: "Instagram" },
  ];

  const badges = [
    { label: "GDPR Ready" },
    { label: "India DPDP" },
    { label: "AES-256" },
    { label: "SOC 2" },
  ];

  const FooterLinkList = ({
    title,
    links,
  }: {
    title: string;
    links: { label: string; href: string }[];
  }) => (
    <div>
      <h4 className="text-sm font-semibold text-foreground mb-4 tracking-tight">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="group flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              <ChevronRight className="w-3 h-3 flex-shrink-0 text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="border-t border-border/50 bg-card/20">
      <div className="container mx-auto max-w-7xl px-4">

        {/* ── Single main row: brand + all link columns ──────────────────── */}
        <div className="py-12 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-x-8 gap-y-10">

            {/* Brand — spans 2 cols on lg */}
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="inline-flex mb-4">
                <img
                  src="/verifystack-logo.svg"
                  alt="VerifyStack"
                  className="h-10 w-auto object-contain max-w-[180px]"
                />
              </Link>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-3 max-w-[220px]">
                AI-powered background verification for businesses, landlords and individuals across India.
              </p>
              <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest mb-4">
                Trust Infrastructure for India
              </p>
              <div className="flex items-start gap-2 text-xs text-muted-foreground mb-4">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary/60" />
                <span>VerifyStack LLP, Pune, Maharashtra</span>
              </div>
              <div className="flex items-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg bg-secondary/60 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    <s.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns — 1 col each on lg */}
            <FooterLinkList title="Products"  links={products} />
            <FooterLinkList title="Solutions" links={solutions} />
            <FooterLinkList title="Resources" links={resources} />
            <FooterLinkList title="About Us"  links={aboutUs} />
            <FooterLinkList title="Legal"     links={legal} />

          </div>
        </div>

        {/* ── Compliance Badges ──────────────────────────────────────────── */}
        <div className="border-t border-border/30 py-5">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {badges.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/40 border border-border/60 text-xs text-muted-foreground font-mono"
              >
                <Shield className="w-3 h-3 text-primary/70" />
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────────── */}
        <div className="border-t border-border/30 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © 2026 VerifyStack. All rights reserved.
            </p>
            <a
              href="mailto:support@verifystack.in"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              support@verifystack.in
            </a>
            <div className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-primary/70" />
              <span className="text-xs text-muted-foreground">
                Secured by <span className="font-semibold text-foreground">256-bit SSL</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
