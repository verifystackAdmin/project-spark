import { cn } from "@/lib/utils";

interface RadarData {
  label: string;
  value: number;
  color: string;
}

interface RelationshipRadarChartProps {
  data: RadarData[];
  size?: number;
}

const RelationshipRadarChart = ({ data, size = 300 }: RelationshipRadarChartProps) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.35;
  const levels = 5;

  const angleSlice = (Math.PI * 2) / data.length;

  // Generate points for the data polygon
  const getDataPoints = () => {
    return data.map((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const r = (d.value / 100) * radius;
      return {
        x: centerX + r * Math.cos(angle),
        y: centerY + r * Math.sin(angle),
      };
    });
  };

  const dataPoints = getDataPoints();
  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // Generate axis lines
  const axisLines = data.map((_, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    return {
      x2: centerX + radius * Math.cos(angle),
      y2: centerY + radius * Math.sin(angle),
    };
  });

  // Generate level circles
  const levelCircles = Array.from({ length: levels }, (_, i) => {
    const r = ((i + 1) / levels) * radius;
    return r;
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background circles */}
        {levelCircles.map((r, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-border"
            opacity={0.5}
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((line, i) => (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={line.x2}
            y2={line.y2}
            stroke="currentColor"
            strokeWidth="1"
            className="text-border"
          />
        ))}

        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#radarGradient)"
          fillOpacity="0.3"
          stroke="url(#radarStroke)"
          strokeWidth="2"
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="6"
            fill={data[i].color}
            stroke="white"
            strokeWidth="2"
            className="drop-shadow-md"
          />
        ))}

        {/* Labels */}
        {data.map((d, i) => {
          const angle = angleSlice * i - Math.PI / 2;
          const labelRadius = radius + 30;
          const x = centerX + labelRadius * Math.cos(angle);
          const y = centerY + labelRadius * Math.sin(angle);

          return (
            <g key={i}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-foreground"
              >
                {d.label}
              </text>
              <text
                x={x}
                y={y + 14}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-bold"
                fill={d.color}
              >
                {d.value}%
              </text>
            </g>
          );
        })}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(230, 89%, 48%)" />
            <stop offset="100%" stopColor="hsl(179, 85%, 39%)" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(230, 89%, 48%)" />
            <stop offset="100%" stopColor="hsl(179, 85%, 39%)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-xs text-muted-foreground">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelationshipRadarChart;
