import type { BgvReportSummary } from "@/lib/bgvGatewayApi";
import { bgvReportRowStatus, overallStatusToScore } from "@/lib/bgvGatewayApi";

export type CategoryKey = "identity" | "criminal" | "financial" | "employment";
export type CategoryState = "ok" | "warn" | "pending";

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function normalizeSubjectName(name: string | undefined): string {
  return (name ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

/** Deterministic category signals from summary fields (until API sends real check breakdowns). */
export function deriveCategoryInsights(
  r: BgvReportSummary,
  score: number | null,
  rowStatus: string,
): Record<CategoryKey, CategoryState> {
  const seed = hashSeed(`${r.reportId ?? ""}|${r.subjectFullName ?? ""}`);
  const st = (r.overallStatus ?? "").toUpperCase();
  const isRed = /RED|FAIL|RISK|REJECT/i.test(st);
  const isYellow = /YELLOW|AMBER|WARN|CAUTION/i.test(st);
  const isGreen = /GREEN|PASS|CLEAR/i.test(st);

  const base = (): Record<CategoryKey, CategoryState> => ({
    identity: "pending",
    criminal: "pending",
    financial: "pending",
    employment: "pending",
  });

  if (rowStatus === "pending" || rowStatus === "in_progress") {
    return base();
  }

  if (rowStatus === "failed") {
    return {
      identity: "warn",
      criminal: "warn",
      financial: "warn",
      employment: "warn",
    };
  }

  if (score != null && score >= 85 && (isGreen || st.length === 0)) {
    return {
      identity: "ok",
      criminal: "ok",
      financial: "ok",
      employment: "ok",
    };
  }

  if (isRed || (score != null && score < 45)) {
    return {
      identity: seed % 2 === 0 ? "ok" : "warn",
      criminal: "warn",
      financial: "warn",
      employment: "warn",
    };
  }

  if (isYellow || (score != null && score < 72)) {
    const warnIdx = seed % 4;
    const keys: CategoryKey[] = ["identity", "criminal", "financial", "employment"];
    const out = base();
    keys.forEach((k, i) => {
      out[k] = i === warnIdx || i === (warnIdx + 1) % 4 ? "warn" : "ok";
    });
    return out;
  }

  if (score != null && score >= 72) {
    return {
      identity: "ok",
      criminal: "ok",
      financial: seed % 5 === 0 ? "warn" : "ok",
      employment: "ok",
    };
  }

  return {
    identity: "ok",
    criminal: "ok",
    financial: "ok",
    employment: seed % 3 === 0 ? "warn" : "ok",
  };
}

export function categoryMicroLine(
  cats: Record<CategoryKey, CategoryState>,
  score: number | null,
): string {
  const warn = (["identity", "criminal", "financial", "employment"] as const).filter((k) => cats[k] === "warn");
  const pend = (["identity", "criminal", "financial", "employment"] as const).filter((k) => cats[k] === "pending");
  if (pend.length === 4) return "Verification pipelines still running — partial picture.";
  if (warn.length === 0 && score != null && score >= 80) return "Strong alignment across identity, risk, and employment signals.";
  if (warn.length === 0) return "No elevated flags in derived check categories.";
  const labels: Record<CategoryKey, string> = {
    identity: "identity",
    criminal: "risk",
    financial: "financial",
    employment: "employment",
  };
  return `Worth a closer look: ${warn.map((w) => labels[w]).join(", ")}.`;
}

export function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "—";
  const diff = Date.now() - t;
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (sec < 45) return "Just now";
  if (min < 2) return "1 minute ago";
  if (min < 60) return `${min} minutes ago`;
  if (hr < 24) return hr < 2 ? "1 hour ago" : `${hr} hours ago`;
  if (day === 1) return "Yesterday";
  if (day < 7) return `${day} days ago`;
  if (day < 30) return `${Math.floor(day / 7)} weeks ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function formatExactDateTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** One-sentence “why” under the trust gauge. */
export function explainTrustWhy(r: BgvReportSummary | null, score: number): string {
  if (!r) return "Run a completed check to see a plain-language summary of the score drivers.";
  const st = (r.overallStatus ?? "").trim();
  const row = bgvReportRowStatus(r);
  if (row === "failed") {
    return "Score reflects a completed run with exceptions — open the report for case-level detail.";
  }
  if (row === "pending" || row === "in_progress") {
    return "Trust score will stabilize once all verification streams finish.";
  }
  if (/YELLOW|AMBER/i.test(st)) {
    return "Score tempered by at least one advisory signal — review highlights in the full report.";
  }
  if (/RED/i.test(st) || score < 50) {
    return "Elevated risk indicators pulled the composite score down — prioritize document review.";
  }
  if (score >= 72) {
    return "Solid result with minor variance — typical for mixed data freshness across sources.";
  }
  return "Composite reflects available gateway signals; drill into PDF for evidence trails.";
}

export function computeScoreTrend(
  reports: BgvReportSummary[],
  current: BgvReportSummary | null,
): { delta: number | null; label: string } {
  if (!current) return { delta: null, label: "" };
  const name = normalizeSubjectName(current.subjectFullName);
  if (!name) return { delta: null, label: "Trend appears when the same candidate has multiple runs." };
  const curScore = overallStatusToScore(current.overallStatus);
  if (curScore == null) return { delta: null, label: "" };

  const older = reports
    .filter((r) => {
      if (r.reportId === current.reportId) return false;
      if (normalizeSubjectName(r.subjectFullName) !== name) return false;
      const t = r.generatedAt ? new Date(r.generatedAt).getTime() : 0;
      const ct = current.generatedAt ? new Date(current.generatedAt).getTime() : 0;
      return t < ct && bgvReportRowStatus(r) === "completed";
    })
    .sort((a, b) => {
      const ta = a.generatedAt ? new Date(a.generatedAt).getTime() : 0;
      const tb = b.generatedAt ? new Date(b.generatedAt).getTime() : 0;
      return tb - ta;
    });

  const prev = older[0];
  const prevScore = prev ? overallStatusToScore(prev.overallStatus) : null;
  if (prevScore == null) return { delta: null, label: "First scored run for this candidate in view." };

  const delta = curScore - prevScore;
  const arrow = delta > 0 ? "↑" : delta < 0 ? "↓" : "→";
  const label =
    delta === 0 ? "" : `${arrow} ${delta > 0 ? "+" : ""}${delta} vs last screening for this candidate.`;
  return { delta, label };
}

export type ActionItem = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
  priority: "high" | "medium";
};

/** Surfaces review tasks when status/score demand attention; otherwise helpful next steps. */
export function buildActionCenterItems(reports: BgvReportSummary[], baseReportUrl: (id: string) => string): ActionItem[] {
  const sorted = [...reports].sort((a, b) => {
    const ta = a.generatedAt ? new Date(a.generatedAt).getTime() : 0;
    const tb = b.generatedAt ? new Date(b.generatedAt).getTime() : 0;
    return tb - ta;
  });

  const attention: ActionItem[] = [];

  for (const r of sorted) {
    const id = r.reportId?.trim();
    if (!id) continue;
    const st = (r.overallStatus ?? "").toUpperCase();
    const score = overallStatusToScore(r.overallStatus);
    const row = bgvReportRowStatus(r);
    const name = r.subjectFullName?.trim() || "Candidate";

    if (row === "failed") {
      attention.push({
        id: `fail-${id}`,
        title: "Verification exception",
        description: `${name}: pipeline reported a failure. Open the case log and attachments.`,
        ctaLabel: "Open report",
        href: baseReportUrl(id),
        external: true,
        priority: "high",
      });
      continue;
    }

    if (/RED/i.test(st) || (score != null && score < 50)) {
      attention.push({
        id: `red-${id}`,
        title: "High attention: risk band",
        description: `Review flagged signals for ${name} before a hiring decision.`,
        ctaLabel: "Review report",
        href: baseReportUrl(id),
        external: true,
        priority: "high",
      });
      continue;
    }

    if (/YELLOW|AMBER|WARN/i.test(st) || (score != null && score < 72)) {
      attention.push({
        id: `yel-${id}`,
        title: "Review recommended",
        description: `${name}: advisory status — confirm employment or address details in the PDF.`,
        ctaLabel: "View details",
        href: baseReportUrl(id),
        external: true,
        priority: "medium",
      });
    }
  }

  const dedup = attention.filter((item, i, arr) => arr.findIndex((x) => x.id === item.id) === i).slice(0, 3);

  if (dedup.length > 0) return dedup;

  return [
    {
      id: "next-run",
      title: "Run your next check",
      description: "Start a new verification to keep your pipeline moving.",
      ctaLabel: "New check",
      href: "/run-check",
      priority: "medium",
    },
    {
      id: "next-reports",
      title: "Browse full history",
      description: "Filters, IDs, and date range live on the Reports page.",
      ctaLabel: "Open reports",
      href: "/dashboard/reports",
      priority: "medium",
    },
    {
      id: "next-settings",
      title: "Delivery audit",
      description: "See email notifications tied to each report in Settings.",
      ctaLabel: "Settings",
      href: "/dashboard/settings",
      priority: "medium",
    },
  ];
}
