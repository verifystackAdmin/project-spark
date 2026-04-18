/**
 * Enterprise hero system: optional blurred *on-brand* backdrop + black/purple infra wash.
 * Default backdrop is site OG art (`/og-image.png`) — VerifyStack-owned, not generic stock.
 * Swap `backdropSrc` per route when you add vertical-specific assets under `/public`.
 */

export type SolutionHeroVibe = "corporate" | "property" | "domestic" | "personal";

/** Default blurred layer — brand OG image (replace with dedicated hero assets if needed). */
export const DEFAULT_HERO_BRAND_BACKDROP = "/og-image.png";

export interface SolutionHeroConfig {
  vibe: SolutionHeroVibe;
  /** Raster under the frost; must live in `public/`. Defaults to `DEFAULT_HERO_BRAND_BACKDROP`. */
  backdropSrc?: string;
}

/** Unified frosted veil — same stack as solution reference (tweak once, applies everywhere). */
export const ENTERPRISE_FROST_LAYER_CLASS =
  "pointer-events-none absolute inset-0 bg-gradient-to-b from-background/72 via-background/58 to-background/78 backdrop-blur-xl supports-[backdrop-filter]:from-background/48 supports-[backdrop-filter]:via-background/38 supports-[backdrop-filter]:to-background/62";

/** Subtle vertical accent on top of gradient + (optional) blurred brand layer */
export const solutionVibeWashClass: Record<SolutionHeroVibe, string> = {
  corporate:
    "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_88%_0%,hsl(265_85%_58%_/_0.15),transparent_52%),radial-gradient(ellipse_65%_45%_at_12%_100%,hsl(217_91%_60%_/_0.07),transparent_50%)]",
  property:
    "pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(38_28%_42%_/_0.06)] via-transparent to-[hsl(222_47%_40%_/_0.05)]",
  domestic:
    "pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(152_82%_38%_/_0.07)] via-transparent to-transparent",
  personal:
    "pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(265_85%_58%_/_0.07)] via-transparent to-[hsl(221_83%_53%_/_0.06)]",
};

/** Soft pools — corporate leans purple + blue (brand), not random rainbow */
export const solutionVibeOrbClasses: Record<SolutionHeroVibe, [string, string]> = {
  corporate: ["bg-[hsl(265_85%_58%_/_0.09)]", "bg-[hsl(217_91%_60%_/_0.07)]"],
  property: ["bg-[hsl(38_32%_45%_/_0.06)]", "bg-[hsl(222_47%_50%_/_0.05)]"],
  domestic: ["bg-[hsl(152_82%_42%_/_0.08)]", "bg-[hsl(185_70%_40%_/_0.05)]"],
  personal: ["bg-[hsl(265_85%_58%_/_0.08)]", "bg-[hsl(221_83%_53%_/_0.06)]"],
};

export const solutionHeroByPath: Record<string, SolutionHeroConfig> = {
  "/solutions/business-background-verification": {
    vibe: "corporate",
    backdropSrc: DEFAULT_HERO_BRAND_BACKDROP,
  },
  "/solutions/tenant-property-verification": {
    vibe: "property",
    backdropSrc: DEFAULT_HERO_BRAND_BACKDROP,
  },
  "/solutions/domestic-worker-verification": {
    vibe: "domestic",
    backdropSrc: DEFAULT_HERO_BRAND_BACKDROP,
  },
  "/solutions/personal-identity-verification": {
    vibe: "personal",
    backdropSrc: DEFAULT_HERO_BRAND_BACKDROP,
  },
};

export function solutionHeroForRoute(routePath: string): SolutionHeroConfig {
  const cfg = solutionHeroByPath[routePath];
  if (cfg) return cfg;
  return solutionHeroByPath["/solutions/business-background-verification"];
}
