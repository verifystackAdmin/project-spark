import { useId } from "react";
import { cn } from "@/lib/utils";

type SparklineProps = {
  values: number[];
  className?: string;
  /** Stroke hue: primary | trust | accent | warning */
  tone?: "primary" | "trust" | "accent" | "warning";
  height?: number;
};

const toneClass: Record<NonNullable<SparklineProps["tone"]>, string> = {
  primary: "stroke-primary",
  trust: "stroke-[hsl(var(--trust-green))]",
  accent: "stroke-accent",
  warning: "stroke-[hsl(var(--warning-amber))]",
};

/** Minimal SVG sparkline; normalizes series to the drawable height. */
export function Sparkline({ values, className, tone = "primary", height = 40 }: SparklineProps) {
  const gid = useId().replace(/:/g, "");
  const w = 120;
  const h = height;
  const pad = 2;
  const safe = values.length ? values : [0];
  const min = Math.min(...safe);
  const max = Math.max(...safe);
  const span = max - min || 1;

  const pts = safe.map((v, i) => {
    const x = pad + (i / Math.max(1, safe.length - 1)) * (w - pad * 2);
    const n = (v - min) / span;
    const y = pad + (1 - n) * (h - pad * 2);
    return `${x},${y}`;
  });

  const d = pts.length > 1 ? `M ${pts.join(" L ")}` : `M ${pad},${h / 2} L ${w - pad},${h / 2}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("pointer-events-none overflow-visible", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter id={`blur-${gid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <path
        d={d}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(toneClass[tone], "opacity-90")}
      />
      <path
        d={d}
        fill="none"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(toneClass[tone], "opacity-[0.18]")}
        filter={`url(#blur-${gid})`}
      />
    </svg>
  );
}
