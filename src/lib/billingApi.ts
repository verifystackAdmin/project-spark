import { billingApiClient as apiClient } from "./api";

// Types
export interface Plan {
  id: string;
  code: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  billingPeriod: string;
  active: boolean;
  features: string[];
}

export interface Subscription {
  id:string;
  plan: Plan;
  startDate: string;
  endDate: string;
  status: string;
}

export interface EntitlementCheckRequest {
  userId: string;
  orgId?: string | null;
  featureCode: string;
  count: number;
}

export interface EntitlementCheckResponse {
  entitled: boolean;
  reservationId?: string;
  reason?: string;
}

export interface CommitUsageRequest {
  reservationId: string;
}

export interface ReleaseUsageRequest {
  reservationId: string;
}

export interface CreatePlanRequest {
  code: string;
  name: string;
  type: "SUBSCRIPTION" | "ONE_TIME";
  price: number;
  currency: string;
  billingPeriod: "MONTHLY" | "YEARLY" | "ONCE";
}

export interface AddFeatureToPlanRequest {
  featureCode: string;
  quota: number;
  quotaType: "LIMITED" | "UNLIMITED";
}

export interface UpdatePlanPriceRequest {
  price: number;
  currency: string;
}

export interface AdminPlanResponse {
  id: string;
  code: string;
  name: string;
  price: number;
  currency: string;
  billingPeriod: string;
  active: boolean;
  features: {
    id: string;
    code: string;
    name: string;
    quota: number;
    quotaType: string;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// API Functions
export const getPlans = async (): Promise<ApiResponse<Plan[]>> => {
  const rawPlans = await apiClient.request<any[]>("/billing/plans");
  const plans: Plan[] = rawPlans.map(p => ({
    ...p,
    features: p.features || [], // Ensure features is an array, default to empty
  }));
  return { success: true, data: plans };
};

export const getMySubscription = async (): Promise<ApiResponse<Subscription>> => {
  return apiClient.request<ApiResponse<Subscription>>("/billing/subscriptions/me");
};

export const subscribeToPlan = async (planId: string): Promise<ApiResponse<Subscription>> => {
  return apiClient.request<ApiResponse<Subscription>>(`/billing/subscriptions/${planId}`, {
    method: "POST",
  });
};

// Public APIs
export const checkEntitlement = async (data: EntitlementCheckRequest): Promise<ApiResponse<EntitlementCheckResponse>> => {
  return apiClient.request<ApiResponse<EntitlementCheckResponse>>("/billing/entitlements/check", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const commitUsage = async (data: CommitUsageRequest): Promise<ApiResponse<any>> => {
  return apiClient.request<ApiResponse<any>>("/billing/usage/commit", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const releaseUsage = async (data: ReleaseUsageRequest): Promise<ApiResponse<any>> => {
  return apiClient.request<ApiResponse<any>>("/billing/usage/release", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Admin APIs
export const createPlan = async (data: CreatePlanRequest): Promise<ApiResponse<AdminPlanResponse>> => {
  return apiClient.request<ApiResponse<AdminPlanResponse>>("/billing/admin/plans", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const addFeatureToPlan = async (planId: string, data: AddFeatureToPlanRequest): Promise<ApiResponse<AdminPlanResponse>> => {
  return apiClient.request<ApiResponse<AdminPlanResponse>>(`/billing/admin/plans/${planId}/features`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const activatePlan = async (planId: string): Promise<ApiResponse<AdminPlanResponse>> => {
  return apiClient.request<ApiResponse<AdminPlanResponse>>(`/billing/admin/plans/${planId}/activate`, {
    method: "PATCH",
  });
};

export const updatePlanPrice = async (planId: string, data: UpdatePlanPriceRequest): Promise<ApiResponse<AdminPlanResponse>> => {
  return apiClient.request<ApiResponse<AdminPlanResponse>>(`/billing/admin/plans/${planId}/price`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
