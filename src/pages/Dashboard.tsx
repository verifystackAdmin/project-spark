import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustScoreGauge from "@/components/TrustScoreGauge";
import { ActionCenter } from "@/components/dashboard/intelligence/ActionCenter";
import { ActivityHeatStrip } from "@/components/dashboard/intelligence/ActivityHeatStrip";
import { DashboardDropZone } from "@/components/dashboard/intelligence/DashboardDropZone";
import { IntelligenceFeed } from "@/components/dashboard/intelligence/IntelligenceFeed";
import { MetricInsightCard } from "@/components/dashboard/intelligence/MetricInsightCard";
import { MiniNetworkGraph } from "@/components/dashboard/intelligence/MiniNetworkGraph";
import { PipelineStatusPill } from "@/components/dashboard/intelligence/PipelineStatusPill";
import { GeometricAvatar } from "@/components/dashboard/intelligence/GeometricAvatar";
import { ReportCategoryStrip } from "@/components/dashboard/intelligence/ReportCategoryStrip";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { useBgvReports } from "@/hooks/useBgvReports";
import {
  buildIntelligenceSignals,
  dailyActivitySeries,
  dailyTrustAverageSeries,
  monthOverMonthChecks,
  trendVersusPrior30Days,
  trustScoreConfidence,
  weekHeatLevels,
} from "@/lib/dashboardIntelligence";
import {
  buildActionCenterItems,
  categoryMicroLine,
  computeScoreTrend,
  deriveCategoryInsights,
  explainTrustWhy,
  formatExactDateTime,
  formatRelativeTime,
} from "@/lib/dashboardNarrative";
import {
  bgvReportRowStatus,
  overallStatusToScore,
  bgvReportDownloadHref,
  bgvReportHtmlViewHref,
} from "@/lib/bgvGatewayApi";
import {
  Shield,
  Plus,
  FileText,
  Search,
  CreditCard,
  Clock,
  Download,
  Eye,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type DashboardLocationState = {
  bgvSubmitted?: boolean;
  reportId?: string;
};

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const bgvToastShown = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { reports, totalElements, loading: reportsLoading, error: reportsError } = useBgvReports(
    user?.email,
    { page: 0, pageSize: 100 },
  );

  const filteredReports = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter((r) => {
      const name = (r.subjectFullName ?? "").toLowerCase();
      const id = (r.reportId ?? "").toLowerCase();
      return name.includes(q) || id.includes(q);
    });
  }, [reports, searchQuery]);

  const intelSignals = useMemo(() => buildIntelligenceSignals(reports, 8), [reports]);
  const activitySpark = useMemo(() => dailyActivitySeries(reports), [reports]);
  const trustSpark = useMemo(() => dailyTrustAverageSeries(reports), [reports]);
  const heatLevels = useMemo(() => weekHeatLevels(reports), [reports]);
  const trend30 = useMemo(() => trendVersusPrior30Days(reports), [reports]);
  const mom = useMemo(() => monthOverMonthChecks(reports), [reports]);

  useEffect(() => {
    const st = location.state as DashboardLocationState | null;
    if (!st?.bgvSubmitted || !st?.reportId) {
      bgvToastShown.current = false;
      return;
    }
    if (bgvToastShown.current) return;
    bgvToastShown.current = true;
    toast({
      title: "BGV report submitted",
      description: (
        <span className="block pt-1">
          <span className="text-muted-foreground">Report ID</span>{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{st.reportId}</code>
        </span>
      ),
    });
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate, toast]);

  const stats = useMemo(() => {
    const now = new Date();
    const ym = `${now.getFullYear()}-${now.getMonth()}`;
    const thisMonth = reports.filter((r) => {
      if (!r.generatedAt) return false;
      const d = new Date(r.generatedAt);
      return `${d.getFullYear()}-${d.getMonth()}` === ym;
    }).length;
    const scores = reports
      .map((r) => overallStatusToScore(r.overallStatus))
      .filter((n): n is number => n != null);
    const avg =
      scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
    return {
      total: totalElements > 0 ? totalElements : reports.length,
      thisMonth,
      avg,
    };
  }, [reports, totalElements]);

  const recentSlice = useMemo(() => filteredReports.slice(0, 5), [filteredReports]);

  const latestCompleted = useMemo(() => {
    for (const r of reports) {
      if (bgvReportRowStatus(r) === "completed" && r.overallStatus) return r;
    }
    return reports[0] ?? null;
  }, [reports]);

  const latestGaugeScore = overallStatusToScore(latestCompleted?.overallStatus) ?? 0;
  const confidence = trustScoreConfidence(latestCompleted, latestGaugeScore);
  const netEmphasis =
    latestGaugeScore >= 80 ? "high" : latestGaugeScore > 0 && latestGaugeScore < 60 ? "low" : "medium";

  const trustWhy = explainTrustWhy(latestCompleted, latestGaugeScore);
  const scoreTrend = computeScoreTrend(reports, latestCompleted);

  const actionItems = useMemo(
    () => buildActionCenterItems(reports, (id) => bgvReportHtmlViewHref(id)),
    [reports],
  );

  const pipelinesOk = !reportsError;

  return (
    <DashboardLayout
      title="Dashboard"
      showFooter={false}
      contentClassName="relative isolate z-0 min-w-0 w-full max-w-[1600px] px-3 py-4 sm:px-6 sm:py-6"
      headerLeading={
        <div className="relative w-full min-w-0 md:max-w-lg">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:h-5 sm:w-5"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Search by name or report ID…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full min-w-0 rounded-xl border-border/60 bg-muted/80 pl-9 pr-3 text-sm shadow-sm transition-colors focus-visible:bg-background sm:h-11 sm:pl-10"
            aria-label="Search reports by subject name or report ID"
          />
        </div>
      }
      headerTrailing={<PipelineStatusPill connected={pipelinesOk} />}
    >
      {/* Ambient mesh (scoped to this page, not fixed — avoids stacking glitches) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="animate-dashboard-mesh absolute -left-1/4 top-0 h-[60vh] w-[70vw] rounded-full bg-gradient-to-br from-primary/15 via-transparent to-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[50vh] w-[55vw] rounded-full bg-gradient-to-tl from-[hsl(var(--electric-purple)/0.12)] to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Hero + quick drop */}
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_minmax(260px,340px)] lg:items-stretch lg:gap-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-card/90 via-card/80 to-primary/10 p-4 shadow-lg shadow-primary/5 backdrop-blur-xl sm:p-6">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl animate-dashboard-mesh"
              aria-hidden
            />
            <p className="relative mb-1 text-xs font-semibold uppercase tracking-wider text-primary/90">
              Trust intelligence
            </p>
            <h1 className="relative text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back, {user?.name || user?.email?.split("@")[0] || "there"}
            </h1>
            <p className="relative mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              Live signals, document graph, and confidence-aware scoring — your command center for background
              verification.
            </p>
            {reportsError && (
              <p className="relative mt-3 text-sm text-amber-600 dark:text-amber-500">
                Could not load live reports ({reportsError}). Try refreshing or check your connection.
              </p>
            )}
          </div>
          <DashboardDropZone className="relative z-[1] lg:min-h-[160px]" />
        </div>

        {/* Metrics — glass + sparklines + tooltips */}
        <div className="mb-8 grid min-w-0 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricInsightCard
            label="Total checks"
            value={reportsLoading ? "…" : String(stats.total)}
            icon={FileText}
            iconClassName="text-primary"
            sparklineValues={activitySpark}
            sparkTone="primary"
            tooltip={trend30.label}
            glow={stats.total > 0}
          />
          <MetricInsightCard
            label="This month"
            value={reportsLoading ? "…" : String(stats.thisMonth)}
            icon={Clock}
            iconClassName="text-accent"
            sparklineValues={activitySpark}
            sparkTone="accent"
            tooltip={mom.label}
          />
          <MetricInsightCard
            label="Avg. trust score"
            value={reportsLoading ? "…" : stats.avg != null ? String(stats.avg) : "—"}
            icon={Shield}
            iconClassName="text-[hsl(var(--trust-green))]"
            sparklineValues={trustSpark.some((n) => n > 0) ? trustSpark : activitySpark}
            sparkTone="trust"
            tooltip={
              stats.avg != null
                ? `Rolling daily average from loaded reports. ${trend30.label}`
                : "Complete checks to compute a trust average."
            }
            glow={stats.avg != null && stats.avg >= 80}
          />
          <MetricInsightCard
            label="Credits left"
            value="—"
            icon={CreditCard}
            iconClassName="text-[hsl(var(--warning-amber))]"
            sparklineValues={activitySpark.map(() => 0)}
            sparkTone="warning"
            tooltip="Quota comes from your active plan — open Payments to manage billing."
          />
        </div>

        {/* Asymmetric main: intelligence + list | trust snapshot */}
        <div className="grid min-w-0 gap-6 xl:grid-cols-12 xl:items-start">
          <div className="min-w-0 space-y-6 xl:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/50 p-4 shadow-md backdrop-blur-md sm:p-5">
              <IntelligenceFeed signals={intelSignals} />
            </div>

            <div className="min-w-0 overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm ring-1 ring-border/40 backdrop-blur-sm sm:p-6">
              <div className="mb-5 flex flex-col gap-4 border-b border-border/50 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0 space-y-1">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">Recent reports</h2>
                  <p className="text-sm text-muted-foreground">
                    {reportsLoading
                      ? "Loading…"
                      : searchQuery.trim()
                        ? `${recentSlice.length} listed · ${filteredReports.length} match your search`
                        : `Up to 5 most recent · ${stats.total} total in your account`}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                    <Link to="/dashboard/reports" className="inline-flex items-center gap-1">
                      View all
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </Button>
                  <Link to="/run-check" className="shrink-0">
                    <Button variant="default" size="sm" className="w-full sm:w-auto">
                      <Plus className="h-4 w-4" />
                      New check
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {reportsLoading && (
                  <p className="py-10 text-center text-sm text-muted-foreground">Loading reports…</p>
                )}
                {!reportsLoading && recentSlice.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border/70 bg-muted/30 px-4 py-10 text-center">
                    <p className="text-sm text-muted-foreground">
                      {searchQuery.trim()
                        ? "No reports match your search. Try another name or ID."
                        : "No reports yet. Start your first verification to see trust scores here."}
                    </p>
                    {!searchQuery.trim() && (
                      <Button className="mt-4" asChild>
                        <Link to="/run-check">Run a check</Link>
                      </Button>
                    )}
                  </div>
                )}
                {!reportsLoading &&
                  recentSlice.map((report) => {
                    const id = report.reportId ?? "";
                    const name = report.subjectFullName || "Subject";
                    const rowStatus = bgvReportRowStatus(report);
                    const score = overallStatusToScore(report.overallStatus);
                    const avatarSeed = `${id}|${name}`;
                    const cats = deriveCategoryInsights(report, score, rowStatus);
                    const story = categoryMicroLine(cats, score);
                    return (
                      <div
                        key={id || name}
                        className="group rounded-xl border border-transparent bg-muted/40 p-4 transition-all hover:border-primary/20 hover:bg-muted/60"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                          <GeometricAvatar seed={avatarSeed} photoUrl={report.subjectPhotoUrl} size={52} className="sm:mt-0.5" />
                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <h3 className="truncate text-base font-semibold text-foreground">{name}</h3>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="shrink-0 cursor-default text-xs text-muted-foreground">
                                    {formatRelativeTime(report.generatedAt)}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-xs">
                                  {formatExactDateTime(report.generatedAt)}
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium text-foreground/90">BGV</span>
                              <span className="mx-1.5 text-border">·</span>
                              <span>{report.overallStatus ?? report.status ?? "—"}</span>
                            </p>
                            <ReportCategoryStrip categories={cats} />
                            <p className="text-xs leading-relaxed text-muted-foreground">{story}</p>
                          </div>
                          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                            {rowStatus === "completed" && score != null ? (
                              <>
                                <div
                                  className={cn(
                                    "self-end rounded-full px-3 py-1 font-mono text-sm font-semibold tabular-nums",
                                    score >= 80
                                      ? "bg-trust/10 text-trust"
                                      : score >= 60
                                        ? "bg-accent/10 text-accent"
                                        : "bg-warning/10 text-warning",
                                  )}
                                >
                                  {score}
                                </div>
                                {id ? (
                                  <div className="flex justify-end gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                      <a
                                        href={bgvReportHtmlViewHref(id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="View report"
                                      >
                                        <Eye className="h-4 w-4" />
                                      </a>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                      <a
                                        href={bgvReportDownloadHref(id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Download PDF"
                                      >
                                        <Download className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </div>
                                ) : null}
                              </>
                            ) : rowStatus === "failed" ? (
                              <span className="text-sm text-destructive">Failed</span>
                            ) : (
                              <span className="animate-pulse text-sm text-muted-foreground">Processing…</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Trust snapshot — wider, layered */}
          <div
            className={cn(
              "min-w-0 space-y-5 xl:col-span-5",
              "relative z-[2] rounded-2xl border border-white/10 bg-card/70 p-4 shadow-xl backdrop-blur-xl sm:p-6",
              latestGaugeScore >= 85 && "animate-trust-glow",
            )}
          >
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Trust snapshot</h2>
              <p className="mt-1 text-sm text-muted-foreground">Latest graph + score confidence</p>
            </div>

            <MiniNetworkGraph emphasis={netEmphasis} />

            <div className="flex justify-center py-1">
              <TrustScoreGauge
                score={latestGaugeScore || 0}
                size="md"
                caption={trustWhy}
                trendHint={scoreTrend.label || undefined}
              />
            </div>

            <div className="space-y-2 px-1">
              <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>Model confidence</span>
                <span className="font-mono tabular-nums text-foreground">{confidence.pct}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-[hsl(var(--trust-green))] transition-all duration-700"
                  style={{ width: `${confidence.pct}%` }}
                />
              </div>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">{confidence.label}</p>
            </div>

            <ActivityHeatStrip levels={heatLevels} className="px-1" />

            <p className="text-center text-sm text-muted-foreground">
              {latestCompleted?.overallStatus ? (
                <>
                  Latest status:{" "}
                  <span className="font-medium text-foreground">{latestCompleted.overallStatus}</span>
                </>
              ) : (
                "Complete a check to see your trust score here."
              )}
            </p>

            <div className="border-t border-border/50 pt-4">
              <ActionCenter items={actionItems} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
