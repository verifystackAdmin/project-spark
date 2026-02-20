import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Users, Target, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">About VerifyStack</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to make background verification fast, reliable, and accessible for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { icon: Shield, title: "Trust & Security", desc: "We use advanced AI and encrypted systems to ensure every verification is accurate and secure." },
              { icon: Users, title: "People First", desc: "Our platform is designed for individuals, families, and businesses who value transparency." },
              { icon: Target, title: "Our Mission", desc: "To empower people with reliable verification tools that build trust in personal and professional relationships." },
              { icon: Award, title: "Quality Commitment", desc: "Every report goes through multiple validation layers to ensure the highest accuracy standards." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-border bg-card">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center p-8 rounded-xl bg-muted">
            <h2 className="text-2xl font-bold text-foreground mb-3">Based in Pune, India</h2>
            <p className="text-muted-foreground">
              VerifyStack is proudly built in Pune, India, serving customers worldwide with cutting-edge verification technology.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
