import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FAQ = () => {
  const faqs = [
    { q: "What is VerifyStack?", a: "VerifyStack is an AI-powered background verification platform that democratizes trust—making enterprise-grade verification accessible to businesses, agencies, housing societies, and everyday individuals." },
    { q: "Who is VerifyStack for?", a: "VerifyStack serves businesses hiring employees, staffing agencies pre-verifying workforce pools, housing societies screening domestic help and tenants, and individuals verifying nannies, drivers, or partners." },
    { q: "How long does a verification take?", a: "Most verifications are completed within minutes. Complex checks involving manual review may take up to 24–48 hours." },
    { q: "Is my data secure?", a: "Absolutely. We use 256-bit SSL encryption and are GDPR Ready and India DPDP Compliant. Your data is never shared with third parties." },
    { q: "What documents can I verify?", a: "We support Aadhaar, PAN, driving license, passport, educational certificates, employment records, and more." },
    { q: "Can agencies use VerifyStack at scale?", a: "Yes! Staffing agencies can pre-verify their entire candidate pool and market themselves as 'Verified-Only Workforce Providers' to win premium contracts." },
    { q: "Do you support housing societies?", a: "Yes. We streamline background checks for domestic help, maintenance staff, tenants, and service vendors across hundreds of households." },
    { q: "Can I get a refund?", a: "Refund requests are reviewed on a case-by-case basis. Completed verification reports are non-refundable. See our Refund Policy for details." },
    { q: "How do I contact support?", a: "Email us at support@verifystack.in and we'll get back to you within 24 hours." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                Help Center
              </span>
              <h1 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-muted-foreground">Quick answers about how VerifyStack works for individuals, businesses, and agencies.</p>
            </div>
          </ScrollReveal>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <AccordionItem value={`item-${i}`} className="border border-border rounded-xl px-5 bg-card">
                  <AccordionTrigger className="text-left font-medium text-foreground">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>

          <ScrollReveal>
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Link to="/contact">
                <Button size="lg" className="group hover-glow">
                  Contact Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
