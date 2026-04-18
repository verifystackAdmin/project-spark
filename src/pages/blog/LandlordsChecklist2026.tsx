import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { buildBlogPostingJsonLd, buildBlogFaqPageJsonLd } from "@/lib/blogPostingSchema";
import { CALENDLY_BOOK_DEMO_URL } from "@/lib/siteLinks";

const META_DESCRIPTION =
  "Master the 2026 rental landscape. From the Model Tenancy Act compliance to AI-powered tenant screening, use this ultimate landlord checklist to protect your property and ensure recurring rental peace of mind.";

/** Must match the visible FAQ section below (Google requires schema text to match on-page copy). */
const faqJsonLd = buildBlogFaqPageJsonLd("landlords-checklist-2026-handover-property-management", [
  {
    "@type": "Question",
    name: "What is the maximum security deposit a landlord can take in 2026?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Under the Model Tenancy Act 2026, residential deposits are capped at 2 months' rent. For commercial properties, the cap is 6 months. Taking more is a legal violation that can be challenged in Rent Court.",
    },
  },
  {
    "@type": "Question",
    name: "Do I have the right to enter the property for inspection whenever I want?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "No. Indian law and the MTA 2026 protect a tenant's Right to Privacy. You must provide at least 24 to 48 hours' notice before entering, except in extreme emergencies (like a fire or flood).",
    },
  },
  {
    "@type": "Question",
    name: "What are common mistakes landlords should avoid in 2026?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "The three biggest pitfalls are: 1. Poor Screening (not using AI to catch synthetic fraud), 2. Ignoring Repairs (leading to early termination and bad reviews), and 3. Unclear Agreements (vague clauses on maintenance that lead to court battles).",
    },
  },
  {
    "@type": "Question",
    name: 'How does VerifyStack\'s TrustScore help with "Model Tenancy" compliance?',
    acceptedAnswer: {
      "@type": "Answer",
      text: 'The MTA requires "Fair Lease Terms." By using an objective TrustScore, you can justify your selection criteria based on data (litigation history, income stability) rather than subjective bias, protecting you from discrimination claims.',
    },
  },
]);

const articleJsonLd = buildBlogPostingJsonLd({
  slug: "landlords-checklist-2026-handover-property-management",
  headline:
    'The Professional Landlord: Why "Passive Income" Requires Active Intelligence',
  description: META_DESCRIPTION,
  datePublished: "2026-04-01",
});

const LandlordsChecklist2026 = () => {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <article className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                Real Estate &amp; Rentals
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                April 1, 2026
              </span>
              <span>· 12 min read</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              The Professional Landlord: Why &quot;Passive Income&quot; Requires Active Intelligence
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">{META_DESCRIPTION}</p>

            <div className="space-y-10 text-muted-foreground leading-relaxed">
              <section>
                <p className="mb-4">
                  In 2026, being a landlord in India is no longer just about collecting a cheque; it is
                  about managing a regulated asset. With the Model Tenancy Act (MTA) 2026 now standard
                  across major states, the legal &quot;margin for error&quot; has vanished.
                </p>
                <p>
                  According to the 2026 India Real Estate Transparency Index, landlords who use
                  structured digital checklists see a 40% reduction in maintenance disputes and a 65%
                  faster resolution in Rent Tribunals. Whether you are a first-time homeowner or a
                  seasoned investor, the &quot;Keys Handover&quot; is just the beginning.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Phase 1: The Pre-Move-In &amp; Handover Checklist
                </h2>
                <p className="mb-6">
                  The foundation of a stress-free tenancy is laid before the tenant enters. In 2026,
                  this phase is governed by strict digital documentation requirements.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  1. Legal Compliance &amp; The Digital Tenancy ID
                </h3>
                <p className="mb-4">
                  Under the MTA 2026, verbal agreements are legally void.
                </p>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>
                    <span className="font-medium text-foreground">Requirement:</span> Register the
                    lease on the State Rental Portal within 60 days.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">The Checklist:</span> Ensure you
                    have the Unique Tenancy ID generated. Without this, you cannot access fast-track
                    eviction or dispute resolution.
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  2. Property Inspection &amp; The &quot;Condition Baseline&quot;
                </h3>
                <p className="mb-4">
                  Before handing over the keys, conduct a &quot;Room-by-Room&quot; audit.
                </p>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>
                    <span className="font-medium text-foreground">Plumbing &amp; Electrical:</span>{" "}
                    Test all points. 2026 safety standards require ELCC (Earth Leakage Circuit
                    Breakers) in all wet areas.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Documentation:</span> Take
                    high-resolution photos and videos of fixtures. This &quot;Move-In Checklist&quot;
                    must be signed by both parties to avoid security deposit disputes later.
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  3. AI-Powered Tenant Screening (The VerifyStack Layer)
                </h3>
                <p className="mb-4">
                  Traditional checks miss{" "}
                  <span className="font-medium text-foreground">Synthetic Identities</span>—a 2026
                  fraud trend where scammers use real ID numbers with fake work histories.
                </p>
                <ul className="space-y-3 list-none pl-0">
                  <li>
                    <Link to="/product/verifystack-shield" className="text-primary font-semibold hover:underline">
                      VerifyStack Shield
                    </Link>
                    : Use 3D Liveness checks to ensure the person signing is the person on the ID.
                  </li>
                  <li>
                    <Link to="/product/verifystack-riskengine" className="text-primary font-semibold hover:underline">
                      VerifyStack RiskEngine
                    </Link>
                    : Scan 3,300+ e-Courts for prior rent default litigation.
                  </li>
                  <li>
                    <Link to="/product/verifystack-trustscore" className="text-primary font-semibold hover:underline">
                      VerifyStack TrustScore
                    </Link>
                    : Get a 0-100 score on the tenant&apos;s reliability before saying &quot;Yes.&quot;
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Phase 2: Maintaining the Asset During Tenancy
                </h2>
                <p className="mb-6">
                  A well-maintained property attracts long-term tenants and protects your capital
                  appreciation.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">
                  The 2026 Responsibility Matrix
                </h3>
                <div className="overflow-x-auto rounded-lg border border-border my-6">
                  <table className="w-full text-sm text-left min-w-[560px]">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="p-3 font-semibold text-foreground">Responsibility</th>
                        <th className="p-3 font-semibold text-foreground">Landlord Duty</th>
                        <th className="p-3 font-semibold text-foreground">Tenant Duty</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground/90">
                      <tr className="border-b border-border">
                        <td className="p-3 font-medium">Maintenance</td>
                        <td className="p-3">
                          Major repairs (Seepage, Structural, Electrical mains).
                        </td>
                        <td className="p-3">
                          Minor upkeep (Bulb changes, Tap washers, Cleaning).
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-3 font-medium">Safety</td>
                        <td className="p-3">
                          Ensuring working locks, fire safety, and ELCC.
                        </td>
                        <td className="p-3">
                          Avoiding unsafe modifications or overloaded circuits.
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-3 font-medium">Communication</td>
                        <td className="p-3">24-48 hour notice before entry/inspection.</td>
                        <td className="p-3">Promptly reporting leaks or damages.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Regular vs. Preventive Maintenance
                </h3>
                <ul className="list-disc list-inside space-y-3">
                  <li>
                    <span className="font-medium text-foreground">Quarterly Inspections:</span>{" "}
                    Conduct biannual safety checks (HVAC, plumbing) with at least 24 hours&apos;
                    notice.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Emergency Protocol:</span> Maintain
                    a 24-hour contact list for plumbers and electricians. In 2026, &quot;Tenant
                    Experience&quot; is the top driver for lease renewals.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Phase 3: The Move-Out &amp; Security Deposit Settlement
                </h2>
                <p className="mb-4">
                  Concluding a tenancy is where 80% of legal disputes occur. A structured move-out
                  prevents these &quot;financial headaches.&quot;
                </p>
                <ul className="list-disc list-inside space-y-3">
                  <li>
                    <span className="font-medium text-foreground">The Move-Out Notice:</span> Confirm
                    the notice in writing. Under 2026 rules, tenants must give at least one
                    month&apos;s notice unless specified otherwise.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">The Comparison Inspection:</span>{" "}
                    Compare the property&apos;s current state against your Move-In Checklist.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Normal Wear &amp; Tear:</span>{" "}
                    Faded paint or aging plumbing is your cost.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Tenant Damage:</span> Broken tiles
                    or unauthorized wall changes are deductible.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">The Deposit Refund:</span> Follow
                    the MTA timelines. In 2026, security deposits must generally be returned within 30
                    days of vacating, minus documented deductions.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Enhancing Operations with Technology
                </h2>
                <p className="mb-4">
                  In 2026, &quot;Excel Sheet Landlords&quot; are being replaced by &quot;Infrastructure
                  Landlords.&quot;
                </p>
                <ul className="list-disc list-inside space-y-4">
                  <li>
                    <span className="font-medium text-foreground">Digital Rent Collection:</span> Use
                    automated UPI/NACH systems. It creates a bank-verified ledger that serves as
                    evidence in case of a default.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">DPDP Compliance:</span> Since you are
                    handling tenant IDs and salary slips, you are a Data Fiduciary. You must store
                    this data securely. VerifyStack handles this compliance for you, encrypting all
                    tenant data to meet ₹250 Crore penalty safety standards.
                  </li>
                </ul>
              </section>

              <section className="rounded-xl border border-border bg-card p-8 text-center">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="btn-glow w-full sm:w-auto" asChild>
                    <a href={CALENDLY_BOOK_DEMO_URL} target="_blank" rel="noopener noreferrer">
                      Book a Demo with VerifyStack <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Link to="/signup">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-border/50">
                      Run Your First Verification for Free
                    </Button>
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      What is the maximum security deposit a landlord can take in 2026?
                    </h3>
                    <p>
                      Under the Model Tenancy Act 2026, residential deposits are capped at 2
                      months&apos; rent. For commercial properties, the cap is 6 months. Taking more
                      is a legal violation that can be challenged in Rent Court.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Do I have the right to enter the property for inspection whenever I want?
                    </h3>
                    <p>
                      No. Indian law and the MTA 2026 protect a tenant&apos;s Right to Privacy. You
                      must provide at least 24 to 48 hours&apos; notice before entering, except in
                      extreme emergencies (like a fire or flood).
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      What are common mistakes landlords should avoid in 2026?
                    </h3>
                    <p>
                      The three biggest pitfalls are: 1. Poor Screening (not using AI to catch
                      synthetic fraud), 2. Ignoring Repairs (leading to early termination and bad
                      reviews), and 3. Unclear Agreements (vague clauses on maintenance that lead to
                      court battles).
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      How does VerifyStack&apos;s TrustScore help with &quot;Model Tenancy&quot;
                      compliance?
                    </h3>
                    <p>
                      The MTA requires &quot;Fair Lease Terms.&quot; By using an objective TrustScore,
                      you can justify your selection criteria based on data (litigation history,
                      income stability) rather than subjective bias, protecting you from
                      discrimination claims.
                    </p>
                  </div>
                </div>
              </section>

              <p className="text-sm pt-4">
                <Link to="/blog" className="text-primary hover:underline">
                  ← Back to Blog
                </Link>
              </p>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default LandlordsChecklist2026;
