import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApiClient } from "@/lib/api";
import { normalizeMeProfile, parseSessionsPayload } from "@/lib/authProfileApi";
import type { ChangePasswordRequest, DeleteAccountRequest, MeProfileData, PatchMeRequest } from "@/lib/authProfileTypes";

export { buildPatchMe } from "@/lib/authProfileApi";

export const authProfileQueryKeys = {
  all: ["authProfile"] as const,
  me: () => [...authProfileQueryKeys.all, "me"] as const,
  sessions: () => [...authProfileQueryKeys.all, "sessions"] as const,
};

async function fetchMeProfile(): Promise<MeProfileData> {
  const res = await authApiClient.getMe();
  if (!res.success || !res.data) {
    throw new Error(res.message || "Failed to load profile");
  }
  return normalizeMeProfile(res.data as MeProfileData & Record<string, unknown>);
}

/** GET /me — normalized profile for forms. */
export function useProfile() {
  return useQuery({
    queryKey: authProfileQueryKeys.me(),
    queryFn: fetchMeProfile,
    staleTime: 30_000,
  });
}

/** PATCH /me with partial body; merges returned `data` into cache when present. */
export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: PatchMeRequest) => {
      const res = await authApiClient.patchMe(patch);
      if (!res.success) {
        throw new Error(res.message || "Failed to update profile");
      }
      return res.data ? normalizeMeProfile(res.data as MeProfileData & Record<string, unknown>) : null;
    },
    onSuccess: (updated) => {
      if (updated) {
        qc.setQueryData(authProfileQueryKeys.me(), updated);
      } else {
        void qc.invalidateQueries({ queryKey: authProfileQueryKeys.me() });
      }
    },
  });
}

async function fetchSessions() {
  const res = await authApiClient.getSessions();
  if (!res.success) {
    throw new Error(res.message || "Failed to load sessions");
  }
  return parseSessionsPayload(res.data);
}

/** GET /sessions */
export function useSessions() {
  return useQuery({
    queryKey: authProfileQueryKeys.sessions(),
    queryFn: fetchSessions,
    staleTime: 15_000,
  });
}

/** DELETE /sessions/:id */
export function useRevokeSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => authApiClient.deleteSession(sessionId),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: authProfileQueryKeys.sessions() });
    },
  });
}

/** POST /change-password */
export function useChangePassword() {
  return useMutation({
    mutationFn: (body: ChangePasswordRequest) => authApiClient.changePassword(body),
  });
}

/** DELETE /account — 204 */
export function useDeleteAccount() {
  return useMutation({
    mutationFn: (body?: DeleteAccountRequest) => authApiClient.deleteAccount(body),
  });
}
