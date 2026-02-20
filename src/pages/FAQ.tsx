import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    { q: "What is VerifyStack?", a: "VerifyStack is an AI-powered background verification platform that helps you verify identity, documents, employment history, and more." },
    { q: "How long does a verification take?", a: "Most verifications are completed within minutes. Complex checks involving manual review may take up to 24–48 hours." },
    { q: "Is my data secure?", a: "Absolutely. We use 256-bit SSL encryption and follow strict data protection protocols. Your data is never shared with third parties." },
    { q: "What documents can I verify?", a: "We support Aadhaar, PAN, driving license, passport, educational certificates, employment records, and more." },
    { q: "Can I get a refund?", a: "Refund requests are reviewed on a case-by-case basis. Completed verification reports are non-refundable. See our Refund Policy for details." },
    { q: "How do I contact support?", a: "Email us at support@verifystack.in and we'll get back to you within 24 hours." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">Quick answers to common questions.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-5 bg-card">
                <AccordionTrigger className="text-left font-medium text-foreground">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
