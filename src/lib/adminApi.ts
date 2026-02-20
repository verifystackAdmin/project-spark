// Admin API Service Layer
const ADMIN_API_BASE = import.meta.env.VITE_ADMIN_API_URL || "https://bgv-billing-service.onrender.com";

import { getStoredTokens, clearTokens } from "@/lib/api";

// Types
export interface Plan {
  id: string;
  code: string;
  name: string;
  type: "ONE_TIME" | "SUBSCRIPTION";
  price: number;
  currency: string;
  billingPeriod: "MONTHLY" | "YEARLY" | null;
  active: boolean;
  features: PlanFeature[];
  createdAt: string;
  updatedAt: string;
}

export interface PlanFeature {
  id: string;
  featureCode: string;
  quotaType: "UNLIMITED" | "LIMITED";
  quotaValue: number | null;
}

export interface Subscription {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  phone?: string;
  orgId?: string;
  planId: string;
  planName: string;
  planType: "ONE_TIME" | "SUBSCRIPTION";
  status: "ACTIVE" | "CANCELLED" | "EXPIRED" | "PENDING";
  quotaRemaining: number;
  quotaTotal: number;
  renewalDate?: string;
  paymentReference?: string;
  createdAt: string;
}

export interface UsageRecord {
  id: string;
  userId: string;
  userEmail: string;
  featureCode: string;
  usageCount: number;
  date: string;
  quotaRemaining: number;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  userId: string;
  userEmail: string;
  amount: number;
  currency: string;
  status: "SUCCESS" | "FAILED" | "PENDING" | "REFUNDED";
  gatewayReference: string;
  refundStatus?: "NONE" | "PARTIAL" | "FULL";
  refundAmount?: number;
  createdAt: string;
}

export interface VerificationActivity {
  id: string;
  userId: string;
  userEmail: string;
  verificationType: string;
  result: "PASS" | "FAIL" | "PENDING" | "REVIEW";
  timestamp: string;
  ipAddress: string;
  deviceInfo: string;
  correlationId: string;
}

export interface DashboardStats {
  totalSubscriptions: number;
  activePlans: number;
  usageToday: number;
  errorCount: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  userId: string;
  userEmail: string;
  timestamp: string;
  details: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  changes: Record<string, { before: unknown; after: unknown }>;
  timestamp: string;
}

// API Helper
const adminRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const { accessToken } = getStoredTokens();
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${ADMIN_API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearTokens();
    window.location.href = "/admin/login";
    throw new Error("Session expired");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json();
};

// Dashboard API
export const dashboardApi = {
  getStats: () => adminRequest<DashboardStats>("/admin/dashboard/stats"),
  getRecentActivity: () => adminRequest<ActivityLog[]>("/admin/dashboard/activity"),
};

// Plans API
export const plansApi = {
  getAll: () => adminRequest<Plan[]>("/admin/plans"),
  getById: (id: string) => adminRequest<Plan>(`/admin/plans/${id}`),
  create: (plan: Partial<Plan>) =>
    adminRequest<Plan>("/admin/plans", {
      method: "POST",
      body: JSON.stringify(plan),
    }),
  update: (id: string, plan: Partial<Plan>) =>
    adminRequest<Plan>(`/admin/plans/${id}`, {
      method: "PUT",
      body: JSON.stringify(plan),
    }),
  updatePrice: (id: string, price: number) =>
    adminRequest<Plan>(`/admin/plans/${id}/price`, {
      method: "PUT",
      body: JSON.stringify({ price }),
    }),
  activate: (id: string) =>
    adminRequest<Plan>(`/admin/plans/${id}/activate`, {
      method: "PATCH",
    }),
  deactivate: (id: string) =>
    adminRequest<Plan>(`/admin/plans/${id}/deactivate`, {
      method: "PATCH",
    }),
  addFeature: (planId: string, feature: Partial<PlanFeature>) =>
    adminRequest<PlanFeature>(`/admin/plans/${planId}/features`, {
      method: "POST",
      body: JSON.stringify(feature),
    }),
  removeFeature: (planId: string, featureId: string) =>
    adminRequest<void>(`/admin/plans/${planId}/features/${featureId}`, {
      method: "DELETE",
    }),
};

// Subscriptions API
export const subscriptionsApi = {
  search: (params: { userId?: string; phone?: string; email?: string; orgId?: string }) =>
    adminRequest<Subscription[]>(`/admin/subscriptions?${new URLSearchParams(params as Record<string, string>)}`),
  getById: (id: string) => adminRequest<Subscription>(`/admin/subscriptions/${id}`),
  activate: (id: string) =>
    adminRequest<Subscription>(`/admin/subscriptions/${id}/activate`, {
      method: "PATCH",
    }),
  cancel: (id: string) =>
    adminRequest<Subscription>(`/admin/subscriptions/${id}/cancel`, {
      method: "PATCH",
    }),
  resetQuota: (id: string) =>
    adminRequest<Subscription>(`/admin/subscriptions/${id}/reset-quota`, {
      method: "POST",
    }),
  renew: (id: string) =>
    adminRequest<Subscription>(`/admin/subscriptions/${id}/renew`, {
      method: "POST",
    }),
};

// Usage API
export const usageApi = {
  getHistory: (params: { userId?: string; orgId?: string; feature?: string; startDate?: string; endDate?: string }) =>
    adminRequest<UsageRecord[]>(`/admin/usage?${new URLSearchParams(params as Record<string, string>)}`),
  getDailyTrends: (days: number = 30) =>
    adminRequest<{ date: string; count: number }[]>(`/admin/usage/trends/daily?days=${days}`),
  getMonthlyTrends: (months: number = 12) =>
    adminRequest<{ month: string; count: number }[]>(`/admin/usage/trends/monthly?months=${months}`),
};

// Payments API
export const paymentsApi = {
  getAll: (params?: { status?: string; startDate?: string; endDate?: string }) =>
    adminRequest<Payment[]>(`/admin/payments${params ? `?${new URLSearchParams(params)}` : ""}`),
  getById: (id: string) => adminRequest<Payment>(`/admin/payments/${id}`),
  refund: (id: string, amount?: number) =>
    adminRequest<Payment>(`/admin/payments/${id}/refund`, {
      method: "POST",
      body: JSON.stringify({ amount }),
    }),
};

// Verification Activity API
export const activityApi = {
  getAll: (params?: { userId?: string; type?: string; result?: string; startDate?: string; endDate?: string }) =>
    adminRequest<VerificationActivity[]>(`/admin/verifications${params ? `?${new URLSearchParams(params)}` : ""}`),
  getById: (id: string) => adminRequest<VerificationActivity>(`/admin/verifications/${id}`),
};

// Audit Log API
export const auditApi = {
  getAll: (params?: { adminId?: string; entityType?: string; startDate?: string; endDate?: string }) =>
    adminRequest<AuditLog[]>(`/admin/audit-logs${params ? `?${new URLSearchParams(params)}` : ""}`),
  logAction: (action: string, entityType: string, entityId: string, changes: Record<string, unknown>) =>
    adminRequest<AuditLog>("/admin/audit-logs", {
      method: "POST",
      body: JSON.stringify({ action, entityType, entityId, changes }),
    }),
};

// Mock data for development
export const mockData = {
  stats: {
    totalSubscriptions: 1247,
    activePlans: 8,
    usageToday: 3456,
    errorCount: 12,
  } as DashboardStats,

  plans: [
    {
      id: "1",
      code: "BASIC_IDENTITY",
      name: "Basic Identity Check",
      type: "ONE_TIME" as const,
      price: 149,
      currency: "INR",
      billingPeriod: null,
      active: true,
      features: [
        { id: "f1", featureCode: "IDENTITY_CHECK", quotaType: "LIMITED" as const, quotaValue: 1 },
      ],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-12-01T10:00:00Z",
    },
    {
      id: "2",
      code: "PRO_MONTHLY",
      name: "Pro Monthly",
      type: "SUBSCRIPTION" as const,
      price: 999,
      currency: "INR",
      billingPeriod: "MONTHLY" as const,
      active: true,
      features: [
        { id: "f2", featureCode: "IDENTITY_CHECK", quotaType: "LIMITED" as const, quotaValue: 50 },
        { id: "f3", featureCode: "SOCIAL_SCAN", quotaType: "LIMITED" as const, quotaValue: 50 },
      ],
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-12-01T10:00:00Z",
    },
  ] as Plan[],

  subscriptions: [
    {
      id: "sub1",
      userId: "user1",
      userEmail: "rahul@example.com",
      userName: "Rahul Sharma",
      phone: "+91 98765 43210",
      planId: "2",
      planName: "Pro Monthly",
      planType: "SUBSCRIPTION" as const,
      status: "ACTIVE" as const,
      quotaRemaining: 35,
      quotaTotal: 50,
      renewalDate: "2025-01-15T00:00:00Z",
      paymentReference: "pay_abc123",
      createdAt: "2024-12-15T10:00:00Z",
    },
  ] as Subscription[],

  payments: [
    {
      id: "pay1",
      subscriptionId: "sub1",
      userId: "user1",
      userEmail: "rahul@example.com",
      amount: 999,
      currency: "INR",
      status: "SUCCESS" as const,
      gatewayReference: "rzp_pay_abc123",
      refundStatus: "NONE" as const,
      createdAt: "2024-12-15T10:00:00Z",
    },
  ] as Payment[],

  activities: [
    {
      id: "act1",
      userId: "user1",
      userEmail: "rahul@example.com",
      verificationType: "IDENTITY_CHECK",
      result: "PASS" as const,
      timestamp: "2024-12-28T10:30:00Z",
      ipAddress: "192.168.1.1",
      deviceInfo: "Chrome/Windows",
      correlationId: "corr_abc123",
    },
  ] as VerificationActivity[],

  recentActivity: [
    {
      id: "log1",
      action: "Subscription created",
      userId: "user1",
      userEmail: "rahul@example.com",
      timestamp: "2024-12-28T10:00:00Z",
      details: "Pro Monthly subscription activated",
    },
    {
      id: "log2",
      action: "Verification completed",
      userId: "user2",
      userEmail: "priya@example.com",
      timestamp: "2024-12-28T09:45:00Z",
      details: "Identity check passed",
    },
  ] as ActivityLog[],
};
