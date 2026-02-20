import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HelpCircle, FileText, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  const topics = [
    { icon: FileText, title: "Getting Started", desc: "Learn how to run your first verification check.", link: "/how-it-works" },
    { icon: Shield, title: "Account & Security", desc: "Manage your account settings, password, and 2FA.", link: "/dashboard/settings" },
    { icon: CreditCard, title: "Billing & Payments", desc: "View invoices, manage subscriptions, and payment methods.", link: "/dashboard/payments" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
            <p className="text-lg text-muted-foreground">Find answers and get the support you need.</p>
          </div>

          <div className="grid gap-4 mb-8">
            {topics.map((topic) => (
              <Link key={topic.title} to={topic.link} className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
                <topic.icon className="w-8 h-8 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">{topic.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center p-6 rounded-xl bg-muted">
            <p className="text-muted-foreground">
              Still need help? Email us at{" "}
              <a href="mailto:support@verifystack.in" className="text-primary hover:underline">support@verifystack.in</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
