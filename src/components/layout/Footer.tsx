import { Link } from "react-router-dom";
import { Shield, Mail, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: [
      { label: "Use Cases", href: "/use-cases" },
      { label: "Pricing", href: "/pricing" },
      { label: "Run a Check", href: "/run-check" },
      { label: "Dashboard", href: "/dashboard" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "API Documentation", href: "/api-docs" },
      { label: "Status", href: "/status" },
      { label: "FAQ", href: "/faq" },
    ],
  };

  const complianceBadges = [
    "GDPR Ready",
    "India DPDP",
    "AES-256",
    "SOC 2",
  ];

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground tracking-tight">
                VerifyStack
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Enterprise-grade background verification accessible to businesses, agencies, and everyday individuals.
            </p>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-6">
              Trust Infrastructure for India
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/verifystack" },
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground">
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="font-semibold text-foreground text-sm mb-4 capitalize">{key}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-8 border-t border-border/50 mb-8">
          {complianceBadges.map((badge, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 text-xs text-muted-foreground font-mono border border-border/50">
              <Shield className="w-3 h-3 text-trust" />
              {badge}
            </span>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-wrap items-center justify-center gap-6 pb-8 border-b border-border/50 mb-8">
          <a href="mailto:support@verifystack.in" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-3.5 h-3.5" />
            support@verifystack.in
          </a>
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            Pune, India
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VerifyStack. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Secured by</span>
            <span className="text-xs font-semibold text-accent font-mono">256-bit SSL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
