import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  useProfile,
  useUpdateProfile,
  useSessions,
  useRevokeSession,
  useChangePassword,
  useDeleteAccount,
} from "@/hooks/useAuthProfile";
import { buildPatchMe } from "@/lib/authProfileApi";
import type { MeProfileData, PatchMeRequest } from "@/lib/authProfileTypes";
import {
  User,
  Shield,
  Bell,
  Trash2,
  Loader2,
  Monitor,
  Smartphone,
  KeyRound,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AccountSettingsTab = "profile" | "security" | "preferences" | "danger";

function formatIsoDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function sessionLabel(s: {
  device?: string | null;
  browser?: string | null;
  ip?: string | null;
  created?: string | null;
  createdAt?: string | null;
}): string {
  const parts = [s.browser, s.device].filter(Boolean);
  if (parts.length > 0) return parts.join(" · ");
  return "Session";
}

export function AccountSettingsTabs({
  defaultTab = "profile",
  className,
}: {
  defaultTab?: AccountSettingsTab;
  className?: string;
}) {
  const { toast } = useToast();
  const { logout, forgotPassword, user: authUser } = useAuth();
  const { data: profile, isLoading, error, refetch } = useProfile();
  const updateProfile = useUpdateProfile();
  const { data: sessions = [], isLoading: sessionsLoading, refetch: refetchSessions } = useSessions();
  const revokeSession = useRevokeSession();
  const changePassword = useChangePassword();
  const deleteAccount = useDeleteAccount();

  const [draft, setDraft] = useState<MeProfileData | null>(null);
  const [baseline, setBaseline] = useState<MeProfileData | null>(null);

  useEffect(() => {
    if (profile) {
      setBaseline(profile);
      setDraft(profile);
    }
  }, [profile]);

  const [pwdOpen, setPwdOpen] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [resetLinkSending, setResetLinkSending] = useState(false);

  const [revokeId, setRevokeId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const applyServerProfile = (next: MeProfileData) => {
    setBaseline(next);
    setDraft(next);
  };

  const handleSaveIdentity = async () => {
    if (!baseline || !draft) return;
    const full = buildPatchMe(baseline, draft);
    if (!full) {
      toast({ title: "No changes", description: "Nothing to save." });
      return;
    }
    const identityKeys = ["name", "phone", "organization", "jobTitle", "location"] as const;
    const patch: PatchMeRequest = {};
    for (const k of identityKeys) {
      if (k in full) {
        (patch as Record<string, unknown>)[k] = full[k];
      }
    }
    if (Object.keys(patch).length === 0) {
      toast({ title: "No changes", description: "Nothing to save on this tab." });
      return;
    }
    try {
      const updated = await updateProfile.mutateAsync(patch);
      if (updated) applyServerProfile(updated);
      else await refetch().then((r) => r.data && applyServerProfile(r.data));
      toast({ title: "Profile updated", description: "Your details were saved." });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Could not save",
        description: e instanceof Error ? e.message : "Try again.",
      });
    }
  };

  const handleSavePreferences = async () => {
    if (!baseline || !draft) return;
    const full = buildPatchMe(baseline, draft);
    if (!full) {
      toast({ title: "No changes", description: "Nothing to save." });
      return;
    }
    const prefKeys = ["language", "timezone", "notifications"] as const;
    const patch: PatchMeRequest = {};
    for (const k of prefKeys) {
      if (k in full) {
        (patch as Record<string, unknown>)[k] = full[k];
      }
    }
    if (Object.keys(patch).length === 0) {
      toast({ title: "No changes", description: "Nothing to save on this tab." });
      return;
    }
    try {
      const updated = await updateProfile.mutateAsync(patch);
      if (updated) applyServerProfile(updated);
      else await refetch().then((r) => r.data && applyServerProfile(r.data));
      toast({ title: "Preferences saved", description: "Your settings were updated." });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Could not save",
        description: e instanceof Error ? e.message : "Try again.",
      });
    }
  };

  const handle2FA = async (enabled: boolean) => {
    if (!baseline) return;
    if (baseline.twoFactorEnabled === enabled) return;
    try {
      const updated = await updateProfile.mutateAsync({ twoFactorEnabled: enabled });
      if (updated) applyServerProfile(updated);
      else {
        setBaseline((b) => (b ? { ...b, twoFactorEnabled: enabled } : b));
        setDraft((d) => (d ? { ...d, twoFactorEnabled: enabled } : d));
      }
      toast({
        title: enabled ? "2FA enabled" : "2FA disabled",
        description: "Your two-factor setting was updated.",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: e instanceof Error ? e.message : "Try again.",
      });
    }
  };

  const accountEmail = authUser?.email?.trim() || draft?.email?.trim() || "";

  const sendPasswordResetLink = async () => {
    if (!accountEmail) {
      toast({
        variant: "destructive",
        title: "No email on file",
        description: "Add an email to your profile or sign in with an email-based account.",
      });
      return;
    }
    setResetLinkSending(true);
    try {
      await forgotPassword(accountEmail);
    } catch {
      /* AuthContext already shows error toast */
    } finally {
      setResetLinkSending(false);
    }
  };

  const submitPasswordChange = async () => {
    if (!currentPwd.trim()) {
      toast({
        variant: "destructive",
        title: "Current password required",
        description: 'Enter your current password, or use "Email me a reset link" if you forgot it.',
      });
      return;
    }
    if (newPwd.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Use at least 8 characters.",
      });
      return;
    }
    if (newPwd !== confirmPwd) {
      toast({
        variant: "destructive",
        title: "Mismatch",
        description: "New password and confirmation must match.",
      });
      return;
    }
    try {
      const res = await changePassword.mutateAsync({
        currentPassword: currentPwd,
        newPassword: newPwd,
      });
      if (res && typeof res === "object" && "success" in res && res.success === false) {
        throw new Error(res.message || "Password change failed");
      }
      setPwdOpen(false);
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
      const extra =
        res.data?.signOutOtherDevices === true
          ? " Other devices may have been signed out."
          : "";
      toast({
        title: "Password updated",
        description: (res.message || "Your password was changed.") + extra,
      });
      void refetch();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Could not change password",
        description: e instanceof Error ? e.message : "Try again.",
      });
    }
  };

  const confirmRevokeSession = async () => {
    if (!revokeId) return;
    try {
      await revokeSession.mutateAsync(revokeId);
      toast({ title: "Session revoked", description: "That device was signed out." });
      setRevokeId(null);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Revoke failed",
        description: e instanceof Error ? e.message : "Try again.",
      });
    }
  };

  const confirmDeleteAccount = async () => {
    try {
      const body =
        deletePassword.trim().length > 0 ? { password: deletePassword.trim() } : undefined;
      await deleteAccount.mutateAsync(body);
      setDeleteOpen(false);
      toast({
        title: "Account deleted",
        description: "Your account has been removed.",
      });
      logout();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Could not delete account",
        description: e instanceof Error ? e.message : "Try again.",
      });
    }
  };

  if (error && !draft) {
    return (
      <Card className={cn("border-destructive/30 shadow-sm", className)}>
        <CardHeader>
          <CardTitle className="text-destructive">We couldn&apos;t load your account</CardTitle>
          <CardDescription>
            {error instanceof Error ? error.message : "Check your connection and try again."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="button" variant="secondary" onClick={() => void refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading && !draft) {
    return (
      <Card className={cn("border-border/80 py-16 shadow-sm", className)}>
        <CardContent className="flex flex-col items-center justify-center gap-3 text-center text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden />
          <p className="text-sm font-medium text-foreground">Securing your workspace…</p>
          <p className="max-w-sm text-xs">Loading your profile and preferences.</p>
        </CardContent>
      </Card>
    );
  }

  if (!draft) return null;

  const initials = draft.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  return (
    <div className={cn("min-w-0", className)}>
      <Card className="overflow-hidden border-border/80 shadow-sm">
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="border-b border-border/60 bg-muted/25 px-4 py-4 sm:px-6">
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-background/80 p-1">
              <TabsTrigger value="profile" className="gap-1.5">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-1.5">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-1.5">
                <Bell className="h-4 w-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger
                value="danger"
                className="gap-1.5 text-destructive data-[state=active]:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Danger zone
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <TabsContent value="profile" className="mt-0 outline-none focus-visible:ring-0">
              <div className="rounded-xl border border-border/60 bg-card/30">
                <div className="border-b border-border/50 px-4 py-4 sm:px-6 sm:py-5">
                  <h3 className="text-base font-semibold text-foreground">Profile &amp; contact</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This is how you appear on reports and emails. Sign-in email and role are managed by your
                    account and can&apos;t be edited here.
                  </p>
                </div>
                <div className="space-y-8 p-4 sm:p-6">
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                    <div className="flex flex-col items-center gap-3 lg:w-44 lg:shrink-0 lg:items-start">
                      <div
                        className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-3xl font-bold text-primary-foreground shadow-md"
                        aria-hidden
                      >
                        {initials}
                      </div>
                      <div className="text-center lg:text-left">
                        <p className="font-semibold text-foreground">{draft.name}</p>
                        <p className="text-sm text-muted-foreground">{draft.jobTitle || "Your role"}</p>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="acct-name">Full name</Label>
                          <Input
                            id="acct-name"
                            value={draft.name}
                            onChange={(e) => setDraft((d) => (d ? { ...d, name: e.target.value } : d))}
                            autoComplete="name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="acct-phone">Phone</Label>
                          <Input
                            id="acct-phone"
                            value={draft.phone ?? ""}
                            onChange={(e) =>
                              setDraft((d) => (d ? { ...d, phone: e.target.value || null } : d))
                            }
                            autoComplete="tel"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="acct-org">Organization</Label>
                          <Input
                            id="acct-org"
                            value={draft.organization ?? ""}
                            onChange={(e) =>
                              setDraft((d) => (d ? { ...d, organization: e.target.value || null } : d))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="acct-job">Job title</Label>
                          <Input
                            id="acct-job"
                            value={draft.jobTitle ?? ""}
                            onChange={(e) =>
                              setDraft((d) => (d ? { ...d, jobTitle: e.target.value || null } : d))
                            }
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="acct-location">Location</Label>
                          <Input
                            id="acct-location"
                            value={draft.location ?? ""}
                            onChange={(e) =>
                              setDraft((d) => (d ? { ...d, location: e.target.value || null } : d))
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-muted-foreground">
                          Changes apply to future reports and notifications.
                        </p>
                        <Button
                          type="button"
                          className="w-full sm:w-auto"
                          onClick={() => void handleSaveIdentity()}
                          disabled={updateProfile.isPending}
                        >
                          {updateProfile.isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          Save profile
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4 sm:p-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Account details
                    </p>
                    <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="mt-0.5 break-all font-medium text-foreground">{draft.email || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Role</p>
                        <p className="mt-0.5 font-medium text-foreground">{draft.role || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Sign-in method</p>
                        <p className="mt-0.5 font-medium capitalize text-foreground">
                          {draft.authProvider || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Member since</p>
                        <p className="mt-0.5 font-medium text-foreground">{formatIsoDate(draft.createdAt)}</p>
                      </div>
                      <div className="sm:col-span-2 lg:col-span-2">
                        <p className="text-muted-foreground">Password last updated</p>
                        <p className="mt-0.5 font-medium text-foreground">
                          {formatIsoDate(draft.passwordChangedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-0 space-y-6 outline-none focus-visible:ring-0">
          <Card className="border-border/60 shadow-none">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                A strong password keeps your verification data and reports safe.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button type="button" variant="outline" className="gap-2 w-fit" onClick={() => setPwdOpen(true)}>
                  <KeyRound className="h-4 w-4" />
                  Change password
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-fit gap-2"
                  disabled={resetLinkSending || !accountEmail}
                  onClick={() => void sendPasswordResetLink()}
                >
                  {resetLinkSending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Email me a reset link
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Same flow as{" "}
                <Link to="/forgot-password" className="font-medium text-primary underline-offset-4 hover:underline">
                  Forgot password
                </Link>
                : we email {accountEmail ? <span className="font-mono text-foreground">{accountEmail}</span> : "your"}{" "}
                a link to set a new password. Use this if you don&apos;t remember your current password.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-none">
            <CardHeader>
              <CardTitle>Two-factor authentication</CardTitle>
              <CardDescription>
                Turn on 2FA so only you can access reports and billing, even if a password leaks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 p-4">
                <div>
                  <p className="font-medium text-foreground">2FA</p>
                  <p className="text-sm text-muted-foreground">
                    {draft.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </p>
                </div>
                <Switch
                  checked={draft.twoFactorEnabled}
                  onCheckedChange={(v) => void handle2FA(v)}
                  disabled={updateProfile.isPending}
                  aria-label="Toggle two-factor authentication"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-none">
            <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle>Active sessions</CardTitle>
                <CardDescription>Every device that can access your VerifyStack account right now.</CardDescription>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => void refetchSessions()}
                disabled={sessionsLoading}
              >
                {sessionsLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {sessionsLoading && sessions.length === 0 ? (
                <p className="text-sm text-muted-foreground">Loading your sessions…</p>
              ) : sessions.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border/60 bg-muted/20 px-4 py-6 text-center text-sm text-muted-foreground">
                  When you sign in from a phone or another browser, it will appear here so you can review or
                  sign it out anytime.
                </p>
              ) : (
                sessions.map((s) => {
                  const Icon = s.current ? Monitor : Smartphone;
                  return (
                    <div
                      key={s.sessionId}
                      className="flex flex-col gap-3 rounded-xl border border-border/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" aria-hidden />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">{sessionLabel(s)}</p>
                          <p className="text-sm text-muted-foreground">
                            {[s.ip, formatIsoDate(s.createdAt ?? s.created)].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                      </div>
                      {s.current ? (
                        <span className="shrink-0 text-xs font-medium text-trust">This device</span>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setRevokeId(s.sessionId)}
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-0 space-y-6 outline-none focus-visible:ring-0">
          <Card className="border-border/60 shadow-none">
            <CardHeader>
              <CardTitle>Regional</CardTitle>
              <CardDescription>How dates and times appear across your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="acct-lang">Language</Label>
                  <Select
                    value={draft.language ?? "en"}
                    onValueChange={(v) => setDraft((d) => (d ? { ...d, language: v } : d))}
                  >
                    <SelectTrigger id="acct-lang">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                      <SelectItem value="mr">Marathi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="acct-tz">Timezone</Label>
                  <Select
                    value={draft.timezone ?? "Asia/Kolkata"}
                    onValueChange={(v) => setDraft((d) => (d ? { ...d, timezone: v } : d))}
                  >
                    <SelectTrigger id="acct-tz">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
                      <SelectItem value="America/New_York">Eastern (ET)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Asia/Singapore">Singapore (SGT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-none">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Stay informed when a report is ready or something needs your attention—without the noise.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(
                [
                  ["email", "Email", "Account and product email"],
                  ["sms", "SMS", "Text messages"],
                  ["reportCompletion", "Report completion", "When a verification report is ready"],
                  ["securityAlerts", "Security alerts", "Logins and security events"],
                  ["marketing", "Marketing", "Tips and product updates"],
                ] as const
              ).map(([key, title, desc]) => (
                <div key={key}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Label htmlFor={`notif-${key}`}>{title}</Label>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                    <Switch
                      id={`notif-${key}`}
                      checked={draft.notifications[key]}
                      onCheckedChange={(v) =>
                        setDraft((d) =>
                          d
                            ? {
                                ...d,
                                notifications: { ...d.notifications, [key]: v },
                              }
                            : d,
                        )
                      }
                    />
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
              <Button
                type="button"
                onClick={() => void handleSavePreferences()}
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Save preferences
              </Button>
            </CardContent>
          </Card>
            </TabsContent>

            <TabsContent value="danger" className="mt-0 outline-none focus-visible:ring-0">
          <Card className="border-destructive/35 shadow-none">
            <CardHeader>
              <CardTitle className="text-destructive">Delete account</CardTitle>
              <CardDescription>
                This removes your VerifyStack account and access to reports. This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button type="button" variant="destructive" className="gap-2" onClick={() => setDeleteOpen(true)}>
                <Trash2 className="h-4 w-4" />
                Delete my account
              </Button>
            </CardContent>
          </Card>
            </TabsContent>
          </div>
        </Tabs>
      </Card>

      <Dialog open={pwdOpen} onOpenChange={setPwdOpen}>
        <DialogContent className="sm:max-w-md" aria-describedby="pwd-desc">
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription id="pwd-desc">
              Enter your current password and a new password (min. 8 characters). If you forgot your current
              password, close this dialog and use &quot;Email me a reset link&quot; — same as the forgot-password
              page.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="pwd-current">Current password</Label>
              <Input
                id="pwd-current"
                type="password"
                autoComplete="current-password"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pwd-new">New password</Label>
              <Input
                id="pwd-new"
                type="password"
                autoComplete="new-password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pwd-confirm">Confirm new password</Label>
              <Input
                id="pwd-confirm"
                type="password"
                autoComplete="new-password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="link"
              className="h-auto px-0 text-muted-foreground"
              disabled={resetLinkSending || !accountEmail}
              onClick={() => void sendPasswordResetLink()}
            >
              {resetLinkSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Email reset link instead
            </Button>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={() => setPwdOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={() => void submitPasswordChange()} disabled={changePassword.isPending}>
                {changePassword.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update password"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!revokeId} onOpenChange={(o) => !o && setRevokeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke this session?</AlertDialogTitle>
            <AlertDialogDescription>
              That device will be signed out and need to sign in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                void confirmRevokeSession();
              }}
            >
              {revokeSession.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Revoke"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes your account. If your organization requires it, enter your password
              to confirm.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="delete-pwd">Password (optional)</Label>
            <Input
              id="delete-pwd"
              type="password"
              autoComplete="current-password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                void confirmDeleteAccount();
              }}
            >
              {deleteAccount.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete forever"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
