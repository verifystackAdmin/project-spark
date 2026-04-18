import React from "react";
import {
  ENTERPRISE_FROST_LAYER_CLASS,
  solutionVibeWashClass,
  solutionVibeOrbClasses,
  type SolutionHeroVibe,
} from "@/lib/solutionHeroVisuals";

interface HeroBackgroundProps {
  /** Optional vertical vibe — applies brand-tinted wash + orbs */
  vibe?: SolutionHeroVibe;
  /** Optional blurred brand backdrop image (must live in /public) */
  brandBackdropSrc?: string;
  /** Legacy: full-bleed image background */
  imageUrl?: string;
  altText?: string;
}

/**
 * Unified hero background system.
 * - Default: subtle neural grid + ambient orbs (used on Home).
 * - With `vibe`: vertical-tinted wash + frosted veil (solution pages).
 * - With `imageUrl`: full-bleed photographic backdrop (legacy hero).
 */
const HeroBackground: React.FC<HeroBackgroundProps> = ({
  vibe,
  brandBackdropSrc,
  imageUrl,
  altText = "",
}) => {
  // Legacy image-driven mode
  if (imageUrl) {
    return (
      <>
        <div className="absolute inset-0">
          <img src={imageUrl} alt={altText} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        <div className="absolute inset-0 neural-grid opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </>
    );
  }

  // Vibe-driven enterprise mode (used on Solution pages + opt-in elsewhere)
  if (vibe) {
    const [orbA, orbB] = solutionVibeOrbClasses[vibe];
    return (
      <>
        {brandBackdropSrc && (
          <div className="absolute inset-0">
            <img
              src={brandBackdropSrc}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        )}
        <div className={ENTERPRISE_FROST_LAYER_CLASS} />
        <div className={solutionVibeWashClass[vibe]} />
        <div className="absolute inset-0 neural-grid opacity-[0.07]" />
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${orbA}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl ${orbB}`} />
      </>
    );
  }

  // Default ambient mode (Home hero)
  return (
    <>
      <div className="absolute inset-0 neural-grid opacity-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
    </>
  );
};

export default HeroBackground;
