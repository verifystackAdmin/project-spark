/**
 * JWT `role` (and billing admin Bearer) — align with auth service.
 * Billing admin routes also accept `X-VerifyStack-Admin-Key` (operators only; never ship in a public SPA).
 */

export const APP_ROLES = ["USER", "TENANT_ADMIN", "SALES", "ADMIN", "SUPER_ADMIN"] as const;
export type AppRole = (typeof APP_ROLES)[number];

export function normalizeAppRole(raw?: string | null): AppRole | undefined {
  if (!raw?.trim()) return undefined;
  const u = raw.trim().toUpperCase();
  return (APP_ROLES as readonly string[]).includes(u) ? (u as AppRole) : undefined;
}

/** Full billing admin (analytics, deactivate, DELETE feature, catalog PATCH, etc.). */
export function isBillingAdminFullRole(role?: string | null): boolean {
  const r = normalizeAppRole(role);
  return r === "SUPER_ADMIN" || r === "ADMIN";
}

/** Plan/feature packaging; no analytics, no plan deactivate, no DELETE plan feature, no catalog toggle. */
export function isBillingSalesRole(role?: string | null): boolean {
  return normalizeAppRole(role) === "SALES";
}

/** Read-only GET on `/api/v1/billing/admin/plans` and `.../admin/features`. */
export function isBillingTenantAdminRole(role?: string | null): boolean {
  return normalizeAppRole(role) === "TENANT_ADMIN";
}

export function hasAnyBillingAdminBearerRole(role?: string | null): boolean {
  return isBillingTenantAdminRole(role) || isBillingSalesRole(role) || isBillingAdminFullRole(role);
}
