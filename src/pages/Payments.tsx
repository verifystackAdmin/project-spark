import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  Download,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: Shield, label: "Dashboard", href: "/dashboard" },
  { icon: Plus, label: "New Check", href: "/run-check" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: CreditCard, label: "Payments", href: "/dashboard/payments", active: true },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const paymentHistory = [
  {
    id: "PAY-2024-001",
    date: "Jan 5, 2024",
    amount: 2999,
    plan: "Premium Monthly",
    status: "success",
    method: "UPI",
    reference: "UPI123456789012",
  },
  {
    id: "PAY-2024-002",
    date: "Dec 5, 2023",
    amount: 2999,
    plan: "Premium Monthly",
    status: "success",
    method: "Credit Card",
    reference: "CARD****4532",
  },
  {
    id: "PAY-2024-003",
    date: "Nov 5, 2023",
    amount: 2999,
    plan: "Premium Monthly",
    status: "success",
    method: "UPI",
    reference: "UPI987654321098",
  },
  {
    id: "PAY-2024-004",
    date: "Oct 5, 2023",
    amount: 999,
    plan: "Basic Monthly",
    status: "refunded",
    method: "Credit Card",
    reference: "CARD****7821",
  },
  {
    id: "PAY-2024-005",
    date: "Sep 5, 2023",
    amount: 999,
    plan: "Basic Monthly",
    status: "failed",
    method: "Net Banking",
    reference: "NB456123789",
  },
];

const Payments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <span className="flex items-center gap-1.5 text-trust bg-trust/10 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            Success
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1.5 text-warning bg-warning/10 px-3 py-1 rounded-full text-sm font-medium">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      case "failed":
        return (
          <span className="flex items-center gap-1.5 text-danger bg-danger/10 px-3 py-1 rounded-full text-sm font-medium">
            <XCircle className="w-3.5 h-3.5" />
            Failed
          </span>
        );
      case "refunded":
        return (
          <span className="flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1 rounded-full text-sm font-medium">
            <RefreshCw className="w-3.5 h-3.5" />
            Refunded
          </span>
        );
      default:
        return null;
    }
  };

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
                Verify<span className="text-primary">Stack</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
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
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
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
            <h1 className="text-xl font-semibold text-foreground">Payments & Billing</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
              {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 max-w-5xl">
          {/* Current Plan */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Current Plan</span>
                <h2 className="text-2xl font-bold text-foreground mt-1">Premium Monthly</h2>
                <p className="text-muted-foreground mt-2">
                  ₹2,999/month • Next billing on Feb 5, 2024
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/pricing">
                  <Button variant="outline">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </Link>
                <Button variant="ghost" className="text-danger hover:text-danger hover:bg-danger/10">
                  Cancel Subscription
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/30">
              <div>
                <p className="text-sm text-muted-foreground">Credits This Month</p>
                <p className="text-xl font-semibold text-foreground">38 / 50</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Checks Used</p>
                <p className="text-xl font-semibold text-foreground">12</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-xl font-semibold text-foreground">₹8,997</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="text-xl font-semibold text-foreground">Oct 2023</p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Saved Payment Methods</h3>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">•••• •••• •••• 4532</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Default</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30">
                <div className="w-12 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded flex items-center justify-center text-white text-xs font-bold">
                  UPI
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">john@okaxis</p>
                  <p className="text-sm text-muted-foreground">UPI ID</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-card rounded-2xl border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Payment History</h3>
            
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{payment.plan}</p>
                      <p className="text-sm text-muted-foreground">
                        {payment.date} • {payment.method} • {payment.reference}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold text-foreground">
                      ₹{payment.amount.toLocaleString()}
                    </p>
                    {getStatusBadge(payment.status)}
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 text-center">
              <Button variant="outline">Load More Transactions</Button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Payments;
