import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrustScoreGauge from "@/components/TrustScoreGauge";
import VerificationResultCard from "@/components/VerificationResultCard";
import RelationshipRadarChart from "@/components/RelationshipRadarChart";
import { Button } from "@/components/ui/button";
import {
  Download,
  Share2,
  UserCheck,
  FileSearch,
  Phone,
  Globe,
  Shield,
  AlertTriangle,
  Calendar,
  MapPin,
  Heart,
} from "lucide-react";

const Report = () => {
  const verificationResults = [
    {
      icon: UserCheck,
      title: "Identity Verification",
      description: "Aadhaar & PAN validated",
      status: "verified" as const,
      details: "Name, DOB, and photo match confirmed. Document issued by UIDAI verified.",
    },
    {
      icon: FileSearch,
      title: "Document Authenticity",
      description: "No forgery detected",
      status: "verified" as const,
      details: "AI analysis found no signs of tampering, manipulation, or forgery.",
    },
    {
      icon: Phone,
      title: "Phone Credibility",
      description: "Number verified",
      status: "verified" as const,
      details: "Phone number active for 5+ years. No spam/fraud reports found.",
    },
    {
      icon: Globe,
      title: "Social Media Analysis",
      description: "Minor concerns found",
      status: "warning" as const,
      details: "Social profiles consistent. Minor discrepancy in employment dates noted.",
    },
    {
      icon: Shield,
      title: "Criminal Record Check",
      description: "No records found",
      status: "verified" as const,
      details: "eCourt database search returned no criminal cases or FIRs.",
    },
    {
      icon: AlertTriangle,
      title: "Fraud Database",
      description: "Clear",
      status: "verified" as const,
      details: "No matches found in fraud/blacklist databases.",
    },
  ];

  const relationshipData = [
    { label: "Emotional Maturity", value: 78, color: "hsl(230, 89%, 48%)" },
    { label: "Communication", value: 85, color: "hsl(179, 85%, 39%)" },
    { label: "Compatibility", value: 72, color: "hsl(142, 76%, 36%)" },
    { label: "Red Flags", value: 15, color: "hsl(0, 84%, 60%)" },
    { label: "Trust Indicators", value: 82, color: "hsl(38, 92%, 50%)" },
    { label: "Contribution %", value: 55, color: "hsl(230, 50%, 60%)" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="inline-block px-4 py-1.5 bg-trust/10 text-trust text-sm font-semibold rounded-full mb-4">
                Verified Report
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Verification Report
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Generated: Dec 10, 2024
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  Bengaluru, India
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="hero" size="lg">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Report Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Trust Score */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border/50 p-8 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground text-center mb-6">
                  Overall Trust Score
                </h2>
                <TrustScoreGauge score={87} size="lg" />
                
                <div className="mt-8 pt-6 border-t border-border/50">
                  <h3 className="font-semibold text-foreground mb-4">Subject Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-medium text-foreground">Rahul Sharma</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Age</span>
                      <span className="font-medium text-foreground">32 years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium text-foreground">Mumbai, MH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ID Type</span>
                      <span className="font-medium text-foreground">Aadhaar + PAN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Verification Results */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Verification Results
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {verificationResults.map((result, index) => (
                    <VerificationResultCard
                      key={index}
                      icon={result.icon}
                      title={result.title}
                      description={result.description}
                      status={result.status}
                      details={result.details}
                    />
                  ))}
                </div>
              </div>

              {/* Relationship Analysis */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Heart className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Relationship Analysis
                  </h2>
                </div>
                <div className="flex justify-center">
                  <RelationshipRadarChart data={relationshipData} size={320} />
                </div>
                
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-trust/5 border border-trust/20">
                    <h4 className="font-semibold text-trust mb-2">Positive Indicators</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Strong communication patterns</li>
                      <li>• Balanced contribution in conversations</li>
                      <li>• Consistent emotional tone</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
                    <h4 className="font-semibold text-warning mb-2">Areas of Concern</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Occasional avoidance patterns detected</li>
                      <li>• Minor dominance in decision topics</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Trust Score Breakdown
                </h2>
                <div className="space-y-4">
                  {[
                    { label: "Identity Verification", score: 95, weight: "30%" },
                    { label: "Document Authenticity", score: 98, weight: "20%" },
                    { label: "Phone Credibility", score: 88, weight: "10%" },
                    { label: "Social Profile", score: 72, weight: "15%" },
                    { label: "Criminal Record", score: 100, weight: "15%" },
                    { label: "Fraud Check", score: 100, weight: "10%" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">
                            {item.label}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {item.weight} weight
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-foreground w-12 text-right">
                        {item.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Report;
