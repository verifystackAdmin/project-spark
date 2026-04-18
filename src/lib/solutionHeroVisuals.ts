/**
 * Enterprise hero system: clean frosted gradient + brand-tinted wash + soft orbs.
 * No photographic backdrops — keeps every solution hero on-brand and consistent
 * with the Personal Identity Verification reference.
 */

export type SolutionHeroVibe = "corporate" | "property" | "domestic" | "personal";

export interface SolutionHeroConfig {
  vibe: SolutionHeroVibe;
  /** Optional backdrop — intentionally unused now (kept for API compatibility). */
  backdropSrc?: string;
}

/** Unified frosted veil — single source of truth for the enterprise hero stack. */
export const ENTERPRISE_FROST_LAYER_CLASS =
  "pointer-events-none absolute inset-0 bg-gradient-to-b from-background/72 via-background/58 to-background/78 backdrop-blur-xl supports-[backdrop-filter]:from-background/48 supports-[backdrop-filter]:via-background/38 supports-[backdrop-filter]:to-background/62";

/** Subtle vertical accent washes — brand-tinted, never neon. */
export const solutionVibeWashClass: Record<SolutionHeroVibe, string> = {
  corporate:
    "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_88%_0%,hsl(265_85%_58%_/_0.15),transparent_52%),radial-gradient(ellipse_65%_45%_at_12%_100%,hsl(217_91%_60%_/_0.07),transparent_50%)]",
  property:
    "pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(38_28%_42%_/_0.08)] via-transparent to-[hsl(222_47%_40%_/_0.06)]",
  domestic:
    "pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(152_82%_38%_/_0.08)] via-transparent to-[hsl(185_70%_40%_/_0.05)]",
  personal:
    "pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(265_85%_58%_/_0.08)] via-transparent to-[hsl(221_83%_53%_/_0.06)]",
};

/** Soft pools per vibe. */
export const solutionVibeOrbClasses: Record<SolutionHeroVibe, [string, string]> = {
  corporate: ["bg-[hsl(265_85%_58%_/_0.10)]", "bg-[hsl(217_91%_60%_/_0.08)]"],
  property: ["bg-[hsl(38_32%_45%_/_0.08)]", "bg-[hsl(222_47%_50%_/_0.06)]"],
  domestic: ["bg-[hsl(152_82%_42%_/_0.09)]", "bg-[hsl(185_70%_40%_/_0.06)]"],
  personal: ["bg-[hsl(265_85%_58%_/_0.09)]", "bg-[hsl(221_83%_53%_/_0.07)]"],
};

export const solutionHeroByPath: Record<string, SolutionHeroConfig> = {
  "/solutions/business-background-verification": { vibe: "corporate" },
  "/solutions/tenant-property-verification": { vibe: "property" },
  "/solutions/domestic-worker-verification": { vibe: "domestic" },
  "/solutions/personal-identity-verification": { vibe: "personal" },
};

export function solutionHeroForRoute(routePath: string): SolutionHeroConfig {
  return solutionHeroByPath[routePath] ?? solutionHeroByPath["/solutions/business-background-verification"];
}
