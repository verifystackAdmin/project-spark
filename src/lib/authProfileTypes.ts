/**
 * Types aligned with API gateway `/api/v1/auth` profile & account endpoints.
 */

export interface ProfileNotifications {
  email: boolean;
  sms: boolean;
  reportCompletion: boolean;
  securityAlerts: boolean;
  marketing: boolean;
}

/** Payload from GET /me `data` (after `{ success, data }`). */
export interface MeProfileData {
  name: string;
  phone?: string | null;
  organization?: string | null;
  jobTitle?: string | null;
  location?: string | null;
  language?: string | null;
  timezone?: string | null;
  twoFactorEnabled: boolean;
  notifications: ProfileNotifications;
  /** Read-only */
  email: string;
  /** Read-only */
  role: string;
  authProvider?: string | null;
  createdAt?: string | null;
  passwordChangedAt?: string | null;
}

/** PATCH /me — only send changed fields; `notifications` only includes toggles that changed. */
export type PatchMeRequest = Partial<{
  name: string;
  phone: string | null;
  organization: string | null;
  jobTitle: string | null;
  location: string | null;
  language: string | null;
  timezone: string | null;
  twoFactorEnabled: boolean;
  notifications: Partial<ProfileNotifications>;
}>;

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface DeleteAccountRequest {
  password?: string;
}

/** Session row as returned by GET /sessions (normalized in UI). */
export interface AuthSessionRow {
  sessionId: string;
  device?: string | null;
  browser?: string | null;
  ip?: string | null;
  created?: string | null;
  createdAt?: string | null;
  current?: boolean;
}

export type MeApiResponse = {
  success: boolean;
  data?: MeProfileData;
  message?: string | null;
};

export type SessionsApiResponse = {
  success: boolean;
  data?: unknown;
  message?: string | null;
};

export type ChangePasswordApiResponse = {
  success: boolean;
  message?: string | null;
  data?: {
    signOutOtherDevices?: boolean;
    [key: string]: unknown;
  };
};
