import { useEffect, useState } from "react";

/** Viewports ≤ this width use a left drawer (overlay); wider viewports use a docked sidebar. */
export const DASHBOARD_OVERLAY_MAX_PX = 1023;

/**
 * True when the dashboard should show the nav as an overlay drawer (hamburger) so main content is full width.
 * Use for tablet / small window — not only phone-sized screens.
 */
export function useDashboardNavOverlay(): boolean {
  const [overlay, setOverlay] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= DASHBOARD_OVERLAY_MAX_PX : true,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${DASHBOARD_OVERLAY_MAX_PX}px)`);
    const sync = () => setOverlay(mql.matches);
    mql.addEventListener("change", sync);
    sync();
    return () => mql.removeEventListener("change", sync);
  }, []);

  return overlay;
}
