import type { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sparkline } from "@/components/dashboard/intelligence/Sparkline";
import { cn } from "@/lib/utils";

type MetricInsightCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  iconClassName?: string;
  sparklineValues: number[];
  sparkTone?: "primary" | "trust" | "accent" | "warning";
  tooltip: string;
  /** Strong glow for standout metrics */
  glow?: boolean;
};

export function MetricInsightCard({
  label,
  value,
  icon: Icon,
  iconClassName,
  sparklineValues,
  sparkTone = "primary",
  tooltip,
  glow,
}: MetricInsightCardProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "group relative overflow-hidden rounded-2xl border border-white/10 bg-card/45 p-4 shadow-sm backdrop-blur-md transition-all duration-300 sm:p-5",
            "ring-1 ring-border/30 hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary/25",
            glow && "shadow-[0_0_28px_hsl(var(--primary)/0.12)]",
          )}
        >
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
          <div className="relative flex items-start justify-between gap-2">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/60",
                iconClassName,
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="-mr-1 -mt-1 h-10 w-[120px] shrink-0 opacity-90 sm:h-11">
              <Sparkline values={sparklineValues} tone={sparkTone} height={44} className="h-full w-full" />
            </div>
          </div>
          <p
            className={cn(
              "relative mt-2 font-mono text-2xl font-bold tabular-nums tracking-tight text-foreground sm:text-3xl",
              glow && "text-primary",
            )}
          >
            {value}
          </p>
          <p className="relative mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs text-xs leading-relaxed">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
