import type {
  AuthSessionRow,
  MeProfileData,
  PatchMeRequest,
  ProfileNotifications,
} from "@/lib/authProfileTypes";

export function defaultNotifications(): ProfileNotifications {
  return {
    email: true,
    sms: false,
    reportCompletion: true,
    securityAlerts: true,
    marketing: false,
  };
}

/** Map GET /me `data` into stable form state. */
export function normalizeMeProfile(raw: Partial<MeProfileData> & Record<string, unknown>): MeProfileData {
  const n = raw.notifications as Partial<ProfileNotifications> | undefined;
  const def = defaultNotifications();
  return {
    name: String(raw.name ?? ""),
    phone: raw.phone ?? null,
    organization: raw.organization ?? null,
    jobTitle: raw.jobTitle ?? null,
    location: raw.location ?? null,
    language: raw.language ?? "en",
    timezone: raw.timezone ?? "Asia/Kolkata",
    twoFactorEnabled: Boolean(raw.twoFactorEnabled),
    notifications: {
      ...def,
      ...n,
    },
    email: String(raw.email ?? ""),
    role: String(raw.role ?? ""),
    authProvider: raw.authProvider ?? null,
    createdAt: raw.createdAt ?? null,
    passwordChangedAt: raw.passwordChangedAt ?? null,
  };
}

function normalizeSession(raw: unknown): AuthSessionRow {
  if (!raw || typeof raw !== "object") {
    return { sessionId: "" };
  }
  const r = raw as Record<string, unknown>;
  const sessionId = String(r.sessionId ?? r.id ?? "");
  return {
    sessionId,
    device:
      r.device != null
        ? String(r.device)
        : r.deviceName != null
          ? String(r.deviceName)
          : null,
    browser: r.browser != null ? String(r.browser) : null,
    ip: r.ip != null ? String(r.ip) : r.ipAddress != null ? String(r.ipAddress) : null,
    created: r.created != null ? String(r.created) : null,
    createdAt: r.createdAt != null ? String(r.createdAt) : null,
    current: Boolean(r.current ?? r.isCurrent),
  };
}

/** Accepts `data` from `{ success, data }` where data is an array or `{ sessions }`. */
export function parseSessionsPayload(data: unknown): AuthSessionRow[] {
  if (data == null) return [];
  let list: unknown[] = [];
  if (Array.isArray(data)) {
    list = data;
  } else if (typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (Array.isArray(o.sessions)) {
      list = o.sessions;
    } else if (Array.isArray(o.items)) {
      list = o.items;
    }
  }
  return list.map(normalizeSession).filter((s) => s.sessionId.length > 0);
}

function eqField(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if ((a == null || a === "") && (b == null || b === "")) return true;
  return false;
}

/** Build PATCH /me body: only changed scalar fields; notifications only includes changed toggles. */
export function buildPatchMe(baseline: MeProfileData, draft: MeProfileData): PatchMeRequest | null {
  const patch: PatchMeRequest = {};
  if (!eqField(baseline.name, draft.name)) patch.name = draft.name;
  if (!eqField(baseline.phone ?? "", draft.phone ?? "")) patch.phone = draft.phone ?? null;
  if (!eqField(baseline.organization ?? "", draft.organization ?? "")) {
    patch.organization = draft.organization ?? null;
  }
  if (!eqField(baseline.jobTitle ?? "", draft.jobTitle ?? "")) patch.jobTitle = draft.jobTitle ?? null;
  if (!eqField(baseline.location ?? "", draft.location ?? "")) patch.location = draft.location ?? null;
  if (!eqField(baseline.language ?? "", draft.language ?? "")) patch.language = draft.language ?? "";
  if (!eqField(baseline.timezone ?? "", draft.timezone ?? "")) patch.timezone = draft.timezone ?? "";
  if (baseline.twoFactorEnabled !== draft.twoFactorEnabled) {
    patch.twoFactorEnabled = draft.twoFactorEnabled;
  }

  const notif: Partial<ProfileNotifications> = {};
  (Object.keys(baseline.notifications) as (keyof ProfileNotifications)[]).forEach((k) => {
    if (baseline.notifications[k] !== draft.notifications[k]) {
      notif[k] = draft.notifications[k];
    }
  });
  if (Object.keys(notif).length > 0) {
    patch.notifications = notif;
  }

  if (Object.keys(patch).length === 0) return null;
  return patch;
}
