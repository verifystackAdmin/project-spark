import HeroBackground from "@/components/layout/HeroBackground";
import { solutionHeroForRoute } from "@/lib/solutionHeroVisuals";

interface SolutionHeroBackgroundProps {
  /** Must match App route, e.g. `/solutions/business-background-verification` */
  routePath: string;
}

/** Route-driven hero — vibe + optional per-route `backdropSrc` in `solutionHeroByPath`. */
const SolutionHeroBackground = ({ routePath }: SolutionHeroBackgroundProps) => {
  const { vibe, backdropSrc } = solutionHeroForRoute(routePath);
  return <HeroBackground vibe={vibe} brandBackdropSrc={backdropSrc} />;
};

export default SolutionHeroBackground;
