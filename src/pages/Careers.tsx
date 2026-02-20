import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Briefcase } from "lucide-react";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Briefcase className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Careers at VerifyStack</h1>
          <p className="text-lg text-muted-foreground mb-8">
            We're building the future of background verification. Join our team and make an impact.
          </p>
          <div className="p-8 rounded-xl border border-border bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-3">No Open Positions Right Now</h2>
            <p className="text-muted-foreground mb-4">
              We don't have any openings at the moment, but we're always looking for talented individuals.
            </p>
            <p className="text-muted-foreground">
              Send your resume to{" "}
              <a href="mailto:careers@verifystack.in" className="text-primary hover:underline">
                careers@verifystack.in
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
