import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TrustScoreGauge from "@/components/TrustScoreGauge";
import VerificationResultCard from "@/components/VerificationResultCard";
import { useAuth } from "@/contexts/AuthContext";
import {
  Shield,
  Plus,
  FileText,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  CreditCard,
  Clock,
  Download,
  UserCheck,
  FileSearch,
  Phone,
  Globe,
  AlertTriangle,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: Shield, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Plus, label: "New Check", href: "/run-check" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const recentReports = [
  {
    id: 1,
    name: "Rahul Sharma",
    type: "Identity + Social",
    score: 87,
    date: "Dec 10, 2024",
    status: "completed",
  },
  {
    id: 2,
    name: "Priya Patel",
    type: "Full Verification",
    score: 92,
    date: "Dec 9, 2024",
    status: "completed",
  },
  {
    id: 3,
    name: "Amit Kumar",
    type: "Relationship Analysis",
    score: 65,
    date: "Dec 8, 2024",
    status: "completed",
  },
  {
    id: 4,
    name: "New Check",
    type: "Identity",
    score: 0,
    date: "In Progress",
    status: "pending",
  },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout, logoutAll } = useAuth();
  const documentsUploaded = localStorage.getItem('documentsUploaded') === 'true';

  const dynamicSidebarItems = [
    { icon: Shield, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Plus, label: "New Check", href: "/run-check" },
    { icon: FileText, label: "Reports", href: "/dashboard/reports" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-card border-r border-border/50 z-40 transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-border/50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold text-foreground">
                Verify<span className="text-primary">Me</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {dynamicSidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                item.active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* Header */}
        <header className="h-20 bg-card border-b border-border/50 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <svg
                className="w-6 h-6 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reports..."
                className="pl-10 pr-4 py-2 bg-muted rounded-xl border-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
              {getInitials(user?.name, user?.email)}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome back, {user?.name || user?.email || 'User'}!
            </h1>
            <p className="text-muted-foreground">
              Here's an overview of your verification activity.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Checks", value: "47", icon: FileText, color: "text-primary" },
              { label: "This Month", value: "12", icon: Clock, color: "text-accent" },
              { label: "Avg. Trust Score", value: "84", icon: Shield, color: "text-trust" },
              { label: "Credits Left", value: "38", icon: CreditCard, color: "text-warning" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl border border-border/50 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("w-12 h-12 rounded-xl bg-muted flex items-center justify-center", stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Reports */}
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Recent Reports
                </h2>
                <Link to="/run-check">
                  <Button variant="default" size="sm">
                    <Plus className="w-4 h-4" />
                    New Check
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-semibold">
                      {report.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {report.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {report.type} • {report.date}
                      </p>
                    </div>
                    {report.status === "completed" ? (
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "text-sm font-semibold px-3 py-1 rounded-full",
                            report.score >= 80
                              ? "bg-trust/10 text-trust"
                              : report.score >= 60
                              ? "bg-accent/10 text-accent"
                              : "bg-warning/10 text-warning"
                          )}
                        >
                          Score: {report.score}
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground animate-pulse">
                        Processing...
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Trust Score */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Latest Verification
              </h2>
              <div className="flex justify-center mb-6">
                <TrustScoreGauge score={87} size="md" />
              </div>
              <div className="space-y-3">
                <VerificationResultCard
                  icon={UserCheck}
                  title="Identity"
                  description="Verified"
                  status="verified"
                />
                <VerificationResultCard
                  icon={FileSearch}
                  title="Documents"
                  description="Authentic"
                  status="verified"
                />
                <VerificationResultCard
                  icon={Phone}
                  title="Phone"
                  description="Credible"
                  status="verified"
                />
                <VerificationResultCard
                  icon={Globe}
                  title="Social"
                  description="Minor concerns"
                  status="warning"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
const getInitials = (name?: string, email?: string) => {
  if (name) {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
  if (email) {
    return email.substring(0, 2).toUpperCase();
  }
  return 'U'; // User
};
