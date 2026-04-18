import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Subscribed!", description: "You'll receive our latest updates." });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 neural-grid opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Stay <span className="gradient-text">Updated</span></h1>
            <p className="text-lg text-muted-foreground mb-8">Get the latest on AI verification, security, and product updates delivered to your inbox.</p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1" />
              <Button type="submit" className="btn-glow">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Newsletter;
