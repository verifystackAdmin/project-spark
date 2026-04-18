import { useState, useEffect, useCallback, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AccountSettingsTabs } from "@/components/dashboard/account/AccountSettingsTabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Settings as SettingsIcon, Bell, Loader2, RefreshCw, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  listBgvReports,
  listBgvNotificationLogsForReport,
  listBgvNotificationLogsForRequester,
  type BgvNotificationLogEntryWithReport,
} from "@/lib/bgvGatewayApi";

const NOTIF_PAGE_SIZE = 10;

/** Per-requester: paged API; single-report filter: client-slice full list for that report. */
async function fetchDeliveryLogs(
  email: string,
  reportIdFilter: string,
  page: number,
  pageSize: number,
): Promise<{
  logs: BgvNotificationLogEntryWithReport[];
  totalElements: number;
  totalPages: number;
  error: string | null;
}> {
  const f = reportIdFilter.trim();
  if (f) {
    const mine = await listBgvReports(email, 0, 200);
    const allowed = new Set(
      (mine.content ?? []).map((r) => r.reportId?.trim()).filter((id): id is string => Boolean(id)),
    );
    if (!allowed.has(f)) {
      return { logs: [], totalElements: 0, totalPages: 0, error: "That report ID is not in your account." };
    }
    const raw = await listBgvNotificationLogsForReport(f);
    const all = raw.map((e) => ({ ...e, reportId: f }));
    const totalElements = all.length;
    const totalPages = totalElements === 0 ? 0 : Math.max(1, Math.ceil(totalElements / pageSize));
    const safePage = Math.min(Math.max(0, page), Math.max(0, totalPages - 1));
    const start = safePage * pageSize;
    const logs = all.slice(start, start + pageSize);
    return { logs, totalElements, totalPages, error: null };
  }
  const res = await listBgvNotificationLogsForRequester(email, { page, pageSize });
  return {
    logs: res.entries,
    totalElements: res.totalElements,
    totalPages: res.totalPages,
    error: null,
  };
}

const Settings = () => {
  const { user } = useAuth();

  const [notifLogs, setNotifLogs] = useState<BgvNotificationLogEntryWithReport[]>([]);
  const [notifTotalElements, setNotifTotalElements] = useState(0);
  const [notifTotalPages, setNotifTotalPages] = useState(0);
  const [notifPage, setNotifPage] = useState(0);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState<string | null>(null);
  const [notifReportFilter, setNotifReportFilter] = useState("");
  const filterRef = useRef(notifReportFilter);
  filterRef.current = notifReportFilter;

  const loadNotifLogs = useCallback(
    async (pageOverride?: number) => {
      const email = user?.email?.trim() ?? "";
      if (!email) return;
      const page = pageOverride !== undefined ? pageOverride : notifPage;
      setNotifLoading(true);
      setNotifError(null);
      try {
        const { logs, totalElements, totalPages, error } = await fetchDeliveryLogs(
          email,
          filterRef.current,
          page,
          NOTIF_PAGE_SIZE,
        );
        if (error) {
          setNotifError(error);
          setNotifLogs([]);
          setNotifTotalElements(0);
          setNotifTotalPages(0);
          return;
        }
        setNotifLogs(logs);
        setNotifTotalElements(totalElements);
        setNotifTotalPages(totalElements === 0 ? 0 : Math.max(1, totalPages));
        if (pageOverride !== undefined) {
          setNotifPage(page);
        }
      } catch (e) {
        setNotifError(e instanceof Error ? e.message : "Failed to load notification logs");
        setNotifLogs([]);
        setNotifTotalElements(0);
        setNotifTotalPages(0);
      } finally {
        setNotifLoading(false);
      }
    },
    [user?.email, notifPage],
  );

  useEffect(() => {
    void loadNotifLogs();
  }, [user?.email, notifPage, loadNotifLogs]);

  return (
    <DashboardLayout
      title="Settings"
      contentClassName="min-w-0 w-full max-w-6xl mx-auto p-4 sm:p-6"
      showFooter={false}
    >
      <div className="mb-6 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 via-card to-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <SettingsIcon className="h-6 w-6" aria-hidden />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Control how VerifyStack reaches you
              </h2>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Tune notifications, language, and security in one place—so every verification feels clear,
                professional, and under your control.
              </p>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="shrink-0 gap-2 self-start sm:self-center" asChild>
            <Link to="/dashboard/profile">
              <User className="h-4 w-4" />
              Profile &amp; contact
            </Link>
          </Button>
        </div>
      </div>

      <AccountSettingsTabs defaultTab="preferences" className="mb-8" />

      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Verification delivery history</CardTitle>
          </div>
          <CardDescription>
            Delivery entries for <span className="font-medium text-foreground">your</span> reports only. Signed in
            as <span className="font-medium text-foreground">{user?.email ?? "—"}</span>. Use{" "}
            <span className="font-medium">Refresh</span> after changing the report filter. Pagination uses the gateway
            for the full list; filtering by report ID paginates within that report&apos;s logs on this device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1 space-y-2">
              <Label htmlFor="notif-report-id">Filter by report ID (optional)</Label>
              <Input
                id="notif-report-id"
                placeholder="Paste reportId to see only that report"
                value={notifReportFilter}
                onChange={(e) => setNotifReportFilter(e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => void loadNotifLogs(0)}
              disabled={notifLoading}
              className="shrink-0"
            >
              {notifLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
          </div>
          {notifError && <p className="text-sm text-destructive">{notifError}</p>}
          {!notifLoading && notifLogs.length === 0 && !notifError && (
            <p className="text-sm text-muted-foreground">No log entries returned yet.</p>
          )}
          {notifLogs.length > 0 && (
            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-left">
                    <th className="p-2 font-medium">Report ID</th>
                    <th className="p-2 font-medium">Channel</th>
                    <th className="p-2 font-medium">Status</th>
                    <th className="p-2 font-medium">Recipient</th>
                    <th className="p-2 font-medium">Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {notifLogs.map((row, i) => (
                    <tr key={`${row.reportId}-${row.sentAt}-${i}`} className="border-b border-border/60">
                      <td className="max-w-[120px] truncate p-2 font-mono text-xs" title={row.reportId}>
                        {row.reportId ?? "—"}
                      </td>
                      <td className="p-2 font-mono text-xs">{row.channel ?? "—"}</td>
                      <td className="p-2">{row.status ?? "—"}</td>
                      <td className="max-w-[200px] truncate p-2" title={row.recipient}>
                        {row.recipient ?? "—"}
                      </td>
                      <td className="whitespace-nowrap p-2 text-muted-foreground">
                        {row.sentAt ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {notifTotalElements > 0 && (
            <div className="flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-center text-sm text-muted-foreground sm:text-left">
                Showing{" "}
                <span className="font-medium tabular-nums text-foreground">
                  {notifPage * NOTIF_PAGE_SIZE + 1}–{Math.min((notifPage + 1) * NOTIF_PAGE_SIZE, notifTotalElements)}
                </span>{" "}
                of <span className="font-medium tabular-nums text-foreground">{notifTotalElements}</span> entries
              </p>
              <div className="flex items-center justify-center gap-2 sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={notifLoading || notifPage <= 0}
                  onClick={() => setNotifPage((p) => Math.max(0, p - 1))}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Previous
                </Button>
                <span className="min-w-[7rem] text-center text-sm tabular-nums text-muted-foreground">
                  Page {notifPage + 1} of {Math.max(1, notifTotalPages)}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={notifLoading || notifPage >= notifTotalPages - 1}
                  onClick={() => setNotifPage((p) => p + 1)}
                  aria-label="Next page"
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
          )}
          {notifLogs.some((l) => l.errorMessage) && (
            <p className="text-xs text-muted-foreground">
              Some deliveries may show an error. If you expected a message and didn&apos;t receive it, contact{" "}
              <a href="mailto:support@verifystack.in" className="font-medium text-primary hover:underline">
                support@verifystack.in
              </a>{" "}
              with the time and report ID.
            </p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Settings;
