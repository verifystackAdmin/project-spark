import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

/** Keep in sync with FAQPage JSON-LD in index.html (SEO / Rich Results). */
const faqs = [
  {
    q: "What is background verification and why is it important?",
    a: "Background verification is the process of checking a person's identity, criminal records, address and other credentials before hiring, renting or trusting them. It helps businesses, families and organizations reduce fraud and make safer decisions.",
  },
  {
    q: "How does VerifyStack background verification work?",
    a: "VerifyStack uses AI to analyze identity documents, criminal records, address data and digital signals. Once processed, the platform generates a Trust Score and a detailed report so you can assess risk quickly.",
  },
  {
    q: "Who can use VerifyStack for background checks?",
    a: "VerifyStack is built for businesses, agencies, housing societies and individuals. Companies verify employees, families verify tenants or domestic help, and agencies pre-verify their workforce before onboarding.",
  },
  {
    q: "What types of background checks can VerifyStack perform?",
    a: "VerifyStack covers identity verification, employee background checks, tenant screening, domestic help verification, criminal record checks, address verification and workforce screening.",
  },
  {
    q: "How long does background verification take?",
    a: "Most verifications are completed within minutes depending on the documents and data sources available. VerifyStack's AI-powered system analyzes multiple data points quickly to generate a risk score and verification report.",
  },
  {
    q: "Is VerifyStack compliant with Indian data protection laws?",
    a: "Yes. VerifyStack is designed with compliance in mind and follows India's DPDP Act requirements along with strong security practices such as AES-256 encryption and secure data infrastructure.",
  },
  {
    q: "Can individuals use VerifyStack to verify tenant or domestic help?",
    a: "Yes. Families can use VerifyStack to verify tenants, drivers, nannies and domestic help before allowing them into their home or renting out their property.",
  },
  {
    q: "What is a Trust Score in VerifyStack?",
    a: "The Trust Score is an AI-generated score from 0 to 100 that summarizes identity verification, criminal checks, address verification and other risk signals. A higher score means lower risk.",
  },
  {
    q: "Can businesses verify employees using VerifyStack?",
    a: "Yes. Businesses can use VerifyStack to check identity details, employment history, criminal records and other risk factors before onboarding a new hire.",
  },
  {
    q: "Is background verification secure on VerifyStack?",
    a: "VerifyStack uses end-to-end encryption, secure infrastructure and strict data protection protocols to keep all verification data and reports confidential.",
  },
];

const HomeFAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 border border-primary/20 uppercase tracking-widest">
              FAQs
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Everything you need to know about background verification and how VerifyStack works.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div
                className={`rounded-xl border transition-all duration-200 ${
                  open === i
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/60 bg-card/40 hover:border-border"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-colors ${open === i ? "text-primary" : "text-muted-foreground/50"}`} />
                    <span className="text-sm font-semibold text-foreground leading-snug">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${open === i ? "rotate-180 text-primary" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed pl-[3.25rem]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeFAQ;
