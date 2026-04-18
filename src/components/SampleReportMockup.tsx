import { ShieldCheck, CheckCircle2, AlertTriangle, Fingerprint, GraduationCap, Briefcase, MapPin } from "lucide-react";

interface SampleReportMockupProps {
  /** Optional name shown on the report subject row. */
  subjectName?: string;
  /** Verdict displayed in the trust badge. */
  verdict?: "Verified" | "Review" | "Flagged";
  className?: string;
}

/**
 * CSS-only verification report card mockup.
 * No images, no AI artifacts — pure tokens, looks "real" because it mirrors
 * the actual VerifyStack report structure.
 */
const SampleReportMockup = ({
  subjectName = "Aarav Sharma",
  verdict = "Verified",
  className = "",
}: SampleReportMockupProps) => {
  const verdictStyles = {
    Verified: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    Review: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    Flagged: "text-red-400 bg-red-500/10 border-red-500/30",
  }[verdict];

  const checks = [
    { icon: Fingerprint, label: "Aadhaar + PAN match", status: "ok" },
    { icon: GraduationCap, label: "Education (IIT Delhi, 2019)", status: "ok" },
    { icon: Briefcase, label: "Employment (Infosys · 3.4 yrs)", status: "ok" },
    { icon: MapPin, label: "Permanent address (Pune, MH)", status: "ok" },
    { icon: AlertTriangle, label: "Criminal record search", status: "warn" },
  ];

  return (
    <div
      className={`relative w-full max-w-[560px] rounded-2xl border border-border/50 bg-card/70 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden ${className}`}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border/40 bg-background/40">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        <span className="ml-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          verifystack.in / report / VS-2026-0418
        </span>
      </div>

      {/* Header */}
      <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Subject</p>
          <p className="text-base font-semibold text-foreground">{subjectName}</p>
        </div>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${verdictStyles}`}>
          <ShieldCheck className="w-3.5 h-3.5" />
          {verdict}
        </div>
      </div>

      {/* Trust score */}
      <div className="px-5 py-4 border-b border-border/40">
        <div className="flex items-end justify-between mb-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Trust Score</p>
          <p className="text-2xl font-extrabold gradient-text leading-none">87<span className="text-sm text-muted-foreground">/100</span></p>
        </div>
        <div className="h-1.5 w-full rounded-full bg-secondary/60 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: "87%" }} />
        </div>
      </div>

      {/* Checks */}
      <ul className="px-5 py-4 space-y-2.5">
        {checks.map((c, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <span className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <c.icon className="w-3.5 h-3.5 text-primary" />
            </span>
            <span className="flex-1 text-foreground/90">{c.label}</span>
            {c.status === "ok" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border/40 bg-background/30 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        <span>Generated · 18 Apr 2026 · IST</span>
        <span>DPDP 2023 ✓</span>
      </div>

      {/* Soft brand glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
    </div>
  );
};

export default SampleReportMockup;
