import { cn } from "@/lib/utils";

type MiniNetworkGraphProps = {
  className?: string;
  /** Highlight path when score is strong */
  emphasis?: "high" | "medium" | "low";
};

const nodes: { id: string; x: number; y: number; label: string }[] = [
  { id: "id", x: 50, y: 28, label: "Identity" },
  { id: "sub", x: 100, y: 100, label: "Subject" },
  { id: "emp", x: 170, y: 42, label: "Employment" },
  { id: "addr", x: 160, y: 158, label: "Address" },
  { id: "rec", x: 40, y: 150, label: "Records" },
];

const edges: [string, string][] = [
  ["id", "sub"],
  ["emp", "sub"],
  ["addr", "sub"],
  ["rec", "sub"],
];

/** Stylized verification graph — conceptual “connecting dots” for BGV. */
export function MiniNetworkGraph({ className, emphasis = "medium" }: MiniNetworkGraphProps) {
  const stroke =
    emphasis === "high"
      ? "hsl(var(--trust-green) / 0.55)"
      : emphasis === "low"
        ? "hsl(var(--warning-amber) / 0.35)"
        : "hsl(var(--primary) / 0.4)";

  const nodeFill =
    emphasis === "high"
      ? "hsl(var(--trust-green) / 0.25)"
      : "hsl(var(--primary) / 0.2)";

  const map = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, (typeof nodes)[0]>;

  return (
    <div className={cn("relative mx-auto w-full max-w-[220px]", className)}>
      <svg viewBox="0 0 220 200" className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="net-edge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => {
          const A = map[a];
          const B = map[b];
          if (!A || !B) return null;
          return (
            <line
              key={`${a}-${b}-${i}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="url(#net-edge)"
              strokeWidth={1.5}
              strokeOpacity={0.9}
            />
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={n.id === "sub" ? 14 : 9} fill={nodeFill} stroke={stroke} strokeWidth={1.5} />
            <text
              x={n.x}
              y={n.y + (n.id === "sub" ? 28 : 22)}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              fontSize={8}
              style={{ letterSpacing: "0.06em" }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-1 text-center text-[10px] text-muted-foreground">Verified graph · latest check</p>
    </div>
  );
}
