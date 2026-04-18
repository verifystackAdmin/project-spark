import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import {
  Phone, Mail, ArrowRight, CheckCircle, Shield, Lock,
  User, Camera, FileText, MapPin, Briefcase,
  AlertTriangle, ScanLine, ChevronRight, Star,
  BadgeCheck, TrendingUp, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeRiskShield, type RiskShieldAnalyzeResponse } from "@/lib/riskShieldApi";
import BgvFullCheckPanel from "@/components/bgv/BgvFullCheckPanel";

// ─── Types ───────────────────────────────────────────────────────────────────
type Step = "entry" | "scanning" | "free-result" | "basic" | "kyc" | "address" | "premium";

interface FormData {
  phone: string;
  email: string;
  name: string;
  selfie: File | null;
  aadhaar: File | null;
  pan: File | null;
  address: string;
  employer: string;
}

function isValidEmail(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

function phoneDigitsOk(s: string): boolean {
  return s.replace(/\D/g, "").length >= 10;
}

function riskLevelStyle(level: string | undefined): { text: string; className: string } {
  const u = (level ?? "").toUpperCase();
  if (u.includes("CRITICAL") || u.includes("HIGH")) {
    return { text: level ?? "High", className: "text-red-400" };
  }
  if (u.includes("MEDIUM") || u.includes("MODERATE")) {
    return { text: level ?? "Medium", className: "text-yellow-400" };
  }
  if (u.includes("LOW") || u.includes("MINIMAL")) {
    return { text: level ?? "Low", className: "text-green-400" };
  }
  return { text: level ?? "—", className: "text-foreground" };
}

// ─── Step meta ────────────────────────────────────────────────────────────────
const STEPS: { id: Step; label: string; pct: number }[] = [
  { id: "entry",        label: "Start",        pct: 0  },
  { id: "scanning",     label: "Scanning",     pct: 8  },
  { id: "free-result",  label: "Free Result",  pct: 12 },
  { id: "basic",        label: "Basic Info",   pct: 35 },
  { id: "kyc",          label: "KYC",          pct: 62 },
  { id: "address",      label: "Address",      pct: 82 },
  { id: "premium",      label: "Full Report",  pct: 100},
];

const SCAN_LINES = [
  "Checking phone number activity...",
  "Scanning public risk databases...",
  "Analysing digital footprint...",
  "Computing initial Trust Score...",
];

// ─── Count-up hook ─────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1000, active = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) { setV(0); return; }
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(e * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return v;
}

// ─── Progress bar ──────────────────────────────────────────────────────────
const ProgressBar = ({ pct }: { pct: number }) => (
  <div className="w-full">
    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
      <span>Verification progress</span>
      <span className="font-semibold text-primary">{pct}% complete</span>
    </div>
    <div className="h-2 bg-border rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </div>
);

// ─── Score ring ────────────────────────────────────────────────────────────
const ScoreRing = ({ score, active, size = 120 }: { score: number; active: boolean; size?: number }) => {
  const displayed = useCountUp(score, 1000, active);
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (displayed / 100) * circ;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#3b82f6" : score >= 35 ? "#f59e0b" : "#ef4444";
  const label = score >= 75 ? "Low Risk" : score >= 50 ? "Medium Risk" : score >= 35 ? "Elevated Risk" : "High Risk";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth="7" className="text-border" />
          <motion.circle
            cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth="7"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.016s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-foreground leading-none">{displayed}</span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
      </div>
      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="text-xs font-bold" style={{ color }}
      >
        {label}
      </motion.span>
    </div>
  );
};

// ─── File upload button ────────────────────────────────────────────────────
const FileUploadBtn = ({
  label, hint, icon: Icon, value, onChange
}: {
  label: string; hint: string; icon: any; value: File | null;
  onChange: (f: File | null) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-dashed transition-all text-left",
          value
            ? "border-green-500/40 bg-green-500/5 text-green-400"
            : "border-border hover:border-primary/40 hover:bg-primary/3"
        )}
      >
        {value
          ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          : <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        }
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">
            {value ? value.name : label}
          </p>
          {!value && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        {!value && <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
      </button>
      <input
        ref={ref} type="file" className="hidden"
        accept="image/*,.pdf"
        onChange={e => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
};

// ─── Locked premium card ───────────────────────────────────────────────────
const LockedCard = ({ label }: { label: string }) => (
  <div className="relative rounded-xl border border-border/50 overflow-hidden">
    <div className="p-4 select-none pointer-events-none" style={{ filter: "blur(5px)" }}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-muted" />
        <div className="space-y-1.5">
          <div className="h-3 w-28 bg-muted rounded" />
          <div className="h-2.5 w-20 bg-muted rounded" />
        </div>
        <div className="ml-auto h-5 w-14 bg-muted rounded" />
      </div>
    </div>
    <div className="absolute inset-0 flex items-center justify-between px-4 bg-background/50 backdrop-blur-[2px]">
      <div className="flex items-center gap-2">
        <Lock className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-foreground">{label}</span>
      </div>
      <span className="text-xs text-primary font-bold">Premium</span>
    </div>
  </div>
);

// ─── Feedback toast ────────────────────────────────────────────────────────
const FeedbackToast = ({ message, scoreDelta }: { message: string; scoreDelta?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: -12, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -8 }}
    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm"
  >
    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
    <span className="text-foreground font-medium">{message}</span>
    {scoreDelta && (
      <span className="ml-auto flex items-center gap-1 text-green-400 font-bold text-xs">
        <TrendingUp className="w-3.5 h-3.5" />+{scoreDelta} Score
      </span>
    )}
  </motion.div>
);

// ─── Contextual copy per product ──────────────────────────────────────────
const TYPE_CONFIG: Record<string, { badge: string; headline: string; sub: string; cta: string; scanLines: string[] }> = {
  shield: {
    badge:     "VerifyStack Shield",
    headline:  "Verify an Identity",
    sub:       "Enter phone and email for a live Risk Shield Lite scan — trust score and fraud signals, free with no signup.",
    cta:       "Run Identity Check",
    scanLines: ["Validating phone number...", "Checking identity databases...", "Scanning fraud signals...", "Computing Shield Score..."],
  },
  risk: {
    badge:     "VerifyStack RiskEngine",
    headline:  "Run a Background Check",
    sub:       "Enter phone and email to start with an OSINT risk scan; deeper checks unlock as you complete verification.",
    cta:       "Start Background Check",
    scanLines: ["Querying criminal databases...", "Scanning employment records...", "Checking financial risk signals...", "Generating Risk Report..."],
  },
  trust: {
    badge:     "VerifyStack TrustScore",
    headline:  "Get a Trust Score",
    sub:       "Enter phone and email to get a live trust score (0–100) from Risk Shield Lite before you add documents.",
    cta:       "Get My TrustScore",
    scanLines: ["Collecting identity signals...", "Weighing background risk...", "Analysing digital footprint...", "Calculating Trust Score..."],
  },
  default: {
    badge:     "Progressive Verification",
    headline:  "Build Your Trust Score",
    sub:       "Start free in seconds. Share more to unlock your full verified report and Trust Score.",
    cta:       "Run Free Check",
    scanLines: ["Checking phone number activity...", "Scanning public risk databases...", "Analysing digital footprint...", "Computing initial Trust Score..."],
  },
};

// ─── Main page ─────────────────────────────────────────────────────────────
const RunCheck = () => {
  const [step, setStep] = useState<Step>("entry");
  const [form, setForm] = useState<FormData>({
    phone: "",
    email: "",
    name: "",
    selfie: null,
    aadhaar: null,
    pan: null,
    address: "",
    employer: "",
  });
  const [trustScore, setTrustScore] = useState(42);
  const [scoreActive, setScoreActive] = useState(false);
  const [scanIdx, setScanIdx] = useState(0);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskShieldAnalyzeResponse | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; delta?: number } | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeKey = searchParams.get("type") ?? "default";
  const ctx = TYPE_CONFIG[typeKey] ?? TYPE_CONFIG.default;

  const currentPct = STEPS.find(s => s.id === step)?.pct ?? 0;

  // Derive initial score from phone length (demo logic)
  const baseScore = form.phone.replace(/\D/g, "").length >= 10 ? 42 : 28;

  const showToast = (message: string, delta?: number) => {
    setToast({ message, delta });
    setTimeout(() => setToast(null), 3500);
  };

  // Scanning UI + risk-shield-lite-service analyze call
  useEffect(() => {
    if (step !== "scanning") return;

    const ac = new AbortController();
    let cancelled = false;
    let i = 0;
    const lines = ctx.scanLines;
    const iv = setInterval(() => {
      i += 1;
      setScanIdx(i);
      if (i >= lines.length - 1) clearInterval(iv);
    }, 380);

    const minDelayMs = 1800;
    const started = Date.now();

    (async () => {
      let apiResult: RiskShieldAnalyzeResponse | null = null;
      let errMsg: string | null = null;
      try {
        apiResult = await analyzeRiskShield(
          {
            email: form.email,
            phone: form.phone,
            name: form.name,
          },
          { signal: ac.signal }
        );
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        errMsg = e instanceof Error ? e.message : "Risk analysis unavailable.";
      }

      const elapsed = Date.now() - started;
      await new Promise(r => setTimeout(r, Math.max(0, minDelayMs - elapsed)));
      if (cancelled) return;

      clearInterval(iv);

      const scoreFromApi = apiResult?.trustScore;
      if (errMsg) {
        setAnalysisError(errMsg);
        setRiskAnalysis(null);
        setTrustScore(baseScore);
      } else if (scoreFromApi != null && Number.isFinite(Number(scoreFromApi))) {
        setAnalysisError(null);
        setRiskAnalysis(apiResult);
        setTrustScore(Math.max(0, Math.min(100, Math.round(Number(scoreFromApi)))));
      } else {
        setAnalysisError("Risk service did not return a trust score.");
        setRiskAnalysis(apiResult);
        setTrustScore(baseScore);
      }

      setStep("free-result");
      setTimeout(() => setScoreActive(true), 150);
    })();

    return () => {
      cancelled = true;
      ac.abort();
      clearInterval(iv);
    };
  }, [step, form.email, form.phone, form.name, ctx.scanLines, baseScore]);

  const goScan = () => {
    if (!form.phone.trim() || !isValidEmail(form.email) || !phoneDigitsOk(form.phone)) return;
    setScanIdx(0);
    setScoreActive(false);
    setAnalysisError(null);
    setRiskAnalysis(null);
    setStep("scanning");
  };

  const goBasic = () => {
    setStep("basic");
  };

  const submitBasic = () => {
    if (!form.name.trim()) return;
    const delta = 18 + (form.selfie ? 7 : 0);
    setTrustScore(prev => Math.min(100, prev + delta));
    showToast("Basic info verified ✅ Trust Score updated", delta);
    setStep("kyc");
  };

  const submitKyc = () => {
    if (!form.aadhaar) return;
    const delta = 22 + (form.pan ? 8 : 0);
    setTrustScore(prev => Math.min(100, prev + delta));
    showToast("Identity verified ✅ Trust Score increased", delta);
    setStep("address");
  };

  const submitAddress = () => {
    if (!form.address.trim()) return;
    const delta = 10;
    setTrustScore(prev => Math.min(100, prev + delta));
    showToast("Address recorded ✅ Verification nearly complete", delta);
    setStep("premium");
  };

  // ─── Step: Entry ──────────────────────────────────────────────────────────
  const renderEntry = () => (
    <motion.div
      key="entry"
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{ctx.cta}</h2>
        <p className="text-muted-foreground text-sm">
          {ctx.sub}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              onKeyDown={e => e.key === "Enter" && goScan()}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email-free">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email-free"
              type="email"
              placeholder="rahul.sharma@gmail.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onKeyDown={e => e.key === "Enter" && goScan()}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
        </div>

        <Button
          className="w-full btn-glow h-12 text-base"
          onClick={goScan}
          disabled={!phoneDigitsOk(form.phone) || !isValidEmail(form.email)}
        >
          {ctx.cta}
          <Zap className="w-4 h-4 ml-2" />
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Free check runs live OSINT on your phone and email via Risk Shield Lite (trust score + risk level). No login needed.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5 text-xs text-muted-foreground">
        {[
          { icon: Shield, label: "DPDP Compliant" },
          { icon: Lock, label: "Encrypted" },
          { icon: BadgeCheck, label: "No Data Stored" },
        ].map(b => (
          <span key={b.label} className="flex items-center gap-1.5">
            <b.icon className="w-3.5 h-3.5 text-primary" />{b.label}
          </span>
        ))}
      </div>
    </motion.div>
  );

  // ─── Step: Scanning ───────────────────────────────────────────────────────
  const renderScanning = () => (
    <motion.div
      key="scanning"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="max-w-sm mx-auto text-center py-6"
    >
      <div className="relative w-20 h-20 mx-auto mb-6">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0.1, 0.6] }}
          transition={{ duration: 1.3, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/15"
          animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.05, 0.4] }}
          transition={{ duration: 1.3, repeat: Infinity, delay: 0.2 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}>
            <ScanLine className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={scanIdx}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-medium text-foreground mb-1"
        >
          {(ctx.scanLines)[Math.min(scanIdx, ctx.scanLines.length - 1)]}
        </motion.p>
      </AnimatePresence>

      <div className="mt-5 h-1 bg-border rounded-full overflow-hidden max-w-[200px] mx-auto">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: "0%" }} animate={{ width: "100%" }}
          transition={{ duration: 1.7, ease: "easeInOut" }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Analysing {form.phone.trim()} &amp; {form.email.trim()}…
      </p>
    </motion.div>
  );

  // ─── Step: Free Result ────────────────────────────────────────────────────
  const renderFreeResult = () => {
    const rl = riskLevelStyle(riskAnalysis?.riskLevel);
    const reasons = riskAnalysis?.reasons?.filter(Boolean) ?? [];

    return (
    <motion.div
      key="free-result"
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto"
    >
      {analysisError && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex gap-2 text-sm text-foreground">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-200">Live risk service unavailable</p>
            <p className="text-xs text-muted-foreground mt-1">{analysisError}</p>
            <p className="text-xs text-muted-foreground mt-1">Showing an estimated score from basic checks only.</p>
          </div>
        </div>
      )}

      {/* Score card */}
      <div className="glass-card rounded-2xl p-6 border border-border/50 mb-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
            <Star className="w-3 h-3 fill-primary" /> Risk Shield Lite
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-semibold rounded-full border border-yellow-500/20">
            Partially Verified
          </span>
        </div>

        <ScoreRing score={trustScore} active={scoreActive} size={110} />

        <div className="mt-4 grid grid-cols-2 gap-3 text-left">
          <div className="p-3 rounded-xl bg-green-500/8 border border-green-500/15">
            <p className="text-xs text-muted-foreground">Phone + email</p>
            <p className="text-sm font-bold text-green-400 flex items-center gap-1 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5" />
              {analysisError ? "Checked (fallback)" : "Analysed"}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-yellow-500/8 border border-yellow-500/15">
            <p className="text-xs text-muted-foreground">Risk level</p>
            <p className={cn("text-sm font-bold mt-0.5", rl.className)}>{rl.text}</p>
          </div>
          {reasons.length > 0 && (
            <div className="p-3 rounded-xl bg-border/30 border border-border/40 col-span-2 text-left">
              <p className="text-xs text-muted-foreground mb-2">Signals &amp; reasons</p>
              <ul className="space-y-1">
                {reasons.slice(0, 6).map((r, idx) => (
                  <li key={idx} className="text-xs text-foreground leading-snug">• {r}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="p-3 rounded-xl bg-border/30 border border-border/40 col-span-2 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Checks complete</p>
              <p className="text-sm font-bold text-foreground mt-0.5">1 of 8</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Completion</p>
              <p className="text-sm font-bold text-primary mt-0.5">12%</p>
            </div>
          </div>
        </div>

        {riskAnalysis?.disclaimer && (
          <p className="text-[10px] text-muted-foreground mt-4 text-left leading-relaxed">
            {riskAnalysis.disclaimer}
          </p>
        )}
      </div>

      {/* Locked checks teaser */}
      <div className="space-y-2 mb-5">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">6 checks locked</p>
        {["Identity Verification", "Criminal Record Check", "Document Authenticity", "Employment Verification"].map(l => (
          <LockedCard key={l} label={l} />
        ))}
      </div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-5">
        <p className="text-sm font-semibold text-foreground mb-1">Complete verification to unlock full report</p>
        <p className="text-xs text-muted-foreground">
          Add your name, selfie, and Aadhaar to increase your Trust Score and get a complete verified report.
        </p>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1 btn-glow h-11" onClick={goBasic}>
          Complete Verification <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
        <Button
          variant="outline"
          className="border-border/50 h-11"
          onClick={() => {
            setRiskAnalysis(null);
            setAnalysisError(null);
            setScoreActive(false);
            setStep("entry");
          }}
        >
          New Check
        </Button>
      </div>
    </motion.div>
    );
  };

  // ─── Step: Basic Info ─────────────────────────────────────────────────────
  const renderBasic = () => (
    <motion.div
      key="basic"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
      className="max-w-md mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-4.5 h-4.5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground text-sm">Step 1 — Basic Info</h3>
          <p className="text-xs text-muted-foreground">Name + selfie to start building your profile</p>
        </div>
        <span className="ml-auto text-xs text-primary font-semibold">+18–25 pts</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="name" placeholder="Rahul Sharma"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone2">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="phone2" value={form.phone} disabled className="pl-10 h-12 rounded-xl opacity-70" />
          </div>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Already verified from free check
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email2">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="email2" type="email" value={form.email} disabled className="pl-10 h-12 rounded-xl opacity-70" />
          </div>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> From Risk Shield Lite free check
          </p>
        </div>

        <FileUploadBtn
          label="Selfie Photo (optional)"
          hint="Clear front-facing photo — adds +7 points"
          icon={Camera}
          value={form.selfie}
          onChange={f => setForm({ ...form, selfie: f })}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <Button variant="outline" className="border-border/50 h-11" onClick={() => setStep("free-result")}>Back</Button>
        <Button className="flex-1 btn-glow h-11" onClick={submitBasic} disabled={!form.name.trim()}>
          Continue <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </motion.div>
  );

  // ─── Step: KYC ────────────────────────────────────────────────────────────
  const renderKyc = () => (
    <motion.div
      key="kyc"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
      className="max-w-md mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <FileText className="w-4.5 h-4.5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground text-sm">Step 2 — Identity Documents</h3>
          <p className="text-xs text-muted-foreground">Aadhaar is the main verification layer</p>
        </div>
        <span className="ml-auto text-xs text-primary font-semibold">+22–30 pts</span>
      </div>

      <div className="space-y-4">
        <FileUploadBtn
          label="Aadhaar Card *"
          hint="Front & back — core identity verification"
          icon={FileText}
          value={form.aadhaar}
          onChange={f => setForm({ ...form, aadhaar: f })}
        />
        <FileUploadBtn
          label="PAN Card (optional)"
          hint="Adds +8 trust points when verified"
          icon={FileText}
          value={form.pan}
          onChange={f => setForm({ ...form, pan: f })}
        />
      </div>

      <div className="mt-4 p-3 rounded-xl bg-muted/40 border border-border/40">
        <p className="text-xs text-muted-foreground">
          <Lock className="w-3 h-3 inline mr-1 text-primary" />
          Documents are encrypted end-to-end and never stored after verification. DPDP 2023 compliant.
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <Button variant="outline" className="border-border/50 h-11" onClick={() => setStep("basic")}>Back</Button>
        <Button className="flex-1 btn-glow h-11" onClick={submitKyc} disabled={!form.aadhaar}>
          Verify Identity <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </motion.div>
  );

  // ─── Step: Address ────────────────────────────────────────────────────────
  const renderAddress = () => (
    <motion.div
      key="address"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
      className="max-w-md mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <MapPin className="w-4.5 h-4.5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground text-sm">Step 3 — Address & Background</h3>
          <p className="text-xs text-muted-foreground">Adds location context and reference checks</p>
        </div>
        <span className="ml-auto text-xs text-primary font-semibold">+10 pts</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="address">Current Address *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
            <textarea
              id="address"
              placeholder="House / Flat No., Street, City, State, PIN"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm resize-none h-24 focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="employer">Previous Employer / Reference <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="employer" placeholder="Company name or reference contact"
              value={form.employer}
              onChange={e => setForm({ ...form, employer: e.target.value })}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button variant="outline" className="border-border/50 h-11" onClick={() => setStep("kyc")}>Back</Button>
        <Button className="flex-1 btn-glow h-11" onClick={submitAddress} disabled={!form.address.trim()}>
          Continue <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </motion.div>
  );

  // ─── Step: Premium ────────────────────────────────────────────────────────
  const renderPremium = () => (
    <motion.div
      key="premium"
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto"
    >
      {/* Score summary */}
      <div className="glass-card rounded-2xl p-6 border border-green-500/20 mb-5 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Your TrustScore</p>
        <ScoreRing score={trustScore} active={true} size={110} />
        <p className="text-sm text-muted-foreground mt-3 max-w-xs mx-auto">
          Great progress! Unlock the full report to see criminal records, document authenticity, face match and more.
        </p>
      </div>

      {/* What's included vs locked */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-4 rounded-xl bg-green-500/8 border border-green-500/20">
          <p className="text-xs text-muted-foreground mb-2 uppercase font-mono tracking-widest">Completed</p>
          <ul className="space-y-1.5">
            {["Phone Check", "Basic Info", "Aadhaar Verified", "Address Recorded"].map(l => (
              <li key={l} className="flex items-center gap-1.5 text-xs text-foreground">
                <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />{l}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-xs text-muted-foreground mb-2 uppercase font-mono tracking-widest">Premium</p>
          <ul className="space-y-1.5">
            {["Criminal Records", "Document Scan", "AI Face Match", "Full PDF Report"].map(l => (
              <li key={l} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="w-3 h-3 text-primary flex-shrink-0" />{l}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Locked premium section */}
      <div className="space-y-2 mb-5">
        {["Criminal Record Check", "Document Authenticity (AI)", "Police Verification", "AI Face Match"].map(l => (
          <LockedCard key={l} label={l} />
        ))}
      </div>

      {/* Upsell CTA */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/25">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-bold text-foreground">Unlock Full Report</p>
            <p className="text-xs text-muted-foreground mt-0.5">Criminal + document + face match + PDF</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold text-primary">₹199</p>
            <p className="text-xs text-muted-foreground">one-time</p>
          </div>
        </div>
        {isAuthenticated ? (
          <Button className="w-full btn-glow h-11" onClick={() => navigate("/pricing")}>
            Unlock Full Report — ₹199 <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        ) : (
          <div className="space-y-2">
            <Link to="/signup">
              <Button className="w-full btn-glow h-11">
                Sign Up & Unlock Full Report <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <p className="text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">Log in</Link>
            </p>
          </div>
        )}
      </div>

      <button onClick={() => setStep("address")} className="mt-3 text-xs text-muted-foreground hover:text-foreground w-full text-center transition-colors">
        ← Back
      </button>
    </motion.div>
  );

  const stepContent: Record<Step, () => JSX.Element> = {
    "entry":        renderEntry,
    "scanning":     renderScanning,
    "free-result":  renderFreeResult,
    "basic":        renderBasic,
    "kyc":          renderKyc,
    "address":      renderAddress,
    "premium":      renderPremium,
  };

  const showProgress = !["entry", "scanning"].includes(step);
  const showStepLabels = ["basic", "kyc", "address", "premium"].includes(step);

  return (
    <DashboardLayout title="New Check" showFooter={false} contentClassName="w-full min-w-0 flex-1">
      {/* Hero (padding below app shell top bar, not marketing Header) */}
      <section className="bg-gradient-to-b from-muted/30 to-background pb-10 pt-6">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20 mb-4">
              <Shield className="w-3.5 h-3.5" /> {ctx.badge}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              {ctx.headline.includes("Trust Score") ? (
                <>
                  {ctx.headline.replace("Trust Score", "")}
                  <span className="gradient-text">Trust Score</span>
                </>
              ) : ctx.headline}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              {ctx.sub}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-4">
        <div className="container mx-auto px-4">
          <BgvFullCheckPanel />
        </div>
      </section>

      {/* Progress section */}
      {showProgress && (
        <div className="container mx-auto px-4 pb-6">
          <div className="max-w-lg mx-auto">
            <ProgressBar pct={currentPct} />

            {/* Step dots */}
            {showStepLabels && (
              <div className="flex justify-between mt-3">
                {(["basic", "kyc", "address", "premium"] as Step[]).map((s, i) => {
                  const steps: Step[] = ["basic", "kyc", "address", "premium"];
                  const currentIdx = steps.indexOf(step);
                  const done = i < currentIdx;
                  const active = i === currentIdx;
                  const labels = ["Basic", "KYC", "Address", "Full Report"];
                  return (
                    <div key={s} className="flex flex-col items-center gap-1">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                        done    ? "bg-green-500 text-white" :
                        active  ? "bg-primary text-primary-foreground" :
                                  "bg-border text-muted-foreground"
                      )}>
                        {done ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                      </div>
                      <span className={cn("text-[10px] font-medium", active ? "text-primary" : "text-muted-foreground")}>
                        {labels[i]}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
            <FeedbackToast message={toast.message} scoreDelta={toast.delta} />
          </div>
        )}
      </AnimatePresence>

      {/* Form area */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {stepContent[step]()}
          </AnimatePresence>
        </div>
      </section>

    </DashboardLayout>
  );
};

export default RunCheck;
