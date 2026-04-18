import { AlertTriangle, Briefcase, Building2, CheckCircle2, Fingerprint, Shield } from "lucide-react";
import type { CategoryKey, CategoryState } from "@/lib/dashboardNarrative";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const meta: Record<
  CategoryKey,
  { label: string; short: string; Icon: typeof Fingerprint }
> = {
  identity: { label: "Identity & documents", short: "ID", Icon: Fingerprint },
  criminal: { label: "Criminal & risk screening", short: "Risk", Icon: Shield },
  financial: { label: "Financial signals", short: "Fin", Icon: Building2 },
  employment: { label: "Employment verification", short: "Work", Icon: Briefcase },
};

type ReportCategoryStripProps = {
  categories: Record<CategoryKey, CategoryState>;
  className?: string;
};

export function ReportCategoryStrip({ categories, className }: ReportCategoryStripProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)} role="list" aria-label="Check categories">
      {(Object.keys(meta) as CategoryKey[]).map((key) => {
        const m = meta[key];
        const state = categories[key];
        const Icon = m.Icon;
        return (
          <Tooltip key={key}>
            <TooltipTrigger asChild>
              <span
                role="listitem"
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                  state === "ok" && "border-trust/30 bg-trust/10 text-trust",
                  state === "warn" && "border-[hsl(var(--warning-amber)/0.5)] bg-[hsl(var(--warning-amber)/0.08)] text-[hsl(var(--warning-amber))]",
                  state === "pending" && "border-border/60 bg-muted/50 text-muted-foreground",
                )}
              >
                {state === "ok" ? (
                  <CheckCircle2 className="h-3 w-3 shrink-0" aria-hidden />
                ) : state === "warn" ? (
                  <AlertTriangle className="h-3 w-3 shrink-0" aria-hidden />
                ) : (
                  <Icon className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
                )}
                <span className="hidden sm:inline">{m.short}</span>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[220px] text-xs">
              <span className="font-medium">{m.label}</span>
              <span className="mt-0.5 block text-muted-foreground">
                {state === "ok" && "No elevated flags in this bucket (derived)."}
                {state === "warn" && "Review suggested — confirm in PDF."}
                {state === "pending" && "Still processing or partial data."}
              </span>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
