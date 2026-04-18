/**
 * VerifyStack BGV HTTP API (public API gateway).
 * Same host as auth — see `verifyStackGatewayUrl` / `VITE_API_BASE_URL` / `VITE_BGV_GATEWAY_URL`.
 *
 * Contract & package → `requestedChecks`: `postman/UI-BGV-INTEGRATION-GUIDE.md`
 * (Postman: `postman/VerifyStack-API.postman_collection.json`).
 *
 * `POST /api/v1/orchestrator/reports` includes optional `subjectVerification` (camelCase); required
 * keys depend on `requestedChecks` — see {@link subjectVerificationRequirements} / {@link validateSubjectVerificationForChecks}.
 * Billing admin `GET`/`POST` under `/api/v1/billing/admin/**` accept `Authorization: Bearer` when the JWT role
 * is allowed; operators may also use `X-VerifyStack-Admin-Key` (do not put that key in a public SPA).
 */
import { getStoredTokens } from "@/lib/api";
import { verifyStackGatewayUrl } from "@/lib/verifyStackGatewayUrl";

export const bgvApiUrl = verifyStackGatewayUrl;

export type BgvCheckType =
  | "IDENTITY_PAN"
  | "IDENTITY_AADHAAR"
  | "EMPLOYMENT_EPFO"
  | "COURT_RECORD"
  | "CREDIT_REPORT";

/** Document type for `DOCUMENT_INDIA_ID` (orchestrator / KYC Hub). */
export type IndiaDocumentType = "VOTER_ID" | "DRIVING_LICENCE" | "PASSPORT" | "AADHAAR";

/**
 * CamelCase payload nested under `POST .../orchestrator/reports`.
 * Required keys depend on `requestedChecks` — validate with {@link validateSubjectVerificationForChecks}.
 */
export type SubjectVerification = {
  pan?: string;
  aadhaarNumber?: string;
  dateOfBirth?: string;
  fatherName?: string;
  address?: string;
  documentId?: string;
  documentType?: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  /** If omitted for bank checks, backend may use subject phone. */
  bankPhoneNumber?: string;
  gstin?: string;
  cin?: string;
  vehicleRegistrationNumber?: string;
  email?: string;
  motherName?: string;
  documentDateOfBirth?: string;
};

/** Which {@link SubjectVerification} fields must be non-empty for the given check set. */
export type SubjectVerificationRequirements = {
  pan: boolean;
  aadhaarNumber: boolean;
  dateOfBirth: boolean;
  fatherName: boolean;
  address: boolean;
  documentId: boolean;
  documentType: boolean;
  bankAccountNumber: boolean;
  bankIfsc: boolean;
  gstin: boolean;
  cin: boolean;
  vehicleRegistrationNumber: boolean;
};

const EMPTY_SV_REQ: SubjectVerificationRequirements = {
  pan: false,
  aadhaarNumber: false,
  dateOfBirth: false,
  fatherName: false,
  address: false,
  documentId: false,
  documentType: false,
  bankAccountNumber: false,
  bankIfsc: false,
  gstin: false,
  cin: false,
  vehicleRegistrationNumber: false,
};

/**
 * Derives required subjectVerification fields from orchestrator check types (uppercase).
 * Matches gateway validation matrix (400 before billing when missing).
 */
export function subjectVerificationRequirements(
  requestedChecks: readonly string[],
): SubjectVerificationRequirements {
  const checks = new Set(
    requestedChecks.map((c) => String(c).trim().toUpperCase()).filter(Boolean),
  );
  const o = { ...EMPTY_SV_REQ };
  for (const c of checks) {
    if (c === "IDENTITY_PAN" || c === "PAN_AADHAAR_LINK") o.pan = true;
    if (c === "IDENTITY_AADHAAR" || c === "IDENTITY_AADHAAR_PREMIUM") o.aadhaarNumber = true;
    if (c === "COURT_RECORD") {
      o.pan = true;
      o.dateOfBirth = true;
      o.fatherName = true;
      o.address = true;
    }
    if (c === "EMPLOYMENT_EPFO" || c === "CREDIT_REPORT") {
      o.pan = true;
      o.dateOfBirth = true;
    }
    if (c === "DOCUMENT_INDIA_ID") {
      o.documentId = true;
      o.documentType = true;
    }
    if (c === "BANK_ACCOUNT_VERIFICATION") {
      o.bankAccountNumber = true;
      o.bankIfsc = true;
    }
    if (c === "GST_VERIFICATION") o.gstin = true;
    if (c === "CIN_VERIFICATION") o.cin = true;
    if (c === "VEHICLE_RC_VERIFICATION") o.vehicleRegistrationNumber = true;
  }
  return o;
}

function svTrim(v: string | undefined): string {
  return (v ?? "").trim();
}

/** Returns a human-readable error or `null` if all required fields are present. */
export function validateSubjectVerificationForChecks(
  requestedChecks: readonly string[],
  sv: SubjectVerification,
): string | null {
  const r = subjectVerificationRequirements(requestedChecks);
  const missing: string[] = [];
  if (r.pan && !svTrim(sv.pan)) missing.push("PAN");
  if (r.aadhaarNumber && !svTrim(sv.aadhaarNumber)) missing.push("Aadhaar number");
  if (r.dateOfBirth && !svTrim(sv.dateOfBirth)) missing.push("Date of birth");
  if (r.fatherName && !svTrim(sv.fatherName)) missing.push("Father's name");
  if (r.address && !svTrim(sv.address)) missing.push("Address");
  if (r.documentId && !svTrim(sv.documentId)) missing.push("Document ID");
  if (r.documentType && !svTrim(sv.documentType)) missing.push("Document type");
  if (r.bankAccountNumber && !svTrim(sv.bankAccountNumber)) missing.push("Bank account number");
  if (r.bankIfsc && !svTrim(sv.bankIfsc)) missing.push("Bank IFSC");
  if (r.gstin && !svTrim(sv.gstin)) missing.push("GSTIN");
  if (r.cin && !svTrim(sv.cin)) missing.push("CIN");
  if (r.vehicleRegistrationNumber && !svTrim(sv.vehicleRegistrationNumber)) {
    missing.push("Vehicle registration number");
  }
  if (missing.length === 0) return null;
  return `Please fill: ${missing.join(", ")} (required for your plan’s checks).`;
}

/** Strips empty strings; omits keys with no value (gateway receives only set fields). */
export function compactSubjectVerification(sv: SubjectVerification): Record<string, string> {
  const out: Record<string, string> = {};
  const entries: [keyof SubjectVerification, string | undefined][] = [
    ["pan", sv.pan],
    ["aadhaarNumber", sv.aadhaarNumber],
    ["dateOfBirth", sv.dateOfBirth],
    ["fatherName", sv.fatherName],
    ["address", sv.address],
    ["documentId", sv.documentId],
    ["documentType", sv.documentType],
    ["bankAccountNumber", sv.bankAccountNumber],
    ["bankIfsc", sv.bankIfsc],
    ["bankPhoneNumber", sv.bankPhoneNumber],
    ["gstin", sv.gstin],
    ["cin", sv.cin],
    ["vehicleRegistrationNumber", sv.vehicleRegistrationNumber],
    ["email", sv.email],
    ["motherName", sv.motherName],
    ["documentDateOfBirth", sv.documentDateOfBirth],
  ];
  for (const [k, v] of entries) {
    const t = svTrim(v);
    if (t) out[k as string] = t;
  }
  return out;
}

export interface SubmitBgvReportBody {
  requesterId: string;
  /** Must match subscription `tenantId` (B2C: same as requester email). */
  tenantId?: string;
  subjectFullName: string;
  subjectPhone: string;
  /** Orchestrator check ids (e.g. `IDENTITY_PAN`); unknown uppercase codes are forwarded for new check types. */
  requestedChecks: readonly string[];
  /** Required for most real bundles — see {@link subjectVerificationRequirements}. */
  subjectVerification?: SubjectVerification;
}

export interface SubmitBgvReportResponse {
  reportId: string;
}

/** Thrown when a gateway call returns a non-OK status (e.g. entitlement / billing). */
export class BgvApiError extends Error {
  readonly status: number;
  readonly responseBody: string;

  constructor(message: string, status: number, responseBody: string) {
    super(message);
    this.name = "BgvApiError";
    this.status = status;
    this.responseBody = responseBody;
  }
}

/** Heuristic: orchestrator/billing rejected the request for quota / plan / subscription reasons. */
export function isLikelyEntitlementBlockedError(status: number, body: string): boolean {
  if (status === 402 || status === 403) return true;
  const b = (body ?? "").toLowerCase();
  if (
    /entitle|quota|subscription|insufficient|payment required|no active plan|plan required|not entitled|usage limit/i.test(
      b,
    )
  ) {
    return true;
  }
  return false;
}

/** Short, readable message from gateway JSON (`detail` / `message`) or a trimmed plain body. */
export function formatGatewayErrorBody(text: string): string {
  const t = (text ?? "").trim();
  if (!t) return "Request failed.";
  try {
    const j = JSON.parse(t) as { detail?: unknown; message?: unknown; title?: unknown };
    if (typeof j.detail === "string" && j.detail.trim()) return j.detail.trim();
    if (typeof j.message === "string" && j.message.trim()) return j.message.trim();
    if (typeof j.title === "string" && j.title.trim()) return j.title.trim();
  } catch {
    /* not JSON */
  }
  if (t.length > 280) return `${t.slice(0, 277)}…`;
  return t;
}

/**
 * Short copy for 402/403-style orchestrator or billing blocks (portal UX).
 * Prefer this over raw `detail` when `isLikelyEntitlementBlockedError` is true.
 */
export function mapEntitlementBlockedMessage(status: number, responseBody: string): string {
  const raw = formatGatewayErrorBody(responseBody);
  const blob = `${status} ${raw}`.toLowerCase();
  if (/quota|exhaust|usage limit|no remaining|insufficient|out of|limit reached/i.test(blob)) {
    return "Quota exhausted for this check. Open Plans & billing to top up or upgrade, or ask your admin.";
  }
  if (/not entitled|not included|forbidden|plan required|no active plan|feature|entitlement|402|403/i.test(blob)) {
    return "This check isn't included in your current plan, or your subscription isn't active. Open Plans & billing or contact your admin.";
  }
  return raw;
}

function unwrapBillingPayload<T>(raw: unknown): T {
  if (raw && typeof raw === "object") {
    const r = raw as { success?: boolean; data?: unknown; result?: unknown };
    /** Unwrap `data` when the call did not explicitly fail (matches common gateway envelopes). */
    if (r.success !== false && r.data != null) {
      return r.data as T;
    }
    /** Some gateways nest the Razorpay order under `result`. */
    if (r.success !== false && r.result != null && typeof r.result === "object") {
      return r.result as T;
    }
  }
  return raw as T;
}

/** Active billing plan row from `GET /api/v1/billing/plans`. */
export interface GatewayBillingPlan {
  id?: string;
  planId?: string;
  code?: string;
  name?: string;
  type?: string;
  price?: number;
  currency?: string;
  billingPeriod?: string;
  active?: boolean;
  features?: unknown[];
}

export function gatewayBillingPlanId(p: GatewayBillingPlan): string {
  return String(p.planId ?? p.id ?? "").trim();
}

export async function listBillingPlans(): Promise<GatewayBillingPlan[]> {
  const raw = await bgvJson<unknown>("/api/v1/billing/plans", { method: "GET" });
  const unwrapped = unwrapBillingPayload<unknown>(raw);
  if (Array.isArray(unwrapped)) return unwrapped as GatewayBillingPlan[];
  if (unwrapped && typeof unwrapped === "object") {
    const u = unwrapped as { content?: unknown; plans?: unknown; data?: unknown };
    if (Array.isArray(u.content)) return u.content as GatewayBillingPlan[];
    if (Array.isArray(u.plans)) return u.plans as GatewayBillingPlan[];
    if (u.data && typeof u.data === "object" && Array.isArray((u.data as { plans?: unknown }).plans)) {
      return (u.data as { plans: GatewayBillingPlan[] }).plans;
    }
  }
  return [];
}

export async function createBillingSubscription(
  planId: string,
  body: { userId: string; orgId?: string | null; tenantId?: string | null },
): Promise<unknown> {
  const userId = body.userId;
  return bgvJson<unknown>(`/api/v1/billing/subscriptions/${encodeURIComponent(planId)}`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      orgId: body.orgId ?? null,
      tenantId: body.tenantId ?? userId,
    }),
  });
}

/** Create Razorpay order for plan purchase (`planId`) or wallet top-up (`amountPaise` ≥ 100; mutually exclusive). */
export type RazorpayOrderCreateBody =
  | { userId: string; tenantId?: string | null; orgId?: string | null; planId: string }
  | { userId: string; tenantId?: string | null; orgId?: string | null; amountPaise: number };

export type RazorpayOrderResponse = {
  keyId: string;
  razorpayOrderId: string;
  amountPaise?: number;
  currency?: string;
};

function normalizeRazorpayOrder(raw: unknown): RazorpayOrderResponse {
  const root = unwrapBillingPayload<unknown>(raw);
  const o = root && typeof root === "object" ? (root as Record<string, unknown>) : {};

  /** Nested `order` / `razorpayOrder` objects (common gateway wrappers; Razorpay API uses `id` = order_…). */
  let orderNested: Record<string, unknown> | null = null;
  const orderRaw = o.order ?? o.razorpayOrder ?? o.razorpay_order;
  if (orderRaw && typeof orderRaw === "object") {
    orderNested = orderRaw as Record<string, unknown>;
  }

  const keyId =
    pickString(o, "keyId", "key_id", "key") ??
    (orderNested ? pickString(orderNested, "keyId", "key_id") : undefined) ??
    "";

  let razorpayOrderId =
    pickString(o, "razorpayOrderId", "razorpay_order_id", "orderId", "order_id") ?? "";
  if (!razorpayOrderId && orderNested) {
    razorpayOrderId =
      pickString(orderNested, "id", "order_id", "razorpay_order_id") ??
      (typeof orderNested.id === "string" ? orderNested.id : "");
  }
  /** Top-level `id` is only trusted when it looks like a Razorpay order id (avoid conflating with DB ids). */
  if (!razorpayOrderId) {
    const topId = typeof o.id === "string" ? o.id.trim() : "";
    if (topId.startsWith("order_")) {
      razorpayOrderId = topId;
    }
  }

  const amountPaise =
    typeof o.amountPaise === "number"
      ? o.amountPaise
      : typeof o.amount_paise === "number"
        ? o.amount_paise
        : undefined;
  const currency = pickString(o, "currency");
  return { keyId, razorpayOrderId, amountPaise, currency };
}

/**
 * Create a Razorpay order via the **gateway** (not configurable in this SPA).
 *
 * **Test vs live:** Keys and mode come from the gateway’s env (e.g. Razorpay Dashboard → API keys:
 * use **Test** keys for sandbox, **Live** keys for production). The gateway must return `keyId`
 * (e.g. `rzp_live_…` or `rzp_test_…`) and an order id (`order_…`) in the JSON body (possibly nested
 * under `data`, `result`, or `order`).
 */
export async function createRazorpayOrder(body: RazorpayOrderCreateBody): Promise<RazorpayOrderResponse> {
  const userId = body.userId.trim();
  const payload: Record<string, unknown> = {
    userId,
    tenantId: body.tenantId ?? userId,
    orgId: body.orgId ?? null,
  };
  if ("planId" in body) {
    payload.planId = body.planId;
  } else {
    payload.amountPaise = body.amountPaise;
  }
  const raw = await bgvJson<unknown>("/api/v1/billing/payments/razorpay/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return normalizeRazorpayOrder(raw);
}

/** Fields as returned by Razorpay Checkout `handler` (snake_case). */
export type RazorpayVerifyPayload = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

/** Wire shape for `POST .../razorpay/verify` — Spring expects camelCase JSON property names. */
type RazorpayVerifyRequestBody = {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
};

export type RazorpayVerifyResponse = {
  ok?: boolean;
  message?: string;
  walletBalancePaise?: number;
};

function normalizeRazorpayVerify(raw: unknown): RazorpayVerifyResponse {
  const root = unwrapBillingPayload<unknown>(raw);
  const o = root && typeof root === "object" ? (root as Record<string, unknown>) : {};
  return {
    ok: typeof o.ok === "boolean" ? o.ok : undefined,
    message: pickString(o, "message", "detail"),
    walletBalancePaise:
      typeof o.walletBalancePaise === "number"
        ? o.walletBalancePaise
        : typeof o.wallet_balance_paise === "number"
          ? o.wallet_balance_paise
          : undefined,
  };
}

export async function verifyRazorpayPayment(payload: RazorpayVerifyPayload): Promise<RazorpayVerifyResponse> {
  const body: RazorpayVerifyRequestBody = {
    razorpayPaymentId: payload.razorpay_payment_id.trim(),
    razorpayOrderId: payload.razorpay_order_id.trim(),
    razorpaySignature: payload.razorpay_signature.trim(),
  };
  const raw = await bgvJson<unknown>("/api/v1/billing/payments/razorpay/verify", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return normalizeRazorpayVerify(raw);
}

/** Treat these verify outcomes as success for UX, then refresh subscriptions. */
export function isRazorpayVerifySuccess(res: RazorpayVerifyResponse): boolean {
  if (res.ok !== true) return false;
  const m = (res.message ?? "").toLowerCase().trim();
  return m === "paid" || m === "already_paid" || m === "payment_already_applied";
}

export async function listMyBillingSubscriptions(userId: string): Promise<unknown> {
  const q = new URLSearchParams({ userId });
  const raw = await bgvJson<unknown>(`/api/v1/billing/subscriptions/me?${q}`, { method: "GET" });
  return unwrapBillingPayload<unknown>(raw);
}

/** Subscriptions we treat as “real” for list parsing (aligns with pickPrimarySubscription). */
const SUBSCRIPTION_ROW_USABLE_STATUSES = new Set([
  "ACTIVE",
  "TRIAL",
  "CONFIRMED",
  "PAID",
  "ENABLED",
  "RUNNING",
  "SUCCESS",
]);

function subscriptionRowStatusUpper(o: Record<string, unknown>): string {
  const s = o.status ?? o.subscriptionStatus ?? o.state;
  return typeof s === "string" ? s.trim().toUpperCase() : "";
}

/** True when the object looks like a subscription row, not HTTP metadata or a bare plan hint. */
function isGatewaySubscriptionRecord(x: unknown): boolean {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  if (o.plan && typeof o.plan === "object") return true;
  if (typeof o.subscriptionId === "string" && o.subscriptionId.trim()) return true;
  const planId = o.planId;
  if (planId != null && String(planId).trim()) return true;
  if (typeof o.planCode === "string" && o.planCode.trim()) {
    if (
      o.userId != null ||
      o.user_id != null ||
      o.tenantId != null ||
      o.tenant_id != null ||
      o.subscriptionId != null
    ) {
      return true;
    }
    const st = subscriptionRowStatusUpper(o);
    if (st && SUBSCRIPTION_ROW_USABLE_STATUSES.has(st)) return true;
  }
  return false;
}

export function normalizeGatewaySubscriptionList(raw: unknown): unknown[] {
  const root = unwrapBillingPayload<unknown>(raw);
  const takeArray = (arr: unknown[]): unknown[] => arr.filter((x) => isGatewaySubscriptionRecord(x));

  if (Array.isArray(root)) return takeArray(root);
  if (root && typeof root === "object") {
    const o = root as Record<string, unknown>;
    if (Array.isArray(o.data)) return takeArray(o.data);
    if (Array.isArray(o.content)) return takeArray(o.content);
    if (Array.isArray(o.subscriptions)) return takeArray(o.subscriptions);
    if (o.data != null && typeof o.data === "object" && !Array.isArray(o.data)) {
      const d = o.data;
      return isGatewaySubscriptionRecord(d) ? [d] : [];
    }
    if (isGatewaySubscriptionRecord(root)) return [root];
  }
  return [];
}

export interface BgvPipelineResponse {
  pipelineStatus?: string;
  expectedChecks?: string[];
  checksReceived?: string[];
  checksRemaining?: string[];
  progressPercent?: number;
}

export interface BgvReportDetailResponse {
  overallStatus?: string;
  scoringBreakdown?: Record<string, unknown>;
  requestedChecks?: string[];
  downloadUrl?: string | null;
  reportUrl?: string | null;
  generatedAt?: string | null;
  status?: string;
}

export interface BgvReportPdfStatusResponse {
  status?: string;
  pdfReady?: boolean;
  reportUrl?: string | null;
  downloadUrl?: string | null;
  generatedAt?: string | null;
}

export interface BgvReportSummary {
  reportId?: string;
  subjectFullName?: string;
  /** Candidate photo URL when the gateway returns one. */
  subjectPhotoUrl?: string | null;
  overallStatus?: string;
  status?: string;
  downloadUrl?: string | null;
  generatedAt?: string | null;
}

export interface BgvReportPage {
  content?: BgvReportSummary[];
  /** Total rows for this requester (all pages). */
  totalElements?: number;
  /** Total pages (Spring `Page.totalPages`). Optional — client can derive from totalElements/size. */
  totalPages?: number;
  /** Current page index, 0-based (Spring `Page.number`). */
  number?: number;
  pageSize?: number;
}

export interface BgvNotificationLogEntry {
  channel?: string;
  status?: string;
  recipient?: string;
  sentAt?: string;
  errorMessage?: string | null;
}

/** Log row with owning report (when merged from per-report endpoints). */
export type BgvNotificationLogEntryWithReport = BgvNotificationLogEntry & { reportId: string };

async function bgvFetch(path: string, init?: RequestInit): Promise<Response> {
  const { accessToken } = getStoredTokens();
  const headers = new Headers(init?.headers);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  if (init?.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(bgvApiUrl(path), { ...init, headers });
}

async function bgvJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await bgvFetch(path, init);
  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || `${res.status} ${res.statusText}`);
  }
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return {} as T;
  }
}

function pickString(obj: Record<string, unknown>, ...keys: string[]): string | undefined {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}

function pickFiniteNumber(...vals: unknown[]): number | undefined {
  for (const v of vals) {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string" && /^\d+$/.test(v.trim())) return parseInt(v.trim(), 10);
  }
  return undefined;
}

/** One row from `GET .../billing/subscriptions/me` → `featureBuckets` (shape varies by gateway). */
export type SubscriptionFeatureBucket = {
  featureCode: string;
  quota?: number;
  used?: number;
  remaining?: number;
};

function bucketFromRow(o: Record<string, unknown>): SubscriptionFeatureBucket | null {
  const code =
    pickString(o, "featureCode", "feature_code", "code", "key", "checkType", "check_type", "name") ?? "";
  if (!code) return null;
  return {
    featureCode: code,
    quota: pickFiniteNumber(o.quota, o.limit, o.total, o.max, o.maxQuota, o.max_quota),
    used: pickFiniteNumber(o.used, o.consumed, o.count, o.usage),
    remaining: pickFiniteNumber(o.remaining, o.balance, o.available, o.left),
  };
}

/**
 * Pull `featureBuckets` (or nested `plan.featureBuckets`) for entitlement UX — fully dynamic keys/numbers.
 */
export function extractFeatureBucketsFromSubscription(sub: unknown): SubscriptionFeatureBucket[] {
  if (!sub || typeof sub !== "object") return [];
  const o = sub as Record<string, unknown>;
  const collected: unknown[] = [];
  for (const key of ["featureBuckets", "feature_buckets", "buckets", "entitlementBuckets"]) {
    const v = o[key];
    if (Array.isArray(v)) collected.push(...v);
  }
  const plan = o.plan;
  if (plan && typeof plan === "object") {
    const p = plan as Record<string, unknown>;
    for (const key of ["featureBuckets", "feature_buckets", "buckets"]) {
      const v = p[key];
      if (Array.isArray(v)) collected.push(...v);
    }
  }
  const out: SubscriptionFeatureBucket[] = [];
  const seen = new Set<string>();
  for (const item of collected) {
    if (!item || typeof item !== "object") continue;
    const b = bucketFromRow(item as Record<string, unknown>);
    if (!b) continue;
    const k = b.featureCode.toUpperCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(b);
  }
  return out;
}

export function formatSubscriptionFeatureBucketLine(b: SubscriptionFeatureBucket): string {
  const parts: string[] = [b.featureCode];
  if (b.remaining != null) parts.push(`${b.remaining} left`);
  else if (b.quota != null && b.used != null) parts.push(`${b.used}/${b.quota} used`);
  else if (b.quota != null) parts.push(`${b.quota} included`);
  else if (b.used != null) parts.push(`${b.used} used`);
  return parts.join(" · ");
}

function scalarToReportId(v: unknown): string | null {
  if (typeof v === "string" && v.trim()) {
    const t = v.trim();
    return t.length >= 6 ? t : null;
  }
  if (typeof v === "number" && Number.isFinite(v)) {
    const s = String(v);
    return s.length >= 6 ? s : null;
  }
  return null;
}

/** Prefer explicit report* keys; avoid short generic `id` (e.g. numeric user ids). */
function pickReportIdFromObject(o: Record<string, unknown>): string | null {
  const explicitKeys = [
    "reportId",
    "report_id",
    "reportUUID",
    "reportUuid",
    "bgvReportId",
    "bgv_report_id",
    "verificationId",
    "verification_id",
    "uuid",
  ];
  for (const k of explicitKeys) {
    const id = scalarToReportId(o[k]);
    if (id) return id;
  }
  const generic = scalarToReportId(o.id);
  if (generic && generic.length >= 8) return generic;
  return null;
}

/** Pull report id from typical Spring / gateway response shapes. */
export function parseReportIdFromGatewayBody(parsed: unknown): string | null {
  if (parsed == null) return null;
  if (typeof parsed === "string") {
    const t = parsed.trim();
    if (!t) return null;
    if (t.startsWith("{") || t.startsWith("[")) {
      try {
        return parseReportIdFromGatewayBody(JSON.parse(t));
      } catch {
        return null;
      }
    }
    if (t.length >= 8 && /^[\w.-]+$/.test(t)) return t;
    return null;
  }
  if (Array.isArray(parsed) && parsed.length > 0) {
    return parseReportIdFromGatewayBody(parsed[0]);
  }
  if (typeof parsed !== "object") return null;
  const o = parsed as Record<string, unknown>;
  const direct = pickReportIdFromObject(o);
  if (direct) return direct;
  for (const nest of ["data", "result", "payload", "body", "response"] as const) {
    const inner = o[nest];
    if (inner != null) {
      const id = parseReportIdFromGatewayBody(inner);
      if (id) return id;
    }
  }
  /* Case-insensitive shallow scan (some gateways use odd casing) */
  for (const [key, val] of Object.entries(o)) {
    if (/report/i.test(key) && /id|uuid/i.test(key)) {
      const id = scalarToReportId(val);
      if (id) return id;
    }
  }
  return null;
}

function reportIdFromLocationHeader(loc: string | null): string | null {
  if (!loc?.trim()) return null;
  const trimmed = loc.trim();
  const reportsIdx = trimmed.indexOf("/reports/");
  if (reportsIdx >= 0) {
    const after = trimmed.slice(reportsIdx + "/reports/".length).split(/[/?#]/)[0];
    if (after && after.length >= 8) return after;
  }
  const parts = trimmed.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  if (last && last.length >= 8 && /^[\w.-]+$/.test(last)) return last;
  return null;
}

function reportIdFromResponseHeaders(res: Response): string | null {
  const x =
    res.headers.get("X-Report-Id")?.trim() ||
    res.headers.get("X-Report-ID")?.trim() ||
    res.headers.get("Report-Id")?.trim();
  /** Do not use X-Request-Id — it is often a correlation id, not the BGV report id. */
  if (x && x.length >= 8) return x;
  const loc =
    reportIdFromLocationHeader(res.headers.get("Location")) ||
    reportIdFromLocationHeader(res.headers.get("Content-Location"));
  return loc;
}

/**
 * Submit BGV report. Handles 200/202 with empty body, nested JSON, or id in Location / X-Report-Id.
 */
export async function submitBgvReport(body: SubmitBgvReportBody): Promise<SubmitBgvReportResponse> {
  const tenantId = body.tenantId ?? body.requesterId;
  const payload: Record<string, unknown> = {
    requesterId: body.requesterId,
    tenantId,
    subjectFullName: body.subjectFullName,
    subjectPhone: body.subjectPhone,
    requestedChecks: [...body.requestedChecks],
  };
  if (body.subjectVerification && typeof body.subjectVerification === "object") {
    const compact = compactSubjectVerification(body.subjectVerification);
    if (Object.keys(compact).length > 0) {
      payload.subjectVerification = compact;
    }
  }
  const res = await bgvFetch("/api/v1/orchestrator/reports", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new BgvApiError(text || `${res.status} ${res.statusText}`, res.status, text);
  }

  let parsed: unknown = null;
  if (text.trim()) {
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      parsed = text.trim();
    }
  }

  const fromBody = parseReportIdFromGatewayBody(parsed);
  const fromHeaders = reportIdFromResponseHeaders(res);
  const id = fromBody || fromHeaders;

  if (!id) {
    const preview = text.trim() ? text.slice(0, 400) : "(empty response body)";
    throw new Error(
      `Gateway returned ${res.status} but no reportId was found. ` +
        `Expected JSON with reportId (or id / data.reportId), a Location header, or X-Report-Id. Raw preview: ${preview}`,
    );
  }

  return { reportId: id };
}

/**
 * @deprecated Same as {@link submitBgvReport}. The app does not call the consent grant endpoint; use
 * {@link submitBgvReport} directly. {@link grantBgvConsent} remains available for manual / tooling use.
 */
export async function submitBgvReportAndGrantConsent(body: SubmitBgvReportBody): Promise<SubmitBgvReportResponse> {
  return submitBgvReport(body);
}

const CONSENT_GRANT_MAX_ATTEMPTS = 8;
const CONSENT_GRANT_RETRY_BASE_MS = 400;

/**
 * Optional: `POST /api/v1/consent/{reportId}/grant`. Not used by the app UI; backend may handle consent
 * elsewhere. Retries on 404 while the consent service catches up.
 */
export async function grantBgvConsent(reportId: string): Promise<void> {
  let lastStatus = 0;
  let lastBody = "";
  for (let attempt = 0; attempt < CONSENT_GRANT_MAX_ATTEMPTS; attempt++) {
    if (attempt > 0) {
      const delay = CONSENT_GRANT_RETRY_BASE_MS * Math.min(attempt, 4);
      await new Promise((r) => setTimeout(r, delay));
    }
    const res = await bgvFetch(`/api/v1/consent/${encodeURIComponent(reportId)}/grant`, {
      method: "POST",
    });
    if (res.ok) return;
    lastStatus = res.status;
    lastBody = await res.text();
    if (res.status === 404 && attempt < CONSENT_GRANT_MAX_ATTEMPTS - 1) {
      continue;
    }
    throw new Error(formatGatewayErrorBody(lastBody) || `${res.status} ${res.statusText}`);
  }
  throw new Error(formatGatewayErrorBody(lastBody) || `${lastStatus}`);
}

export async function getBgvPipeline(reportId: string): Promise<BgvPipelineResponse> {
  return bgvJson<BgvPipelineResponse>(
    `/api/v1/aggregation/reports/${encodeURIComponent(reportId)}/pipeline`,
  );
}

export async function getBgvReportDetail(reportId: string): Promise<BgvReportDetailResponse> {
  return bgvJson<BgvReportDetailResponse>(`/api/v1/reports/${encodeURIComponent(reportId)}`);
}

export async function getBgvReportPdfStatus(reportId: string): Promise<BgvReportPdfStatusResponse> {
  return bgvJson<BgvReportPdfStatusResponse>(
    `/api/v1/reports/${encodeURIComponent(reportId)}/status`,
  );
}

function normalizeReportSummaryRow(raw: unknown): BgvReportSummary {
  if (!raw || typeof raw !== "object") return {};
  const o = raw as Record<string, unknown>;
  const rid =
    pickString(o, "reportId", "report_id", "id") ??
    (typeof o.id === "number" && Number.isFinite(o.id) ? String(o.id) : undefined);
  return {
    reportId: rid,
    subjectFullName: pickString(o, "subjectFullName", "subject_full_name", "subjectName", "subject_name"),
    subjectPhotoUrl: pickString(o, "subjectPhotoUrl", "subject_photo_url", "photoUrl", "avatarUrl"),
    overallStatus: pickString(o, "overallStatus", "overall_status"),
    status: pickString(o, "status"),
    downloadUrl:
      typeof o.downloadUrl === "string"
        ? o.downloadUrl
        : typeof o.download_url === "string"
          ? o.download_url
          : null,
    generatedAt: pickString(o, "generatedAt", "generated_at", "createdAt", "created_at"),
  };
}

/** Optional filters for `GET /api/v1/reports`. Extra fields require gateway support. */
export type ListBgvReportsQuery = {
  /** Sort by report date: `desc` = newest first, `asc` = oldest first. */
  sortDir?: "asc" | "desc";
  /**
   * Search by subject name and/or report id (substring). **Gateway must implement** — until then
   * the UI still filters the current page client-side.
   */
  q?: string;
  /**
   * Filter by derived row status: `pending` | `in_progress` | `completed` | `failed`. **Gateway must implement.**
   */
  status?: string;
  /**
   * Match report id (substring or exact; gateway defines). **Gateway must implement** for full-list filtering.
   */
  reportId?: string;
  /**
   * Inclusive lower bound on report generated date (`YYYY-MM-DD` recommended). **Gateway must implement.**
   */
  startDate?: string;
  /**
   * Inclusive upper bound on report generated date (`YYYY-MM-DD` recommended). **Gateway must implement.**
   */
  endDate?: string;
};

/**
 * Paged list of BGV reports for a requester.
 *
 * **Query:** `requesterId`, `page` (0-based), `size`, `sortDir` (`desc` | `asc`). Optional: `q`, `status`, `reportId`, `startDate`, `endDate` (if supported by gateway).
 *
 * **Backend contract:** Return a Spring `Page`-shaped JSON (or equivalent) so the UI can paginate:
 * - `content`: array of report summaries
 * - `totalElements` (or `total_elements`): total rows for this requester across all pages — **required for correct pagination**
 * - `totalPages` / `total_pages` (optional): if omitted, UI derives `ceil(totalElements / size)`
 * - `number` (optional): current page index — should match requested `page`
 * - `size` (optional): page size — should match requested `size`
 */
export async function listBgvReports(
  requesterId: string,
  page = 0,
  size = 20,
  query?: ListBgvReportsQuery,
): Promise<BgvReportPage> {
  const sortDir = query?.sortDir === "asc" ? "asc" : "desc";
  const q = new URLSearchParams({
    requesterId,
    page: String(page),
    size: String(size),
    sortDir,
  });
  const search = query?.q?.trim();
  if (search) q.set("q", search);
  const st = query?.status?.trim();
  if (st && st !== "all") q.set("status", st);
  const rid = query?.reportId?.trim();
  if (rid) q.set("reportId", rid);
  const sd = query?.startDate?.trim();
  if (sd) q.set("startDate", sd);
  const ed = query?.endDate?.trim();
  if (ed) q.set("endDate", ed);
  const raw = await bgvJson<unknown>(`/api/v1/reports?${q}`);
  if (Array.isArray(raw)) {
    const content = raw.map(normalizeReportSummaryRow);
    const n = content.length;
    return {
      content,
      totalElements: n,
      totalPages: n > 0 ? 1 : 0,
      number: 0,
      pageSize: size,
    };
  }
  const rec = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const rawContent = rec.content;
  const content: BgvReportSummary[] = Array.isArray(rawContent)
    ? rawContent.map(normalizeReportSummaryRow)
    : [];
  const total =
    typeof rec.totalElements === "number"
      ? rec.totalElements
      : typeof rec.total_elements === "number"
        ? rec.total_elements
        : content.length;
  const totalPagesRaw =
    typeof rec.totalPages === "number"
      ? rec.totalPages
      : typeof rec.total_pages === "number"
        ? rec.total_pages
        : undefined;
  const numberRaw =
    typeof rec.number === "number"
      ? rec.number
      : typeof rec.page === "number"
        ? rec.page
        : undefined;
  const sizeRaw = typeof rec.size === "number" ? rec.size : size;
  const derivedTotalPages =
    totalPagesRaw ??
    (total > 0 && sizeRaw > 0 ? Math.max(1, Math.ceil(total / sizeRaw)) : content.length > 0 ? 1 : 0);
  return {
    content,
    totalElements: total,
    totalPages: derivedTotalPages,
    number: numberRaw ?? page,
    pageSize: sizeRaw,
  };
}

/** Operator / debug: recent logs without requester filter (avoid in tenant UI). */
export async function listBgvNotificationLogs(limit = 20): Promise<BgvNotificationLogEntry[]> {
  const raw = await bgvJson<unknown>(`/api/v1/notifications/logs?limit=${limit}`);
  if (Array.isArray(raw)) return raw as BgvNotificationLogEntry[];
  if (raw && typeof raw === "object" && Array.isArray((raw as { content?: unknown }).content)) {
    return (raw as { content: BgvNotificationLogEntry[] }).content;
  }
  return [];
}

export async function listBgvNotificationLogsForReport(
  reportId: string,
): Promise<BgvNotificationLogEntry[]> {
  const raw = await bgvJson<unknown>(
    `/api/v1/notifications/logs/${encodeURIComponent(reportId)}`,
  );
  if (Array.isArray(raw)) return raw as BgvNotificationLogEntry[];
  return [];
}

function parseNotificationLogsArray(raw: unknown): BgvNotificationLogEntry[] {
  if (Array.isArray(raw)) return raw as BgvNotificationLogEntry[];
  if (raw && typeof raw === "object" && Array.isArray((raw as { content?: unknown }).content)) {
    return (raw as { content: BgvNotificationLogEntry[] }).content;
  }
  return [];
}

function attachReportIdFromEntry(
  e: BgvNotificationLogEntry,
): BgvNotificationLogEntryWithReport {
  const o = e as Record<string, unknown>;
  const reportId =
    (typeof o.reportId === "string" && o.reportId.trim()) ||
    (typeof o.report_id === "string" && o.report_id.trim()) ||
    (typeof o.reportId === "number" && Number.isFinite(o.reportId) ? String(o.reportId) : "") ||
    (typeof o.report_id === "number" && Number.isFinite(o.report_id) ? String(o.report_id) : "") ||
    "";
  return { ...e, reportId: reportId || "—" };
}

/** Paged delivery log response for requester-scoped `GET /api/v1/notifications/logs`. */
export type NotificationLogsForRequesterPage = {
  entries: BgvNotificationLogEntryWithReport[];
  totalElements: number;
  totalPages: number;
};

function parseNotificationLogsForRequesterPage(raw: unknown, pageSize: number): NotificationLogsForRequesterPage {
  const empty: NotificationLogsForRequesterPage = { entries: [], totalElements: 0, totalPages: 0 };
  if (raw == null) return empty;
  const entries = parseNotificationLogsArray(raw).map((e) => attachReportIdFromEntry(e));
  if (Array.isArray(raw)) {
    const n = entries.length;
    return {
      entries,
      totalElements: n,
      totalPages: n > 0 ? Math.max(1, Math.ceil(n / Math.max(1, pageSize))) : 0,
    };
  }
  if (typeof raw === "object") {
    const rec = raw as Record<string, unknown>;
    const total =
      typeof rec.totalElements === "number"
        ? rec.totalElements
        : typeof rec.total_elements === "number"
          ? rec.total_elements
          : entries.length;
    const totalPagesRaw =
      typeof rec.totalPages === "number"
        ? rec.totalPages
        : typeof rec.total_pages === "number"
          ? rec.total_pages
          : undefined;
    const ps = typeof rec.size === "number" ? rec.size : pageSize;
    const derived =
      totalPagesRaw ??
      (total > 0 && ps > 0 ? Math.max(1, Math.ceil(total / ps)) : entries.length > 0 ? 1 : 0);
    return {
      entries,
      totalElements: total,
      totalPages: total === 0 ? 0 : Math.max(1, derived),
    };
  }
  return empty;
}

/**
 * Delivery history for **this requester only** — `GET /api/v1/notifications/logs?requesterId=&page=&size=`
 * **Backend:** Support Spring-style `page` (0-based) and `size` on this route, and return `totalElements` /
 * `totalPages` (or `total_elements` / `total_pages`) so pagination is correct. If the gateway ignores `page` /
 * `size`, the UI may only show the first chunk until the API is updated.
 */
export async function listBgvNotificationLogsForRequester(
  requesterId: string,
  options?: { page?: number; pageSize?: number },
): Promise<NotificationLogsForRequesterPage> {
  const rid = requesterId.trim();
  if (!rid) return { entries: [], totalElements: 0, totalPages: 0 };
  const pageSize = Math.min(100, Math.max(1, options?.pageSize ?? 10));
  const page = Math.max(0, options?.page ?? 0);
  const q = new URLSearchParams({
    requesterId: rid,
    page: String(page),
    size: String(pageSize),
  });
  const raw = await bgvJson<unknown>(`/api/v1/notifications/logs?${q}`);
  return parseNotificationLogsForRequesterPage(raw, pageSize);
}

/**
 * PDF download URL — same host as all BGV/auth calls (`verifyStackGatewayUrl`).
 * Production default: `https://verify.verifystack.in/api/v1/reports/{id}/download`
 * (or relative `/api/v1/...` when the SPA is served from that same host).
 */
export function bgvReportDownloadHref(reportId: string): string {
  return bgvApiUrl(`/api/v1/reports/${encodeURIComponent(reportId)}/download`);
}

/**
 * HTML report page — same gateway host as the API (default `verify.verifystack.in`).
 * Dev: `/api/bgv/dashboard/report.html?reportId=...` → Vite proxy → gateway.
 */
export function bgvReportHtmlViewHref(reportId: string): string {
  const base = bgvApiUrl("/dashboard/report.html");
  const q = new URLSearchParams({ reportId: reportId.trim() });
  return base.includes("?") ? `${base}&${q}` : `${base}?${q}`;
}

export type BgvUiStatus = "completed" | "in_progress" | "pending" | "failed";

export function bgvReportRowStatus(r: BgvReportSummary): BgvUiStatus {
  const st = (r.status ?? "").toUpperCase();
  if (st === "FAILED" || st === "FAIL") return "failed";
  if (st === "UPLOADED") return "completed";
  if (st === "GENERATING") return "in_progress";
  if (st === "INITIATED") return "pending";
  if (r.overallStatus && ["GREEN", "AMBER", "RED"].includes(r.overallStatus)) return "completed";
  return "pending";
}

export function overallStatusToScore(overall?: string): number | null {
  const u = (overall ?? "").toUpperCase();
  if (u === "GREEN") return 88;
  if (u === "AMBER") return 62;
  if (u === "RED") return 35;
  return null;
}

/** Preferred order for `requestedChecks` when deriving from a plan (subset allowed). */
export const BGV_CANONICAL_FULL_CHECKS: readonly BgvCheckType[] = [
  "IDENTITY_PAN",
  "IDENTITY_AADHAAR",
  "EMPLOYMENT_EPFO",
  "COURT_RECORD",
  "CREDIT_REPORT",
];

/**
 * Billing plan `featureCode` → orchestrator check type (`GET .../billing/catalog/check-feature-codes`).
 * Credit: plan feature `CIBIL_CHECK` → request body `CREDIT_REPORT`.
 */
export const PLAN_FEATURE_CODE_TO_BG_CHECK: Readonly<Record<string, BgvCheckType>> = {
  IDENTITY_PAN: "IDENTITY_PAN",
  IDENTITY_AADHAAR: "IDENTITY_AADHAAR",
  EMPLOYMENT_EPFO: "EMPLOYMENT_EPFO",
  COURT_RECORD: "COURT_RECORD",
  CIBIL_CHECK: "CREDIT_REPORT",
  /** Some gateways send orchestrator check names as feature codes. */
  CREDIT_REPORT: "CREDIT_REPORT",
  PAN: "IDENTITY_PAN",
  AADHAAR: "IDENTITY_AADHAAR",
  EPFO: "EMPLOYMENT_EPFO",
  EPFO_CHECK: "EMPLOYMENT_EPFO",
  EMPLOYMENT: "EMPLOYMENT_EPFO",
  COURT: "COURT_RECORD",
  COURT_CHECK: "COURT_RECORD",
  CREDIT: "CREDIT_REPORT",
  CIBIL: "CREDIT_REPORT",
};

const CANONICAL_CHECK_SET = new Set<string>(BGV_CANONICAL_FULL_CHECKS as unknown as string[]);
const KNOWN_CHECK_ORDER = BGV_CANONICAL_FULL_CHECKS as readonly string[];

/** Normalize billing feature tokens for lookup (hyphens, spaces → underscores). */
function normalizeFeatureCodeToken(raw: string): string {
  return raw
    .trim()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_")
    .replace(/_+/g, "_")
    .toUpperCase();
}

export function extractFeatureCodesFromPlanFeaturesArray(features: unknown): string[] {
  if (features == null) return [];
  const list = Array.isArray(features) ? features : [features];
  const out: string[] = [];
  for (const f of list) {
    if (typeof f === "string" && f.trim()) {
      out.push(f.trim());
      continue;
    }
    if (f && typeof f === "object") {
      const o = f as Record<string, unknown>;
      const code =
        (typeof o.featureCode === "string" && o.featureCode.trim()) ||
        (typeof o.feature_code === "string" && o.feature_code.trim()) ||
        (typeof o.featureId === "string" && o.featureId.trim()) ||
        (typeof o.feature_id === "string" && o.feature_id.trim()) ||
        (typeof o.code === "string" && o.code.trim()) ||
        (typeof o.slug === "string" && o.slug.trim()) ||
        (typeof o.key === "string" && o.key.trim()) ||
        (typeof o.type === "string" && /^[A-Z][A-Z0-9_]*$/i.test(o.type.trim()) ? o.type.trim() : "") ||
        (typeof o.name === "string" && o.name.trim() && /^[A-Z][A-Z0-9_]*$/i.test(o.name.trim())
          ? o.name.trim()
          : "");
      if (code) out.push(code);
    }
  }
  return out;
}

function extractFeatureCodesFromSubscriptionOrPlanRecord(rec: Record<string, unknown>): string[] {
  const keys = [
    "features",
    "planFeatures",
    "plan_features",
    "featureCodes",
    "feature_codes",
    "featureList",
    "entitlements",
    "entitlementList",
    "enabledFeatures",
    "items",
    "checks",
    "requestedChecks",
  ];
  for (const k of keys) {
    const v = rec[k];
    const got = extractFeatureCodesFromPlanFeaturesArray(v);
    if (got.length > 0) return got;
  }
  if (Array.isArray(rec.featureCodes) && (rec.featureCodes as unknown[]).every((x) => typeof x === "string")) {
    return (rec.featureCodes as string[]).map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

/**
 * Map plan `featureCode` values to orchestrator `requestedChecks` strings.
 * Known codes use {@link PLAN_FEATURE_CODE_TO_BG_CHECK}; canonical checks keep stable order;
 * other `FEATURE_CODE` shapes are forwarded so new checks work without a frontend map update
 * (orchestrator still validates).
 */
export function requestedChecksFromPlanFeatureCodes(featureCodes: string[]): string[] {
  const want = new Set<string>();
  for (const fc of featureCodes) {
    const u = normalizeFeatureCodeToken(fc);
    if (!u) continue;
    const mapped = PLAN_FEATURE_CODE_TO_BG_CHECK[u];
    if (mapped) {
      want.add(mapped);
      continue;
    }
    if (CANONICAL_CHECK_SET.has(u)) {
      want.add(u);
      continue;
    }
    if (/^[A-Z][A-Z0-9_]*$/.test(u)) {
      want.add(u);
    }
  }
  const ordered = KNOWN_CHECK_ORDER.filter((c) => want.has(c));
  const extras = [...want].filter((c) => !KNOWN_CHECK_ORDER.includes(c)).sort();
  return [...ordered, ...extras];
}

function subscriptionStatusUpper(sub: unknown): string {
  if (!sub || typeof sub !== "object") return "";
  const s = (sub as Record<string, unknown>).status;
  return typeof s === "string" ? s.trim().toUpperCase() : "";
}

/** Prefer a usable subscription row; otherwise first row. */
export function pickPrimarySubscription(subs: unknown[]): unknown | null {
  if (!Array.isArray(subs) || subs.length === 0) return null;
  const good = subs.find((s) => SUBSCRIPTION_ROW_USABLE_STATUSES.has(subscriptionStatusUpper(s)));
  if (good) return good;
  return subs[0];
}

function catalogPlanMatch(
  sub: Record<string, unknown>,
  plan: GatewayBillingPlan,
): boolean {
  const pid =
    (typeof sub.planId === "string" && sub.planId.trim()) ||
    (typeof sub.plan_id === "string" && sub.plan_id.trim()) ||
    "";
  const pcode =
    (typeof sub.planCode === "string" && sub.planCode.trim()) ||
    (typeof sub.plan_code === "string" && sub.plan_code.trim()) ||
    "";
  const nested = sub.plan && typeof sub.plan === "object" ? (sub.plan as Record<string, unknown>) : null;
  const pcodeNested =
    nested &&
    ((typeof nested.code === "string" && nested.code.trim()) ||
      (typeof nested.planCode === "string" && nested.planCode.trim()) ||
      "");
  const id = gatewayBillingPlanId(plan);
  const code = (plan.code ?? "").trim();
  if (pid && (id === pid || code === pid)) return true;
  if (pcode && code.toUpperCase() === pcode.toUpperCase()) return true;
  if (pcode && id.toUpperCase() === pcode.toUpperCase()) return true;
  if (pcodeNested && code.toUpperCase() === pcodeNested.toUpperCase()) return true;
  if (pcodeNested && id.toUpperCase() === pcodeNested.toUpperCase()) return true;
  if (pcodeNested && pcode && pcodeNested.toUpperCase() === pcode.toUpperCase()) return true;
  return false;
}

/**
 * When the API returns a known plan code but no feature list, assume full BGV pack (operator “standard” plans).
 * Adjust if your catalog uses different codes.
 */
const DEFAULT_FEATURE_CODES_BY_PLAN_CODE: Readonly<Record<string, readonly string[]>> = {
  BGV_STANDARD: ["IDENTITY_PAN", "IDENTITY_AADHAAR", "EMPLOYMENT_EPFO", "COURT_RECORD", "CIBIL_CHECK"],
  BGV_FULL: ["IDENTITY_PAN", "IDENTITY_AADHAAR", "EMPLOYMENT_EPFO", "COURT_RECORD", "CIBIL_CHECK"],
  STANDARD: ["IDENTITY_PAN", "IDENTITY_AADHAAR", "EMPLOYMENT_EPFO", "COURT_RECORD", "CIBIL_CHECK"],
};

/**
 * Feature codes for the user’s plan: embedded `plan.features`, subscription-level features, or catalog match
 * by planId **or** planCode (operators often return code only, e.g. BGV_STANDARD).
 */
export function resolvePlanFeatureCodesForSubscription(
  sub: unknown,
  plansCatalog: GatewayBillingPlan[],
): string[] {
  if (!sub || typeof sub !== "object") return [];
  const o = sub as Record<string, unknown>;
  const plan = o.plan;
  if (plan && typeof plan === "object") {
    const pObj = plan as Record<string, unknown>;
    const fromPlan = extractFeatureCodesFromSubscriptionOrPlanRecord(pObj);
    if (fromPlan.length > 0) return fromPlan;
  }
  const fromSub = extractFeatureCodesFromSubscriptionOrPlanRecord(o);
  if (fromSub.length > 0) return fromSub;

  const catalog = Array.isArray(plansCatalog) ? plansCatalog : [];
  if (catalog.length === 0) {
    const subOnly =
      (typeof o.planCode === "string" && o.planCode.trim()) ||
      (typeof o.plan_code === "string" && o.plan_code.trim()) ||
      "";
    const key = subOnly.trim().toUpperCase();
    const fallback = DEFAULT_FEATURE_CODES_BY_PLAN_CODE[key];
    return fallback ? [...fallback] : [];
  }

  const match =
    catalog.find((p) => catalogPlanMatch(o, p)) ??
    catalog.find((p) => {
      const nested = o.plan && typeof o.plan === "object" ? (o.plan as Record<string, unknown>) : null;
      const nid =
        nested &&
        ((typeof nested.planId === "string" && nested.planId.trim()) ||
          (typeof nested.id === "string" && nested.id.trim()) ||
          (typeof nested.code === "string" && nested.code.trim()) ||
          "");
      if (!nid) return false;
      return gatewayBillingPlanId(p) === nid || (p.code ?? "").trim() === nid.trim();
    });

  if (match) {
    const fromCatalog = extractFeatureCodesFromSubscriptionOrPlanRecord(match as unknown as Record<string, unknown>);
    if (fromCatalog.length > 0) return fromCatalog;
    if (Array.isArray(match.features) && match.features.length > 0) {
      return extractFeatureCodesFromPlanFeaturesArray(match.features);
    }
    const code = (match.code ?? "").trim().toUpperCase();
    const fb = DEFAULT_FEATURE_CODES_BY_PLAN_CODE[code];
    if (fb) return [...fb];
  }

  const subCode =
    (typeof o.planCode === "string" && o.planCode.trim()) ||
    (typeof o.plan_code === "string" && o.plan_code.trim()) ||
    "";
  const subKey = subCode.trim().toUpperCase();
  const subFb = DEFAULT_FEATURE_CODES_BY_PLAN_CODE[subKey];
  return subFb ? [...subFb] : [];
}

/** Checks to send for `POST .../orchestrator/reports` from active subscription + published plans list. */
export function resolveRequestedChecksFromSubscriptions(
  subs: unknown[],
  plansCatalog: GatewayBillingPlan[],
): string[] {
  const sub = pickPrimarySubscription(subs);
  if (!sub) return [];
  const codes = resolvePlanFeatureCodesForSubscription(sub, plansCatalog);
  return requestedChecksFromPlanFeatureCodes(codes);
}

/**
 * UI / Postman presets — optional; UI uses `resolveRequestedChecksFromSubscriptions` instead.
 * `CREDIT_REPORT` requires plan feature `CIBIL_CHECK` on the gateway.
 */
export const BGV_CHECK_PRESETS = {
  full: [...BGV_CANONICAL_FULL_CHECKS] as BgvCheckType[],
  panCourt: ["IDENTITY_PAN", "COURT_RECORD"] as BgvCheckType[],
};
