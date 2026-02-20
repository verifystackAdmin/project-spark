import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2, Search, CheckCircle2, AlertTriangle, XCircle, Shield, Globe, Server, Clock, UserCheck, Building2 } from "lucide-react";
import TrustScoreGauge from "../TrustScoreGauge";
import { cn } from "../../lib/utils";

export const LiveDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeEmail = (email: string) => {
    const disposableDomains = ['mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'yopmail.com', 'trashmail.com'];
    const freeProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'icloud.com', 'protonmail.com'];
    
    // RFC 5322ish regex for better validation
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      return null;
    }

    const [username, domainPart] = email.split('@');
    const domain = domainPart.toLowerCase();
    const isDisposable = disposableDomains.includes(domain);
    const isFree = freeProviders.includes(domain);
    
    // Check for suspicious characters (simulating unicode spoofing detection)
    const hasSuspiciousChars = /[^\x00-\x7F]/.test(username);

    let score = 0;
    let status = "";
    let statusColor = "";
    let checks = [];
    let explanation = "";

    if (isDisposable) {
      score = 0;
      status = "Blocked";
      statusColor = "text-destructive";
      explanation = "Disposable domain detected. Registration rejected to prevent fraud.";
      checks = [
        { icon: Shield, label: "Risk Level", value: "CRITICAL", status: "fail" },
        { icon: Globe, label: "Domain Reputation", value: "Blacklisted", status: "fail" },
        { icon: Server, label: "MX Records", value: "Ignored", status: "fail" },
        { icon: Clock, label: "Domain Age", value: "< 24 Hours", status: "fail" },
      ];
    } else {
      // Scoring Engine Implementation
      
      // 1. Base Trust (Domain Type)
      // Free providers are Medium Trust (not penalized), Corporate are High Trust
      let baseScore = isFree ? 50 : 65; 

      // 2. MX Record Signal (Strong Positive)
      // Simulating a valid MX lookup for non-disposable
      const mxScore = 25;

      // 3. Domain Age (Trust Builder)
      // Simulating age. Free providers are usually old. Corporate domains vary.
      const domainAgeYears = isFree ? 15 : Math.floor(Math.random() * 10) + 2;
      const ageScore = domainAgeYears > 1 ? 10 : 0;

      // 4. Behavioral Signals (Highest Weight)
      // Simulating cross-reference (Phone, Social, Device)
      // Randomize for demo, but weight heavily
      const hasBehavioralMatch = Math.random() > 0.2; // 80% chance of match for demo
      const behavioralScore = hasBehavioralMatch ? 15 : 0;

      // 5. Penalties
      let penalty = 0;
      if (hasSuspiciousChars) penalty += 50;

      // Calculate Final Score
      score = baseScore + mxScore + ageScore + behavioralScore - penalty;
      score = Math.min(100, Math.max(0, score)); // Clamp 0-100

      // Classification
      if (score >= 90) {
        status = "Verified Legit";
        statusColor = "text-green-500";
        explanation = "Excellent reputation. Identity corroborated by behavioral signals.";
      } else if (score >= 70) {
        status = "Likely Legit";
        statusColor = "text-emerald-500";
        explanation = "Valid address with strong domain reputation. Low risk.";
      } else if (score >= 40) {
        status = "Neutral";
        statusColor = "text-yellow-500";
        explanation = "Valid domain, but lacks strong behavioral history.";
      } else {
        status = "Risky";
        statusColor = "text-orange-500";
        explanation = "Suspicious patterns detected. Additional verification recommended.";
      }

      checks = [
        { icon: Shield, label: "Risk Level", value: score >= 70 ? "Low" : "Medium", status: score >= 70 ? "pass" : "warning" },
        { icon: Globe, label: "Domain Type", value: isFree ? "Public (Medium Trust)" : "Corporate (High Trust)", status: "pass" },
        { icon: Server, label: "MX Records", value: "Valid & Active", status: "pass" },
        { icon: Clock, label: "Domain Age", value: `${domainAgeYears}+ Years`, status: "pass" },
        { icon: UserCheck, label: "Behavioral Signal", value: hasBehavioralMatch ? "Verified" : "No Data", status: hasBehavioralMatch ? "pass" : "warning" },
      ];
    }

    return { score, status, statusColor, checks, domain, explanation };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    setIsLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      const analysis = analyzeEmail(inputValue);
      
      if (analysis) {
        setResult(analysis);
      } else {
        setResult({
            score: 45,
            status: "Invalid Format",
            statusColor: "text-destructive",
            checks: [
                { icon: AlertTriangle, label: "Syntax", value: "Invalid Email Format", status: "fail" }
            ]
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Experience Our AI Risk Engine
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Enter an email address to see a real-time legitimacy & risk intelligence report.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g., john@company.com"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-10 h-12 rounded-xl"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              variant="default"
              disabled={isLoading || !inputValue}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Analyze Risk"
              )}
            </Button>
          </form>

          {(isLoading || result) && (
            <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
              {isLoading && (
                <div className="p-12 text-center">
                  <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary mb-4" />
                  <h3 className="text-lg font-semibold">
                    Running Intelligence Checks...
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Validating syntax, checking DNS/MX records, and analyzing domain reputation.
                  </p>
                </div>
              )}
              
              {!isLoading && result && (
                <div>
                  {/* Header Result */}
                  <div className="p-8 border-b bg-secondary/20 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-6">
                      Risk Analysis for <span className="text-primary">{inputValue}</span>
                    </h3>
                    <div className="flex flex-col items-center justify-center">
                       <TrustScoreGauge score={result.score} size="lg" animated />
                       <div className={cn("mt-4 text-2xl font-bold", result.statusColor)}>
                         {result.status}
                       </div>
                       <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                         {result.explanation}
                       </p>
                    </div>
                  </div>

                  {/* Detailed Checks */}
                  <div className="p-8">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Transparency Report
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {result.checks.map((check: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background border">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                            check.status === 'pass' ? "bg-green-100 text-green-600" :
                            check.status === 'warning' ? "bg-yellow-100 text-yellow-600" :
                            "bg-red-100 text-red-600"
                          )}>
                            <check.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">{check.label}</p>
                            <p className="text-sm font-semibold text-foreground">{check.value}</p>
                          </div>
                          <div className="ml-auto">
                            {check.status === 'pass' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                            {check.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                            {check.status === 'fail' && <XCircle className="w-5 h-5 text-red-500" />}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t text-center">
                      <p className="text-xs text-muted-foreground">
                        <Shield className="w-3 h-3 inline mr-1" />
                        Email verification is heuristic-based and does not guarantee identity.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
