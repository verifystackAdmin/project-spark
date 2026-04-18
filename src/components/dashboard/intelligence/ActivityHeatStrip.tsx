import { cn } from "@/lib/utils";

type ActivityHeatStripProps = {
  levels: number[];
  className?: string;
};

const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

/** Last 7 days activity intensity (0–1). */
export function ActivityHeatStrip({ levels, className }: ActivityHeatStripProps) {
  const cells = levels.length >= 7 ? levels.slice(-7) : [...levels, ...Array(7 - levels.length).fill(0)];
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">7-day activity</p>
      <div className="flex gap-1">
        {cells.slice(0, 7).map((lv, i) => (
          <div
            key={i}
            className="flex flex-1 flex-col items-center gap-0.5"
            title={`Day ${i + 1}`}
          >
            <div
              className="h-8 w-full max-w-[28px] rounded-md border border-border/40 transition-colors"
              style={{
                background: `linear-gradient(180deg, hsl(var(--primary) / ${0.15 + lv * 0.55}) 0%, hsl(var(--accent) / ${0.08 + lv * 0.35}) 100%)`,
              }}
            />
            <span className="text-[9px] text-muted-foreground">{dayLabels[i] ?? "·"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
