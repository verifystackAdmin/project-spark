import { cn } from "@/lib/utils";

interface TrustScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
  /** Plain-language line under the label (e.g. why the score looks like this). */
  caption?: string;
  /** Trend vs last run, e.g. "↑ +2 vs last screening". */
  trendHint?: string;
}

const TrustScoreGauge = ({
  score,
  size = "md",
  showLabel = true,
  animated = true,
  caption,
  trendHint,
}: TrustScoreGaugeProps) => {
  const sizes = {
    sm: { width: 120, strokeWidth: 8, fontSize: "text-xl" },
    md: { width: 180, strokeWidth: 12, fontSize: "text-3xl" },
    lg: { width: 240, strokeWidth: 16, fontSize: "text-5xl" },
  };

  const { width, strokeWidth, fontSize } = sizes[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = radius * Math.PI; // Half circle
  const progress = (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return "text-trust";
    if (score >= 60) return "text-accent";
    if (score >= 40) return "text-warning";
    return "text-danger";
  };

  const getStrokeColor = () => {
    if (score >= 80) return "stroke-trust";
    if (score >= 60) return "stroke-accent";
    if (score >= 40) return "stroke-warning";
    return "stroke-danger";
  };

  const getLabel = () => {
    if (score >= 80) return "Highly Trusted";
    if (score >= 60) return "Moderate Trust";
    if (score >= 40) return "Low Trust";
    return "High Risk";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width, height: width / 2 + 20 }}>
        <svg
          width={width}
          height={width / 2 + 20}
          className="transform -rotate-0"
        >
          {/* Background arc */}
          <path
            d={`M ${strokeWidth / 2} ${width / 2} A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2} ${width / 2}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted"
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            d={`M ${strokeWidth / 2} ${width / 2} A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2} ${width / 2}`}
            fill="none"
            strokeWidth={strokeWidth}
            className={cn(getStrokeColor(), animated && "transition-all duration-1000 ease-out")}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{
              transformOrigin: "center",
            }}
          />
        </svg>
        {/* Score Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
          <span className={cn(fontSize, "font-bold", getScoreColor())}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground font-medium">/ 100</span>
        </div>
      </div>
      {showLabel && (
        <div className="space-y-1 text-center">
          <span className={cn("block text-sm font-semibold", getScoreColor())}>{getLabel()}</span>
          {trendHint ? (
            <span className="block font-mono text-xs tabular-nums text-muted-foreground">{trendHint}</span>
          ) : null}
          {caption ? <p className="max-w-[260px] text-pretty text-xs leading-relaxed text-muted-foreground">{caption}</p> : null}
        </div>
      )}
    </div>
  );
};

export default TrustScoreGauge;
