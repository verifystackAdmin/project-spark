import { useRef } from "react";
import {
  Shield, CheckCircle, AlertTriangle, Download, Printer,
  FileText, Lock, MapPin, Fingerprint, Briefcase, GraduationCap,
  Clock, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const REPORT = {
  id: "VS-2026-00847",
  generatedAt: "21 March 2026, 11:42 AM IST",
  subject: {
    name: "Rahul K.",
    phone: "+91 98•••• 1234",
    dob: "••/••/199•",
    address: "Pune, Maharashtra, India",
  },
  trustScore: 87,
  riskLevel: "Low",
  status: "Cleared",
  checks: [
    { label: "Identity Match",         score: 95, status: "pass", detail: "Verified via Aadhaar & PAN — no tampering detected" },
    { label: "Document Authenticity",  score: 97, status: "pass", detail: "Aadhaar and PAN scanned — no forgery signals" },
    { label: "Criminal Record Check",  score: 100, status: "pass", detail: "Clear across district, state, and national databases" },
    { label: "Address Verification",   score: 88, status: "pass", detail: "Cross-verified via postal API and utility records" },
    { label: "Employment History",     score: 91, status: "pass", detail: "Confirmed via EPFO records and employer callback" },
    { label: "Education Verification", score: 89, status: "pass", detail: "Degree verified with issuing institution" },
    { label: "Face Match (Selfie)",    score: 91, status: "pass", detail: "Selfie matched to ID photo with 91% confidence" },
    { label: "Fraud Signals",          score: 100, status: "pass", detail: "Zero fraud indicators across all databases" },
    { label: "Social Footprint",       score: 72, status: "warn", detail: "Limited presence — 2 of 5 platforms verified" },
    { label: "Financial Risk",         score: 79, status: "pass", detail: "No default or credit risk signals detected" },
  ],
  summary: "Subject has passed all primary verification checks with a Trust Score of 87/100. One minor caution: limited social media presence. Overall risk profile is LOW. Recommended for onboarding.",
};

const ScoreGauge = ({ score }: { score: number }) => {
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center border-4"
        style={{ borderColor: color, background: `${color}15` }}
      >
        <span className="text-4xl font-extrabold" style={{ color }}>{score}</span>
      </div>
      <p className="text-sm font-semibold mt-2" style={{ color }}>Trust Score</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">out of 100</p>
    </div>
  );
};

const SampleReportPage = () => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => window.print();

  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .print-page { background: white !important; color: black !important; box-shadow: none !important; border: none !important; }
          .print-border { border-color: #e5e7eb !important; }
          @page { margin: 12mm; size: A4; }
        }
      `}</style>

      <div className="min-h-screen bg-background py-10 px-4">

        {/* Top action bar — hidden when printing */}
        <div className="no-print max-w-3xl mx-auto mb-6 flex items-center justify-between gap-4 flex-wrap">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to VerifyStack
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handlePrint}>
              <Printer className="w-4 h-4" /> Print / Save as PDF
            </Button>
            <Button size="sm" className="gap-2 btn-glow" onClick={handlePrint}>
              <Download className="w-4 h-4" /> Download PDF
            </Button>
          </div>
        </div>

        {/* ── Report Card ── */}
        <div
          ref={reportRef}
          className="print-page max-w-3xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
        >

          {/* Header strip */}
          <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-5 h-5" />
                  <span className="font-bold text-lg tracking-tight">VerifyStack AI Report</span>
                </div>
                <p className="text-white/70 text-xs font-mono">Report #{REPORT.id}</p>
                <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Generated: {REPORT.generatedAt}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-semibold">
                  <Lock className="w-3 h-3" /> Encrypted & Verified
                </span>
                <p className="text-white/60 text-[11px] mt-1.5 font-mono">DPDP 2023 Compliant</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">

            {/* Subject info + Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b print-border border-border/50">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-3">Subject Details</p>
                {[
                  { icon: Fingerprint, label: "Name",    value: REPORT.subject.name },
                  { icon: FileText,    label: "Phone",   value: REPORT.subject.phone },
                  { icon: Clock,       label: "DOB",     value: REPORT.subject.dob },
                  { icon: MapPin,      label: "Address", value: REPORT.subject.address },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-2 text-sm">
                    <r.icon className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                    <span className="text-muted-foreground w-16">{r.label}:</span>
                    <span className="text-foreground font-medium">{r.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-3 sm:items-end">
                <ScoreGauge score={REPORT.trustScore} />
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold border border-green-500/20">
                  <CheckCircle className="w-3.5 h-3.5" /> {REPORT.status} · {REPORT.riskLevel} Risk
                </span>
              </div>
            </div>

            {/* Verification Checks */}
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">Verification Check Results</p>
              <div className="space-y-2.5">
                {REPORT.checks.map((check) => (
                  <div
                    key={check.label}
                    className="flex items-start gap-3 p-3 rounded-xl border print-border border-border/40 bg-secondary/20"
                  >
                    <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${check.status === "pass" ? "bg-green-500/15" : "bg-yellow-500/15"}`}>
                      {check.status === "pass"
                        ? <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                        : <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <span className="text-sm font-semibold text-foreground">{check.label}</span>
                        <span className={`text-xs font-mono font-bold flex-shrink-0 ${check.status === "pass" ? "text-green-400" : "text-yellow-400"}`}>
                          {check.score}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mb-1.5">
                        <div
                          className={`h-full rounded-full ${check.status === "pass" ? "bg-green-500" : "bg-yellow-500"}`}
                          style={{ width: `${check.score}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{check.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Summary */}
            <div className="rounded-xl border print-border border-primary/30 bg-primary/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground">AI Analyst Summary</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{REPORT.summary}</p>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Fingerprint, label: "Checks Run",       value: `${REPORT.checks.length}` },
                { icon: Briefcase,   label: "Data Sources",     value: "18+" },
                { icon: GraduationCap, label: "AI Confidence",  value: "91%" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border print-border border-border/40 bg-secondary/20 p-4 text-center">
                  <s.icon className="w-4 h-4 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Footer disclaimer */}
            <div className="border-t print-border border-border/40 pt-5 text-center space-y-1">
              <p className="text-[11px] text-muted-foreground font-mono">
                This report is AI-generated and should be used alongside human judgment.
                Data processed under India DPDP Act 2023. AES-256 encrypted.
              </p>
              <p className="text-[11px] text-muted-foreground font-mono">
                © 2026 VerifyStack LLP · support@verifystack.in · verifystack.in
              </p>
            </div>

          </div>
        </div>

        {/* Bottom CTA — hidden when printing */}
        <div className="no-print max-w-3xl mx-auto mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            This is a sample report. Run a real verification to get a full AI-powered Trust Score report.
          </p>
          <Link to="/run-check">
            <Button size="lg" className="btn-glow">Run a Real Verification</Button>
          </Link>
        </div>

      </div>
    </>
  );
};

export default SampleReportPage;
