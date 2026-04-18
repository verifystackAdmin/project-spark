import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle } from "lucide-react";

const Status = () => {
  const services = [
    { name: "Verification Engine", status: "Operational" },
    { name: "User Dashboard", status: "Operational" },
    { name: "Payment Processing", status: "Operational" },
    { name: "Document Upload", status: "Operational" },
    { name: "Report Generation", status: "Operational" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-foreground mb-4">System Status</h1>
            <p className="text-lg text-green-600 font-medium">All Systems Operational</p>
          </div>

          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                <span className="font-medium text-foreground">{service.name}</span>
                <span className="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Status;
