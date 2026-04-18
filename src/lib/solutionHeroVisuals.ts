/**
 * Enterprise hero system: blurred *on-brand* backdrop + tinted infra wash.
 * Each route now ships with a real, India-anchored backdrop image so every
 * solution hero feels grounded in product reality (not stock placeholders).
 */
import heroBusinessTeam from "@/assets/hero-business-team-india.jpg";
import heroTenant from "@/assets/hero-tenant-india.jpg";
import heroDomestic from "@/assets/hero-domestic-india.jpg";
import heroPersonal from "@/assets/hero-verification-india.jpg";

export type SolutionHeroVibe = "corporate" | "property" | "domestic" | "personal";

/** Default blurred layer — the strongest brand image we own */
export const DEFAULT_HERO_BRAND_BACKDROP = heroBusinessTeam;

export interface SolutionHeroConfig {
  vibe: SolutionHeroVibe;
  /** Imported asset URL used under the frost layer. */
  backdropSrc?: string;
}

/** Unified frosted veil — same stack as solution reference (tweak once, applies everywhere). */
export const ENTERPRISE_FROST_LAYER_CLASS =
  "pointer-events-none absolute inset-0 bg-gradient-to-b from-background/72 via-background/58 to-background/78 backdrop-blur-xl supports-[backdrop-filter]:from-background/48 supports-[backdrop-filter]:via-background/38 supports-[backdrop-filter]:to-background/62";

/** Subtle vertical accent on top of gradient + blurred brand layer */
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
    backdropSrc: heroBusinessTeam,
  },
  "/solutions/tenant-property-verification": {
    vibe: "property",
    backdropSrc: heroTenant,
  },
  "/solutions/domestic-worker-verification": {
    vibe: "domestic",
    backdropSrc: heroDomestic,
  },
  "/solutions/personal-identity-verification": {
    vibe: "personal",
    backdropSrc: heroPersonal,
  },
};

export function solutionHeroForRoute(routePath: string): SolutionHeroConfig {
  const cfg = solutionHeroByPath[routePath];
  if (cfg) return cfg;
  return solutionHeroByPath["/solutions/business-background-verification"];
}
