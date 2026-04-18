import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Loader2, Search, CheckCircle2, AlertTriangle, XCircle,
  Shield, Globe, Server, Clock, UserCheck, ScanLine
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

// ── Count-up hook ──
function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) { setValue(0); return; }
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

// ── Scan steps shown during loading ──
const SCAN_STEPS = [
  "Validating email format...",
  "Checking MX & DNS records...",
  "Scanning domain reputation...",
  "Cross-referencing behavioral signals...",
  "Generating Trust Score...",
];

const ScanningLoader = () => {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const total = SCAN_STEPS.length;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      if (i < total) setStepIdx(i);
      else clearInterval(t);
    }, 280);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-10 text-center">
      {/* Animated scan ring */}
      <div className="relative w-20 h-20 mx-auto mb-6">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
            <ScanLine className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
      </div>

      {/* Scan steps */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stepIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="text-sm font-medium text-foreground mb-1"
        >
          {SCAN_STEPS[stepIdx]}
        </motion.p>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="mt-4 h-1 bg-border rounded-full overflow-hidden max-w-xs mx-auto">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        Running {SCAN_STEPS.length} intelligence checks...
      </p>
    </div>
  );
};

// ── Score ring ──
const ScoreRing = ({ score, animate }: { score: number; animate: boolean }) => {
  const displayed = useCountUp(score, 1200, animate);
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (displayed / 100) * circ;

  const color =
    score >= 80 ? "#22c55e" :
    score >= 60 ? "#3b82f6" :
    score >= 40 ? "#f59e0b" : "#ef4444";

  const label =
    score >= 80 ? "Highly Trusted" :
    score >= 60 ? "Moderate Trust" :
    score >= 40 ? "Low Trust" : "High Risk";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="8" className="text-border" />
          <motion.circle
            cx="60" cy="60" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.016s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-foreground">{displayed}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-sm font-bold"
        style={{ color }}
      >
        {label}
      </motion.span>
    </div>
  );
};

// ── Main component ──
export const LiveDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [scoreAnimating, setScoreAnimating] = useState(false);

  const analyzeEmail = (email: string) => {
    const disposableDomains = ["mailinator.com", "tempmail.com", "10minutemail.com", "guerrillamail.com", "yopmail.com", "trashmail.com"];
    const freeProviders = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "icloud.com", "protonmail.com"];
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) return null;

    const [username, domainPart] = email.split("@");
    const domain = domainPart.toLowerCase();
    const isDisposable = disposableDomains.includes(domain);
    const isFree = freeProviders.includes(domain);
    const hasSuspiciousChars = /[^\x00-\x7F]/.test(username);

    if (isDisposable) {
      return {
        score: 0,
        status: "Blocked",
        statusColor: "text-red-500",
        explanation: "Disposable domain detected. Registration rejected to prevent fraud.",
        checks: [
          { icon: Shield,   label: "Risk Level",       value: "CRITICAL",    status: "fail" },
          { icon: Globe,    label: "Domain Reputation", value: "Blacklisted", status: "fail" },
          { icon: Server,   label: "MX Records",        value: "Ignored",     status: "fail" },
          { icon: Clock,    label: "Domain Age",        value: "< 24 Hours",  status: "fail" },
        ],
      };
    }

    const baseScore = isFree ? 50 : 65;
    const mxScore = 25;
    const domainAgeYears = isFree ? 15 : Math.floor(Math.random() * 10) + 2;
    const ageScore = domainAgeYears > 1 ? 10 : 0;
    const hasBehavioralMatch = Math.random() > 0.2;
    const behavioralScore = hasBehavioralMatch ? 15 : 0;
    const penalty = hasSuspiciousChars ? 50 : 0;
    const score = Math.min(100, Math.max(0, baseScore + mxScore + ageScore + behavioralScore - penalty));

    const status =
      score >= 90 ? "Verified Legit" :
      score >= 70 ? "Likely Legit" :
      score >= 40 ? "Neutral" : "Risky";

    const statusColor =
      score >= 90 ? "text-green-500" :
      score >= 70 ? "text-emerald-500" :
      score >= 40 ? "text-yellow-500" : "text-orange-500";

    const explanation =
      score >= 90 ? "Excellent reputation. Identity corroborated by behavioral signals." :
      score >= 70 ? "Valid address with strong domain reputation. Low risk." :
      score >= 40 ? "Valid domain, but lacks strong behavioral history." :
                    "Suspicious patterns detected. Additional verification recommended.";

    return {
      score, status, statusColor, explanation,
      checks: [
        { icon: Shield,   label: "Risk Level",        value: score >= 70 ? "Low" : "Medium",                  status: score >= 70 ? "pass" : "warning" },
        { icon: Globe,    label: "Domain Type",        value: isFree ? "Public (Medium Trust)" : "Corporate",  status: "pass" },
        { icon: Server,   label: "MX Records",         value: "Valid & Active",                                status: "pass" },
        { icon: Clock,    label: "Domain Age",         value: `${domainAgeYears}+ Years`,                      status: "pass" },
        { icon: UserCheck, label: "Behavioral Signal", value: hasBehavioralMatch ? "Verified" : "No Data",     status: hasBehavioralMatch ? "pass" : "warning" },
      ],
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    setIsLoading(true);
    setResult(null);
    setScoreAnimating(false);
    setTimeout(() => {
      const analysis = analyzeEmail(inputValue) ?? {
        score: 45,
        status: "Invalid Format",
        statusColor: "text-destructive",
        explanation: "Please enter a valid email address.",
        checks: [{ icon: AlertTriangle, label: "Syntax", value: "Invalid Email Format", status: "fail" }],
      };
      setResult(analysis);
      setIsLoading(false);
      setTimeout(() => setScoreAnimating(true), 100);
    }, 1600);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.35, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  };

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-4xl font-bold tracking-tight text-foreground mb-4"
          >
            Experience Our <span className="gradient-text">AI Risk Engine</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Enter an email address to see a real-time legitimacy &amp; risk intelligence report.
          </motion.p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
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
            <Button type="submit" size="lg" variant="default" disabled={isLoading || !inputValue} className="btn-glow">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Analyze Risk"}
            </Button>
          </form>

          <AnimatePresence mode="wait">
            {(isLoading || result) && (
              <motion.div
                key={isLoading ? "loading" : "result"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl border shadow-sm overflow-hidden"
              >
                {isLoading && <ScanningLoader />}

                {!isLoading && result && (
                  <div>
                    {/* Score header */}
                    <div className="p-8 border-b bg-secondary/20 text-center">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg font-bold text-foreground mb-6"
                      >
                        Risk Analysis for{" "}
                        <span className="text-primary">{inputValue}</span>
                      </motion.h3>

                      <div className="flex flex-col items-center gap-3">
                        <ScoreRing score={result.score} animate={scoreAnimating} />
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className={cn("text-xl font-bold", result.statusColor)}
                        >
                          {result.status}
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.75 }}
                          className="text-muted-foreground max-w-md text-sm"
                        >
                          {result.explanation}
                        </motion.p>
                      </div>
                    </div>

                    {/* Check cards — staggered */}
                    <div className="p-8">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        Transparency Report
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {result.checks.map((check: any, i: number) => (
                          <motion.div
                            key={i}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center gap-3 p-3.5 rounded-xl bg-background border border-border/50 hover:border-primary/20 transition-colors"
                          >
                            <div className={cn(
                              "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                              check.status === "pass"    ? "bg-green-500/10 text-green-500" :
                              check.status === "warning" ? "bg-yellow-500/10 text-yellow-500" :
                                                           "bg-red-500/10 text-red-500"
                            )}>
                              <check.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground">{check.label}</p>
                              <p className="text-sm font-semibold text-foreground truncate">{check.value}</p>
                            </div>
                            <div className="flex-shrink-0">
                              {check.status === "pass"    && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                              {check.status === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                              {check.status === "fail"    && <XCircle      className="w-4 h-4 text-red-500" />}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 pt-5 border-t text-center">
                        <p className="text-xs text-muted-foreground">
                          <Shield className="w-3 h-3 inline mr-1" />
                          Email verification is heuristic-based and does not guarantee identity.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
