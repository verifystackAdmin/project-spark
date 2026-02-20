import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: "Email", detail: "support@verifystack.in", href: "mailto:support@verifystack.in" },
              { icon: MapPin, title: "Location", detail: "Bengaluru, India", href: null },
              { icon: Clock, title: "Response Time", detail: "Within 24 hours", href: null },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-border bg-card text-center">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                {item.href ? (
                  <a href={item.href} className="text-primary hover:underline text-sm">{item.detail}</a>
                ) : (
                  <p className="text-muted-foreground text-sm">{item.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
