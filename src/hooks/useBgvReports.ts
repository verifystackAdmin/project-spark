import { useState, useEffect, useCallback } from "react";
import { listBgvReports, type BgvReportSummary, type ListBgvReportsQuery } from "@/lib/bgvGatewayApi";

export type UseBgvReportsOptions = {
  /** 0-based page index. */
  page?: number;
  pageSize?: number;
} & ListBgvReportsQuery;

export function useBgvReports(requesterId: string | undefined, options?: UseBgvReportsOptions) {
  const page = options?.page ?? 0;
  const pageSize = options?.pageSize ?? 20;
  const { sortDir, q, status, reportId, startDate, endDate } = options ?? {};

  const [reports, setReports] = useState<BgvReportSummary[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(
    async (refetchOpts?: { silent?: boolean }) => {
      if (!requesterId?.trim()) {
        setReports([]);
        setTotalElements(0);
        setTotalPages(1);
        setError(null);
        return;
      }
      const silent = refetchOpts?.silent === true;
      if (!silent) {
        setLoading(true);
      }
      setError(null);
      try {
        const res = await listBgvReports(requesterId.trim(), page, pageSize, {
          sortDir,
          q: q?.trim() || undefined,
          status: status?.trim() || undefined,
          reportId: reportId?.trim() || undefined,
          startDate: startDate?.trim() || undefined,
          endDate: endDate?.trim() || undefined,
        });
        setReports(res.content ?? []);
        const te = res.totalElements ?? (res.content?.length ?? 0);
        setTotalElements(te);
        const tp =
          res.totalPages ??
          (te > 0 ? Math.max(1, Math.ceil(te / Math.max(1, pageSize))) : 1);
        setTotalPages(Math.max(1, tp));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load reports");
        setReports([]);
        setTotalElements(0);
        setTotalPages(1);
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    },
    [requesterId, page, pageSize, sortDir, q, status, reportId, startDate, endDate],
  );

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { reports, totalElements, totalPages, loading, error, refetch };
}
