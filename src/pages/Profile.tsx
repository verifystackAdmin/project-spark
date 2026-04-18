import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AccountSettingsTabs } from "@/components/dashboard/account/AccountSettingsTabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings, ShieldCheck } from "lucide-react";

const Profile = () => {
  return (
    <DashboardLayout
      title="Profile"
      contentClassName="min-w-0 w-full max-w-6xl mx-auto p-4 sm:p-6"
      showFooter={false}
    >
      <div className="mb-6 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 via-card to-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <ShieldCheck className="h-6 w-6" aria-hidden />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Your trusted identity on VerifyStack
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Keep your name and contact details accurate—they appear on verification reports and emails so
                everyone knows who stands behind each check.
              </p>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="shrink-0 gap-2 self-start sm:self-center" asChild>
            <Link to="/dashboard/settings">
              <Settings className="h-4 w-4" />
              Security &amp; preferences
            </Link>
          </Button>
        </div>
      </div>
      <AccountSettingsTabs defaultTab="profile" />
    </DashboardLayout>
  );
};

export default Profile;
