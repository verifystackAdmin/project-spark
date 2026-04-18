import type { BgvReportSummary } from "@/lib/bgvGatewayApi";
import { bgvReportRowStatus, overallStatusToScore } from "@/lib/bgvGatewayApi";

export type IntelligenceSeverity = "critical" | "warning" | "info" | "success";

export type IntelligenceSignal = {
  id: string;
  severity: IntelligenceSeverity;
  title: string;
  detail: string;
  at: string;
  reportId?: string;
};

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Last 30 days (oldest → newest), local calendar days. */
export function dailyActivitySeries(reports: BgvReportSummary[]): number[] {
  const counts = new Map<string, number>();
  for (const r of reports) {
    if (!r.generatedAt) continue;
    const t = new Date(r.generatedAt);
    if (Number.isNaN(t.getTime())) continue;
    const k = dayKey(t);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  const out: number[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    out.push(counts.get(dayKey(d)) ?? 0);
  }
  return out;
}

/** Average trust score per day (last 30d); days with no reports → 0 for sparkline baseline. */
export function dailyTrustAverageSeries(reports: BgvReportSummary[]): number[] {
  const sums = new Map<string, { sum: number; n: number }>();
  for (const r of reports) {
    if (!r.generatedAt) continue;
    const t = new Date(r.generatedAt);
    if (Number.isNaN(t.getTime())) continue;
    const sc = overallStatusToScore(r.overallStatus);
    if (sc == null) continue;
    const k = dayKey(t);
    const cur = sums.get(k) ?? { sum: 0, n: 0 };
    cur.sum += sc;
    cur.n += 1;
    sums.set(k, cur);
  }
  const today = new Date();
  const out: number[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const k = dayKey(d);
    const row = sums.get(k);
    out.push(row && row.n > 0 ? Math.round(row.sum / row.n) : 0);
  }
  return out;
}

/** Intensity per day for last 7 days (Mon–Sun style rolling window: today-6 .. today). */
export function weekHeatLevels(reports: BgvReportSummary[]): number[] {
  const counts = dailyActivitySeries(reports);
  const last7 = counts.slice(-7);
  const max = Math.max(1, ...last7);
  return last7.map((n) => n / max);
}

/** Compare last 30d vs previous 30d report counts (loaded data only). */
export function trendVersusPrior30Days(reports: BgvReportSummary[]): { deltaPct: number | null; label: string } {
  const now = new Date();
  const msDay = 86400000;
  const t0 = now.getTime();
  let a = 0;
  let b = 0;
  for (const r of reports) {
    if (!r.generatedAt) continue;
    const t = new Date(r.generatedAt).getTime();
    if (Number.isNaN(t)) continue;
    const age = (t0 - t) / msDay;
    if (age >= 0 && age < 30) a += 1;
    else if (age >= 30 && age < 60) b += 1;
  }
  if (b === 0 && a === 0) return { deltaPct: null, label: "Not enough history in this session to compare periods." };
  if (b === 0) return { deltaPct: 100, label: "First activity in the last 30 days vs prior window." };
  const deltaPct = Math.round(((a - b) / b) * 100);
  const arrow = deltaPct >= 0 ? "↑" : "↓";
  return {
    deltaPct,
    label: `${arrow} ${Math.abs(deltaPct)}% vs prior 30 days (from loaded reports).`,
  };
}

export function monthOverMonthChecks(reports: BgvReportSummary[]): { deltaPct: number | null; label: string } {
  const now = new Date();
  const thisYm = `${now.getFullYear()}-${now.getMonth()}`;
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastYm = `${prev.getFullYear()}-${prev.getMonth()}`;
  let thisC = 0;
  let lastC = 0;
  for (const r of reports) {
    if (!r.generatedAt) continue;
    const d = new Date(r.generatedAt);
    if (Number.isNaN(d.getTime())) continue;
    const ym = `${d.getFullYear()}-${d.getMonth()}`;
    if (ym === thisYm) thisC += 1;
    else if (ym === lastYm) lastC += 1;
  }
  if (lastC === 0 && thisC === 0) return { deltaPct: null, label: "No checks in this or last month in loaded data." };
  if (lastC === 0) return { deltaPct: null, label: `${thisC} checks this month (no prior month in loaded data).` };
  const deltaPct = Math.round(((thisC - lastC) / lastC) * 100);
  const arrow = deltaPct >= 0 ? "↑" : "↓";
  return {
    deltaPct,
    label: `${arrow} ${Math.abs(deltaPct)}% vs last month (same calendar month window).`,
  };
}

export function trustScoreConfidence(r: BgvReportSummary | null, score: number): { pct: number; label: string } {
  if (!r) {
    return { pct: 0, label: "No completed report to score." };
  }
  const row = bgvReportRowStatus(r);
  if (row === "failed") {
    return { pct: 78, label: "Outcome verified; pipeline completed with exceptions." };
  }
  if (row === "pending" || row === "in_progress") {
    return { pct: 48, label: "Partial data — verification still running." };
  }
  if (row === "completed") {
    const hasScore = overallStatusToScore(r.overallStatus) != null;
    const hasStatus = Boolean(r.overallStatus?.trim());
    if (hasScore && hasStatus) {
      return { pct: Math.min(99, 88 + (score >= 80 ? 8 : score >= 60 ? 4 : 0)), label: "High confidence — full status + score from gateway." };
    }
    if (hasStatus) {
      return { pct: 76, label: "Good — overall status present; score derived where available." };
    }
    return { pct: 62, label: "Moderate — completed with limited summary fields." };
  }
  return { pct: 55, label: "Estimated from available fields." };
}

export function buildIntelligenceSignals(reports: BgvReportSummary[], limit = 8): IntelligenceSignal[] {
  const sorted = [...reports].sort((a, b) => {
    const ta = a.generatedAt ? new Date(a.generatedAt).getTime() : 0;
    const tb = b.generatedAt ? new Date(b.generatedAt).getTime() : 0;
    return tb - ta;
  });

  const out: IntelligenceSignal[] = [];
  const seen = new Set<string>();

  for (const r of sorted) {
    if (out.length >= limit) break;
    const id = r.reportId ?? "";
    const name = r.subjectFullName?.trim() || "Subject";
    const key = id || name + (r.generatedAt ?? "");
    if (seen.has(key)) continue;
    seen.add(key);

    const row = bgvReportRowStatus(r);
    const score = overallStatusToScore(r.overallStatus);
    const st = r.overallStatus ?? r.status ?? "";

    if (row === "failed") {
      out.push({
        id: `fail-${key}`,
        severity: "critical",
        title: "Verification exception",
        detail: `${name}: pipeline reported a failure. Open the report for details.`,
        at: r.generatedAt ?? new Date().toISOString(),
        reportId: id || undefined,
      });
      continue;
    }

    if (score != null && score < 50) {
      out.push({
        id: `risk-${key}`,
        severity: "critical",
        title: "High-risk signal",
        detail: `${name}: trust score ${score} — review sources and documents.`,
        at: r.generatedAt ?? new Date().toISOString(),
        reportId: id || undefined,
      });
      continue;
    }

    if (score != null && score < 72) {
      out.push({
        id: `watch-${key}`,
        severity: "warning",
        title: "Elevated review",
        detail: `${name}: score ${score} — consider secondary confirmation.`,
        at: r.generatedAt ?? new Date().toISOString(),
        reportId: id || undefined,
      });
      continue;
    }

    if (row === "pending" || row === "in_progress") {
      out.push({
        id: `pipe-${key}`,
        severity: "info",
        title: "Pipeline active",
        detail: `${name}: checks in progress — results will appear when complete.`,
        at: r.generatedAt ?? new Date().toISOString(),
        reportId: id || undefined,
      });
      continue;
    }

    if (row === "completed" && score != null && score >= 85 && /green/i.test(st)) {
      out.push({
        id: `ok-${key}`,
        severity: "success",
        title: "Strong trust alignment",
        detail: `${name}: score ${score} · ${st}`,
        at: r.generatedAt ?? new Date().toISOString(),
        reportId: id || undefined,
      });
      continue;
    }

    if (row === "completed") {
      out.push({
        id: `done-${key}`,
        severity: "info",
        title: "Report ready",
        detail: `${name}: ${st || "Completed"}`,
        at: r.generatedAt ?? new Date().toISOString(),
        reportId: id || undefined,
      });
    }
  }

  if (out.length === 0 && reports.length === 0) {
    out.push({
      id: "empty",
      severity: "info",
      title: "Intelligence idle",
      detail: "Run a check to populate live signals and anomaly detection.",
      at: new Date().toISOString(),
    });
  } else if (out.length === 0 && reports.length > 0) {
    out.push({
      id: "sync",
      severity: "info",
      title: "Signals clear",
      detail: `${reports.length} report(s) synced — no elevated-risk patterns in derived signals.`,
      at: new Date().toISOString(),
    });
  }

  return out.slice(0, limit);
}
