import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Info, ShieldAlert, Sparkles } from "lucide-react";
import type { IntelligenceSignal } from "@/lib/dashboardIntelligence";
import { bgvReportHtmlViewHref } from "@/lib/bgvGatewayApi";
import { cn } from "@/lib/utils";

type IntelligenceFeedProps = {
  signals: IntelligenceSignal[];
  className?: string;
};

const severityIcon = {
  critical: ShieldAlert,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
};

const severityBar = {
  critical: "border-l-destructive bg-destructive/5",
  warning: "border-l-[hsl(var(--warning-amber))] bg-[hsl(var(--warning-amber)/0.06)]",
  info: "border-l-primary bg-primary/5",
  success: "border-l-[hsl(var(--trust-green))] bg-[hsl(var(--trust-green)/0.06)]",
};

function formatWhen(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function IntelligenceFeed({ signals, className }: IntelligenceFeedProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2 text-primary">
        <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
        <h3 className="text-sm font-semibold tracking-tight text-foreground">Intelligence feed</h3>
        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
          Live
        </span>
      </div>
      <ul className="max-h-[220px] space-y-2 overflow-y-auto pr-1" role="list" aria-label="Trust intelligence signals">
        {signals.map((s) => {
          const Icon = severityIcon[s.severity];
          const inner = (
            <div
              className={cn(
                "flex gap-3 rounded-lg border border-border/40 border-l-4 p-3 transition-all hover:bg-muted/40",
                severityBar[s.severity],
              )}
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-foreground">{s.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
                <p className="mt-1 text-[10px] text-muted-foreground/80">{formatWhen(s.at)}</p>
              </div>
            </div>
          );
          if (s.reportId) {
            return (
              <li key={s.id}>
                <a
                  href={bgvReportHtmlViewHref(s.reportId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {inner}
                </a>
              </li>
            );
          }
          return <li key={s.id}>{inner}</li>;
        })}
      </ul>
      <p className="text-[10px] text-muted-foreground">
        Signals are derived from your gateway reports.{" "}
        <Link to="/dashboard/reports" className="text-primary underline-offset-2 hover:underline">
          Open full list
        </Link>
      </p>
    </div>
  );
}
