import { useId, useMemo } from "react";
import { cn } from "@/lib/utils";

type GeometricAvatarProps = {
  seed: string;
  /** When the gateway provides a candidate photo, show it instead of the generated pattern. */
  photoUrl?: string | null;
  className?: string;
  size?: number;
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Deterministic geometric avatar from a seed (name + id). No external requests. */
export function GeometricAvatar({ seed, photoUrl, className, size = 48 }: GeometricAvatarProps) {
  const uid = useId().replace(/:/g, "");
  const cleanPhoto = photoUrl?.trim();

  const { hues, shapes } = useMemo(() => {
    const h = hash(seed || "x");
    const hue1 = h % 360;
    const hue2 = (h * 17) % 360;
    const hue3 = (h * 7 + 140) % 360;
    return {
      hues: [hue1, hue2, hue3],
      shapes: {
        r1: 12 + (h % 8),
        r2: 8 + ((h >> 3) % 6),
        rot: (h % 40) - 20,
      },
    };
  }, [seed]);

  const gradId = `ga-${uid}-${hash(seed)}`;

  if (cleanPhoto) {
    return (
      <img
        src={cleanPhoto}
        alt=""
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover ring-2 ring-background", className)}
        loading="lazy"
      />
    );
  }

  const s = size;

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 48 48"
      className={cn("shrink-0 overflow-hidden rounded-full ring-2 ring-background", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`hsl(${hues[0]} 65% 42%)`} />
          <stop offset="100%" stopColor={`hsl(${hues[1]} 70% 35%)`} />
        </linearGradient>
      </defs>
      <rect width="48" height="48" fill={`url(#${gradId})`} />
      <circle cx="24" cy="18" r={shapes.r1} fill={`hsl(${hues[2]} 80% 55% / 0.35)`} />
      <rect
        x="14"
        y="26"
        width="20"
        height="10"
        rx="3"
        fill={`hsl(${hues[0]} 60% 70% / 0.25)`}
        transform={`rotate(${shapes.rot} 24 31)`}
      />
      <circle cx="34" cy="12" r={shapes.r2} fill={`hsl(${hues[1]} 90% 60% / 0.4)`} />
    </svg>
  );
}
