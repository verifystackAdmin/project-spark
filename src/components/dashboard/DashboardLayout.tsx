import { useState, useEffect, useCallback, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import {
  DASHBOARD_OVERLAY_MAX_PX,
  useDashboardNavOverlay,
} from "@/hooks/useDashboardNavBreakpoint";
import {
  Shield,
  Plus,
  FileText,
  User,
  Settings,
  LogOut,
  Bell,
  CreditCard,
  Menu,
  X,
} from "lucide-react";

const SIDEBAR_EXPANDED_KEY = "verifystack-dashboard-sidebar-expanded";

function readDockedSidebarExpanded(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const v = sessionStorage.getItem(SIDEBAR_EXPANDED_KEY);
    if (v === "0") return false;
    if (v === "1") return true;
  } catch {
    /* ignore */
  }
  return true;
}

function writeDockedSidebarExpanded(expanded: boolean) {
  try {
    sessionStorage.setItem(SIDEBAR_EXPANDED_KEY, expanded ? "1" : "0");
  } catch {
    /* ignore */
  }
}

const NAV_ITEMS = [
  { icon: Shield, label: "Dashboard", href: "/dashboard" },
  { icon: Plus, label: "New Check", href: "/run-check" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
] as const;

function getInitials(name?: string | null, email?: string | null) {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
  if (email?.trim()) return email.substring(0, 2).toUpperCase();
  return "U";
}

export type DashboardLayoutProps = {
  /** Page title, or screen-reader label when `headerLeading` is used */
  title: string;
  children: ReactNode;
  /** Inner content wrapper (default matches wide dashboard pages) */
  contentClassName?: string;
  showFooter?: boolean;
  /** Extra content after the menu (e.g. search). Use with `headerLeadingLayout`. */
  headerLeading?: ReactNode;
  /**
   * `replace-title` — only `headerLeading` is visible; `title` is screen-reader only (dashboard home).
   * `beside-title` — show `title` as `<h1>` and `headerLeading` next to it (e.g. reports search).
   */
  headerLeadingLayout?: "replace-title" | "beside-title";
  /** Actions in the top bar (e.g. Refresh) — sits before notifications */
  headerTrailing?: ReactNode;
};

export function DashboardLayout({
  title,
  children,
  contentClassName = "min-w-0 w-full max-w-6xl mx-auto p-4 sm:p-6",
  showFooter = true,
  headerLeading,
  headerLeadingLayout = "replace-title",
  headerTrailing,
}: DashboardLayoutProps) {
  const isOverlay = useDashboardNavOverlay();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.innerWidth <= DASHBOARD_OVERLAY_MAX_PX) return false;
    return readDockedSidebarExpanded();
  });
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (isOverlay) {
      setSidebarOpen(false);
      return;
    }
    setSidebarOpen(readDockedSidebarExpanded());
  }, [isOverlay]);

  const closeOverlaySidebar = () => {
    if (isOverlay) setSidebarOpen(false);
  };

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((open) => {
      const next = !open;
      if (!isOverlay) writeDockedSidebarExpanded(next);
      return next;
    });
  }, [isOverlay]);

  return (
    <div className="min-h-screen bg-background flex">
      {isOverlay && sidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed left-0 top-0 flex h-full flex-col border-r border-border/50 bg-card transition-transform duration-300 ease-out lg:transition-[width,transform] lg:duration-300",
          isOverlay
            ? cn("z-50 w-64 max-w-[85vw] shadow-2xl", sidebarOpen ? "translate-x-0" : "-translate-x-full")
            : cn("z-40", sidebarOpen ? "w-64" : "w-20"),
        )}
        aria-label="Account navigation"
        aria-hidden={isOverlay && !sidebarOpen}
      >
        <div className="flex h-20 shrink-0 items-center gap-2 border-b border-border/50 px-4 sm:px-6">
          <Link
            to="/"
            className="flex min-w-0 flex-1 items-center gap-2"
            onClick={closeOverlaySidebar}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <span className="truncate text-lg font-bold text-foreground">
                Verify<span className="text-primary">Stack</span>
              </span>
            )}
          </Link>
          {isOverlay && sidebarOpen ? (
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              title={!sidebarOpen && !isOverlay ? item.label : undefined}
              onClick={closeOverlaySidebar}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="shrink-0 border-t border-border/50 p-4">
          <button
            type="button"
            onClick={() => {
              closeOverlaySidebar();
              void logout();
            }}
            title={!sidebarOpen && !isOverlay ? "Logout" : undefined}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <main
        className={cn(
          "flex min-h-0 min-w-0 w-full max-w-[100vw] flex-1 flex-col overflow-x-hidden transition-[margin] duration-300 ml-0",
          !isOverlay && (sidebarOpen ? "lg:ml-64" : "lg:ml-20"),
        )}
      >
        <header
          className={cn(
            "sticky top-0 z-20 shrink-0 border-b border-border/50 bg-card/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-card/80 sm:px-6",
            "flex flex-col gap-3 py-3 md:h-20 md:flex-row md:items-center md:justify-between md:gap-4 md:py-0",
          )}
        >
          {/* Row 1 (mobile): menu, title, notifications + profile — no cramped search/actions here */}
          <div className="flex w-full min-w-0 items-center gap-2 md:contents">
            <div className="flex min-w-0 flex-1 items-center gap-2 md:min-w-0 md:flex-1 md:gap-3">
              <button
                type="button"
                onClick={toggleSidebar}
                className="shrink-0 rounded-lg p-2 transition-colors hover:bg-muted"
                aria-expanded={sidebarOpen}
                aria-label={
                  isOverlay
                    ? sidebarOpen
                      ? "Close navigation menu"
                      : "Open navigation menu"
                    : sidebarOpen
                      ? "Collapse sidebar"
                      : "Expand sidebar"
                }
              >
                <Menu className="h-6 w-6 text-muted-foreground" />
              </button>

              {headerLeading ? (
                headerLeadingLayout === "beside-title" ? (
                  <>
                    <h1 className="min-w-0 flex-1 truncate text-base font-semibold text-foreground sm:text-lg md:shrink-0 md:flex-none md:text-xl">
                      {title}
                    </h1>
                    {/* Desktop/tablet: search beside title */}
                    <div className="hidden min-w-0 max-w-md flex-1 md:block">{headerLeading}</div>
                  </>
                ) : (
                  <>
                    <span className="sr-only">{title}</span>
                    <div className="hidden min-w-0 flex-1 md:block md:max-w-md">{headerLeading}</div>
                  </>
                )
              ) : (
                <h1 className="min-w-0 flex-1 truncate text-base font-semibold text-foreground sm:text-lg md:text-xl">
                  {title}
                </h1>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
              <div className="hidden items-center gap-2 md:flex">{headerTrailing}</div>
              <button
                type="button"
                className="rounded-lg p-2 transition-colors hover:bg-muted"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 text-muted-foreground" />
              </button>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground sm:h-10 sm:w-10 sm:text-sm">
                {getInitials(user?.name, user?.email)}
              </div>
            </div>
          </div>

          {/* Mobile: full-width search (beside-title or replace-title with leading) */}
          {headerLeading ? (
            <div className="w-full min-w-0 md:hidden">{headerLeading}</div>
          ) : null}

          {/* Mobile: actions below search so Refresh / CTAs are not clipped */}
          {headerTrailing ? (
            <div className="flex w-full min-w-0 flex-wrap items-center gap-2 md:hidden">{headerTrailing}</div>
          ) : null}
        </header>

        <div className={cn("flex-1", contentClassName)}>{children}</div>
        {showFooter ? <Footer /> : null}
      </main>
    </div>
  );
}
