/**
 * Single public API host for VerifyStack (auth, BGV, billing, reports, …).
 * Use the **public API gateway** origin (e.g. `https://api-gateway.<env>.azurecontainerapps.io`), not internal `*.internal.*` URLs.
 *
 * Env (Vite):
 * - `VITE_API_BASE_URL` — optional override (e.g. https://verify.verifystack.in)
 * - `VITE_BGV_GATEWAY_URL` — same thing if unset; used historically for BGV
 *
 * Dev: same-origin `/api/bgv` → Vite proxy → gateway (see vite.config).
 */
const GATEWAY_DEFAULT = "https://verify.verifystack.in";

function isSpaSiteOrigin(base: string): boolean {
  try {
    const host = new URL(base).hostname.toLowerCase();
    return (
      host === "verifystack.in" ||
      host === "www.verifystack.in" ||
      host === "verify.verifystack.in"
    );
  } catch {
    return false;
  }
}

function gatewayOriginFromEnv(): string {
  const apiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim().replace(/\/$/, "") ?? "";
  const bgv = (import.meta.env.VITE_BGV_GATEWAY_URL as string | undefined)?.trim().replace(/\/$/, "") ?? "";
  return apiBase || bgv;
}

/** Full URL for a path on the API gateway, e.g. `/api/v1/auth/login`. */
export function verifyStackGatewayUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const fromEnv = gatewayOriginFromEnv();
  if (fromEnv && !isSpaSiteOrigin(fromEnv)) {
    return `${fromEnv}${p}`;
  }
  if (import.meta.env.DEV) {
    return `/api/bgv${p}`;
  }
  if (fromEnv && isSpaSiteOrigin(fromEnv)) {
    return p;
  }
  return `${GATEWAY_DEFAULT}${p}`;
}
