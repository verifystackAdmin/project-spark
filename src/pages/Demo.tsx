import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LiveDemo } from "@/components/landing/LiveDemo";

const Demo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Live Demo
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Experience the power of VerifyStack's AI-powered verification firsthand.
              Enter any email or social media handle to see a sample report.
            </p>
          </div>
        </section>
        
        <LiveDemo />
        
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
