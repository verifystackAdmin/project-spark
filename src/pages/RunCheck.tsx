import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DocumentUpload from "@/components/DocumentUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import {
  FileText,
  User,
  Phone,
  MessageCircle,
  Camera,
  Globe,
  ArrowRight,
  CheckCircle,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const verificationTypes = [
  {
    id: "identity",
    icon: FileText,
    title: "Identity Verification",
    description: "Aadhaar, PAN, Passport, Driving License",
    required: true,
  },
  {
    id: "face",
    icon: Camera,
    title: "Face Match",
    description: "Upload a selfie for face verification",
    required: false,
  },
  {
    id: "phone",
    icon: Phone,
    title: "Phone Credibility",
    description: "Verify phone number authenticity",
    required: false,
  },
  {
    id: "social",
    icon: Globe,
    title: "Social Media Analysis",
    description: "Analyze online presence and reputation",
    required: false,
  },
  {
    id: "chat",
    icon: MessageCircle,
    title: "Chat Analysis",
    description: "Upload chat for relationship analysis",
    required: false,
  },
];

const RunCheck = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["identity"]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    socialHandle: "",
  });
  const { isAuthenticated } = useAuth();

  const toggleType = (id: string) => {
    if (id === "identity") return; // Can't deselect identity
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            Run a Check
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Start Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Verification
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload documents, provide details, and get a comprehensive verification report with Trust Score.
          </p>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-blue-800 text-center">
              💡 <strong>Note:</strong> You can prepare your verification request now. Login is required only to generate the final report.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  <span
                    className={cn(
                      "ml-3 text-sm font-medium hidden sm:block",
                      step >= s ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {s === 1 ? "Select Type" : s === 2 ? "Upload Documents" : "Login & Submit"}
                  </span>
                  {s < 3 && (
                    <div
                      className={cn(
                        "w-16 sm:w-24 h-0.5 mx-4",
                        step > s ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Select Verification Types
                </h2>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {verificationTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => toggleType(type.id)}
                      className={cn(
                        "flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all",
                        selectedTypes.includes(type.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                          selectedTypes.includes(type.id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <type.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">
                            {type.title}
                          </h3>
                          {type.required && (
                            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {type.description}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                          selectedTypes.includes(type.id)
                            ? "border-primary bg-primary"
                            : "border-border"
                        )}
                      >
                        {selectedTypes.includes(type.id) && (
                          <CheckCircle className="w-4 h-4 text-primary-foreground" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button variant="hero" size="lg" onClick={() => setStep(2)}>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Upload Documents & Details
                </h2>

                <div className="space-y-8">
                  {/* Identity Documents */}
                  <div className="bg-card rounded-2xl border border-border/50 p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Identity Documents
                    </h3>
                    <DocumentUpload
                      title="Upload ID Documents"
                      description="Aadhaar, PAN, Passport, or Driving License"
                    />
                  </div>

                  {/* Face Photo */}
                  {selectedTypes.includes("face") && (
                    <div className="bg-card rounded-2xl border border-border/50 p-6">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-primary" />
                        Selfie Photo
                      </h3>
                      <DocumentUpload
                        title="Upload Selfie"
                        description="Clear front-facing photo for face matching"
                        accept=".jpg,.jpeg,.png"
                        maxFiles={1}
                      />
                    </div>
                  )}

                  {/* Additional Details */}
                  <div className="bg-card rounded-2xl border border-border/50 p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Additional Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter full name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="h-12 rounded-xl"
                        />
                      </div>
                      {selectedTypes.includes("phone") && (
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="h-12 rounded-xl"
                          />
                        </div>
                      )}
                      {selectedTypes.includes("social") && (
                        <div className="space-y-2">
                          <Label htmlFor="social">Social Media Handle</Label>
                          <Input
                            id="social"
                            placeholder="@username"
                            value={formData.socialHandle}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                socialHandle: e.target.value,
                              })
                            }
                            className="h-12 rounded-xl"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chat Upload */}
                  {selectedTypes.includes("chat") && (
                    <div className="bg-card rounded-2xl border border-border/50 p-6">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        Chat Export
                      </h3>
                      <DocumentUpload
                        title="Upload Chat Export"
                        description="WhatsApp or other chat export files"
                        accept=".txt,.json,.zip"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="hero" size="lg" onClick={() => setStep(3)}>
                    Review & Submit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Submit
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Your documents will be securely processed by our AI. You'll
                  receive a detailed verification report within minutes.
                </p>

                <div className="bg-card rounded-2xl border border-border/50 p-6 max-w-md mx-auto mb-8">
                  <h3 className="font-semibold text-foreground mb-4">
                    Selected Verifications
                  </h3>
                  <div className="space-y-2">
                    {selectedTypes.map((id) => {
                      const type = verificationTypes.find((t) => t.id === id);
                      return (
                        <div
                          key={id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-trust" />
                          <span className="text-foreground">{type?.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  {isAuthenticated ? (
                    <Button variant="hero" size="lg">
                      Generate Report
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Link to="/login">
                      <Button variant="hero" size="lg">
                        Login to Generate Report
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RunCheck;
