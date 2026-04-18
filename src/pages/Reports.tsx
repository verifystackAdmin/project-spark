import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search, Filter, Download, Eye, Calendar, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useBgvReports } from "@/hooks/useBgvReports";
import { useToast } from "@/hooks/use-toast";
import {
  bgvReportRowStatus,
  overallStatusToScore,
  bgvReportDownloadHref,
  bgvReportHtmlViewHref,
} from "@/lib/bgvGatewayApi";

type SortByTime = "newest" | "oldest";

type ReportsLocationState = {
  bgvSubmitted?: boolean;
  reportId?: string;
};

const REPORTS_PAGE_SIZE = 10;

const Reports = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const bgvToastShown = useRef(false);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterReportId, setFilterReportId] = useState("");
  const [debouncedReportId, setDebouncedReportId] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortByTime, setSortByTime] = useState<SortByTime>("newest");

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedSearch(searchQuery.trim()), 400);
    return () => window.clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedReportId(filterReportId.trim()), 400);
    return () => window.clearTimeout(t);
  }, [filterReportId]);

  const sortDir = sortByTime === "newest" ? "desc" : "asc";
  const statusParam = statusFilter !== "all" ? statusFilter : undefined;

  const { reports, totalElements, totalPages, loading, error, refetch } = useBgvReports(user?.email, {
    page,
    pageSize: REPORTS_PAGE_SIZE,
    sortDir,
    q: debouncedSearch || undefined,
    status: statusParam,
    reportId: debouncedReportId || undefined,
    startDate: dateFrom.trim() || undefined,
    endDate: dateTo.trim() || undefined,
  });

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, debouncedReportId, dateFrom, dateTo, statusFilter, sortByTime]);

  useEffect(() => {
    const st = location.state as ReportsLocationState | null;
    if (!st?.bgvSubmitted || !st?.reportId) {
      bgvToastShown.current = false;
      return;
    }
    if (bgvToastShown.current) return;
    bgvToastShown.current = true;
    setPage(0);
    setStatusFilter("pending");
    void refetch({ silent: true });
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
  }, [location.pathname, location.state, navigate, refetch, toast]);

  const hasIncomplete = useMemo(
    () =>
      reports.some((r) => {
        const s = bgvReportRowStatus(r);
        return s === "pending" || s === "in_progress";
      }),
    [reports],
  );

  useEffect(() => {
    if (!user?.email?.trim()) return;
    const ms = hasIncomplete ? 4000 : 30_000;
    const id = window.setInterval(() => {
      void refetch({ silent: true });
    }, ms);
    return () => window.clearInterval(id);
  }, [user?.email, refetch, hasIncomplete]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const rows = useMemo(() => {
    return reports.map((r) => {
      const id = r.reportId ?? "";
      return {
        id,
        subjectName: r.subjectFullName ?? "—",
        verificationType: "BGV",
        status: bgvReportRowStatus(r),
        trustScore: overallStatusToScore(r.overallStatus),
        createdAt: r.generatedAt ?? null,
        overallStatus: r.overallStatus,
        apiStatus: r.status,
      };
    });
  }, [reports]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTrustScoreColor = (score: number | null) => {
    if (score === null) return "text-muted-foreground";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <DashboardLayout
      title="Verification Reports"
      contentClassName="min-w-0 w-full max-w-6xl mx-auto px-3 py-4 sm:px-6 sm:py-6"
      showFooter={false}
      headerLeadingLayout="beside-title"
      headerLeading={
        <div className="relative w-full min-w-0 md:max-w-md md:flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            id="reports-search"
            placeholder="Search by name or report ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            aria-label="Search reports by subject name or report ID"
          />
        </div>
      }
      headerTrailing={
        <>
          <Button variant="outline" size="sm" className="shrink-0" onClick={() => void refetch()} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
          </Button>
          <Button asChild size="sm" className="min-w-0 shrink-0">
            <Link to="/run-check" className="inline-flex max-w-full items-center">
              <FileText className="mr-1.5 h-4 w-4 shrink-0 sm:mr-2" />
              <span className="truncate sm:whitespace-normal">New Verification</span>
            </Link>
          </Button>
        </>
      }
    >
      <p className="mb-4 text-sm text-foreground/80">
        Your verification reports appear here as they complete.
      </p>

      {error && (
        <p className="mb-4 text-sm text-destructive">
          {error} — check your connection and try refreshing. If the problem continues, contact support.
        </p>
      )}

      <section className="mb-4 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4" aria-label="Report statistics summary">
        <Card className="shadow-sm">
          <CardContent className="p-3 sm:p-4 sm:pt-5">
            <div className="text-xl font-bold tabular-nums text-foreground sm:text-2xl">
              {loading ? "…" : totalElements}
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">Total reports</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3 sm:p-4 sm:pt-5">
            <div className="text-xl font-bold tabular-nums text-green-600 sm:text-2xl">
              {loading ? "…" : rows.filter((r) => r.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">Completed (this page)</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3 sm:p-4 sm:pt-5">
            <div className="text-xl font-bold tabular-nums text-blue-600 sm:text-2xl">
              {loading
                ? "…"
                : rows.filter((r) => r.status === "in_progress" || r.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">In progress (this page)</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3 sm:p-4 sm:pt-5">
            <div className="text-xl font-bold tabular-nums text-primary sm:text-2xl">
              {loading
                ? "…"
                : (() => {
                    const withScore = rows.filter((r) => r.trustScore != null);
                    if (withScore.length === 0) return "—";
                    return (
                      Math.round(
                        withScore.reduce((a, r) => a + (r.trustScore || 0), 0) / withScore.length,
                      ) + "%"
                    );
                  })()}
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">Avg trust (this page)</p>
          </CardContent>
        </Card>
      </section>

      <section
        className="mb-4 rounded-xl border border-border/60 bg-card/40 px-3 py-2.5 sm:px-4 sm:py-3"
        aria-label="Filter and sort reports"
      >
        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-4 sm:gap-y-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:items-end">
            <Filter className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight text-foreground">Filters</p>
              <p className="sr-only">
                Filter by report ID, generated date range, status, and sort order. Use the header search for name or
                ID.
              </p>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <div className="min-w-0 space-y-1 sm:min-w-[140px]">
              <Label htmlFor="reports-status-filter" className="text-xs font-medium text-foreground/90">
                Status
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="reports-status-filter" className="h-10 w-full" aria-label="Filter by report status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in_progress">In progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-0 space-y-1 sm:min-w-[160px]">
              <Label htmlFor="reports-sort-time" className="text-xs font-medium text-foreground/90">
                Sort by date
              </Label>
              <Select value={sortByTime} onValueChange={(v) => setSortByTime(v as SortByTime)}>
                <SelectTrigger id="reports-sort-time" className="h-10 w-full" aria-label="Sort reports by date">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-0 space-y-1 xl:col-span-1">
              <Label htmlFor="reports-filter-report-id" className="text-xs font-medium text-foreground/90">
                Report ID <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="reports-filter-report-id"
                className="h-10 font-mono text-sm"
                placeholder="Filter by report ID (optional)"
                value={filterReportId}
                onChange={(e) => setFilterReportId(e.target.value)}
                autoComplete="off"
                aria-label="Filter by report ID"
              />
            </div>
            <div className="min-w-0 space-y-1">
              <Label htmlFor="reports-date-from" className="text-xs font-medium text-foreground/90">
                From date
              </Label>
              <Input
                id="reports-date-from"
                type="date"
                className="h-10"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                aria-label="Include reports generated on or after this date"
              />
            </div>
            <div className="min-w-0 space-y-1">
              <Label htmlFor="reports-date-to" className="text-xs font-medium text-foreground/90">
                To date
              </Label>
              <Input
                id="reports-date-to"
                type="date"
                className="h-10"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                aria-label="Include reports generated on or before this date"
              />
            </div>
          </div>
        </div>
      </section>

      <p className="mb-2 text-xs text-muted-foreground sm:hidden">
        Search by name or report ID using the search field in the header above.
      </p>

      {/* Mobile: card list */}
      <div className="md:hidden">
        {loading ? (
          <Card>
            <CardContent className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin shrink-0" aria-hidden />
              <span>Loading reports…</span>
            </CardContent>
          </Card>
        ) : rows.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              No reports match your filters.{" "}
              <Link to="/run-check" className="font-medium text-primary hover:underline">
                Run a check
              </Link>
            </CardContent>
          </Card>
        ) : (
          <ul className="list-none space-y-3 p-0" role="list" aria-label="Verification reports">
            {rows.map((report) => (
              <li key={report.id || `${report.subjectName}-${report.createdAt ?? "na"}`}>
                <Card className="overflow-hidden border-border/60">
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Subject
                        </p>
                        <p className="truncate font-semibold text-foreground">{report.subjectName}</p>
                        <p className="mt-1 font-mono text-xs text-muted-foreground">
                          ID: {report.id || "—"}
                        </p>
                      </div>
                      {getStatusBadge(report.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Trust score</p>
                        <p className={`font-semibold tabular-nums ${getTrustScoreColor(report.trustScore)}`}>
                          {report.trustScore !== null ? `${report.trustScore}%` : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="flex items-center gap-1 font-medium text-foreground">
                          <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                          {formatDate(report.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <Badge variant="outline" className="mb-1 mr-1">
                        {report.verificationType}
                      </Badge>
                      <span className="font-mono">
                        {report.apiStatus ?? "—"}
                        {report.overallStatus ? ` · ${report.overallStatus}` : ""}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 border-t border-border/50 pt-3">
                      {report.id ? (
                        <Button variant="secondary" size="sm" className="flex-1 sm:flex-none" asChild>
                          <a
                            href={bgvReportHtmlViewHref(report.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open verification report in a new tab"
                          >
                            <Eye className="mr-2 h-4 w-4" aria-hidden />
                            View report
                          </a>
                        </Button>
                      ) : (
                        <Button variant="secondary" size="sm" className="flex-1 sm:flex-none" disabled>
                          <Eye className="mr-2 h-4 w-4" aria-hidden />
                          View report
                        </Button>
                      )}
                      {report.id && report.status === "completed" ? (
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none" asChild>
                          <a
                            href={bgvReportDownloadHref(report.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="mr-2 h-4 w-4" aria-hidden />
                            Download
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tablet/desktop: table */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <caption className="sr-only">
              Verification reports table. Columns: report ID, subject, type, status, trust score, date, and
              actions.
            </caption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Report ID</TableHead>
                <TableHead scope="col">Subject name</TableHead>
                <TableHead scope="col">Type</TableHead>
                <TableHead scope="col">API / overall</TableHead>
                <TableHead scope="col">Trust score</TableHead>
                <TableHead scope="col">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 shrink-0" aria-hidden />
                    Date
                  </span>
                </TableHead>
                <TableHead scope="col" className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    <Loader2 className="mr-2 inline h-6 w-6 animate-spin" aria-hidden />
                    Loading reports…
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    No reports found.{" "}
                    <Link to="/run-check" className="text-primary hover:underline">
                      Run a check
                    </Link>
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((report) => (
                  <TableRow key={report.id || `${report.subjectName}-${report.createdAt ?? "na"}`}>
                    <TableCell className="max-w-[140px] truncate font-mono text-sm">
                      {report.id || "—"}
                    </TableCell>
                    <TableCell className="font-medium">{report.subjectName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.verificationType}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(report.status)}
                        <span className="font-mono text-xs text-muted-foreground">
                          {report.apiStatus ?? "—"}
                          {report.overallStatus ? ` · ${report.overallStatus}` : ""}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold tabular-nums ${getTrustScoreColor(report.trustScore)}`}>
                        {report.trustScore !== null ? `${report.trustScore}%` : "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(report.createdAt)}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {report.id ? (
                            <Button variant="ghost" size="sm" asChild aria-label="Open verification report in new tab">
                              <a
                                href={bgvReportHtmlViewHref(report.id)}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" disabled aria-label="Report ID not available">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        {report.id && report.status === "completed" ? (
                          <Button variant="ghost" size="sm" asChild aria-label="Download report PDF">
                            <a
                              href={bgvReportDownloadHref(report.id)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div
        className="mt-6 flex flex-col items-stretch gap-4 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between"
        role="navigation"
        aria-label="Reports pagination"
      >
        <p className="text-center text-sm text-muted-foreground sm:text-left" role="status" aria-live="polite">
          {totalElements === 0 ? (
            <>No reports yet.</>
          ) : (
            <>
              Showing{" "}
              <span className="font-medium tabular-nums text-foreground">
                {page * REPORTS_PAGE_SIZE + 1}–{Math.min((page + 1) * REPORTS_PAGE_SIZE, totalElements)}
              </span>{" "}
              of <span className="font-medium tabular-nums text-foreground">{totalElements}</span> reports
            </>
          )}
        </p>
        <div className="flex items-center justify-center gap-2 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loading || page <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Previous
          </Button>
          <span className="min-w-[7rem] text-center text-sm tabular-nums text-muted-foreground">
            Page {totalElements === 0 ? 0 : page + 1} of {totalElements === 0 ? 0 : totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loading || page >= totalPages - 1 || totalElements === 0}
            onClick={() => setPage((p) => p + 1)}
            aria-label="Next page"
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
