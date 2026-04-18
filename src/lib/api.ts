// API Configuration
import { verifyStackGatewayUrl } from "@/lib/verifyStackGatewayUrl";
import type {
  ChangePasswordApiResponse,
  ChangePasswordRequest,
  DeleteAccountRequest,
  MeApiResponse,
  PatchMeRequest,
  SessionsApiResponse,
} from "@/lib/authProfileTypes";

/** Empty base in dev: billing paths use `/api/billing/...` via vite proxy (see billingApi.ts). */
const BILLING_API_URL =
  import.meta.env.VITE_BILLING_API_URL ||
  (import.meta.env.DEV ? "" : "https://bgv-billing-service.onrender.com");

const AUTH_API_PREFIX = "/api/v1/auth";

/** Only these auth routes omit Bearer; `/me`, `/sessions`, etc. require the access token. */
const AUTH_PATHS_WITHOUT_BEARER = new Set([
  `${AUTH_API_PREFIX}/register`,
  `${AUTH_API_PREFIX}/login`,
  `${AUTH_API_PREFIX}/google`,
  `${AUTH_API_PREFIX}/refresh`,
  `${AUTH_API_PREFIX}/forgot-password`,
  `${AUTH_API_PREFIX}/reset-password`,
  /** Body carries refreshToken; many gateways do not require Bearer here */
  `${AUTH_API_PREFIX}/logout`,
]);

// Types
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message?: string | null;
}

export interface ApiResponse {
  success: boolean;
  message?: string | null;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

// Helper function to get stored tokens
export const getStoredTokens = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return { accessToken, refreshToken };
};

// Helper function to store tokens
export const storeTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// Helper function to clear tokens
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

type ResolveUrl = (path: string) => string;

// API Client
class ApiClient {
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<boolean> | null = null;

  constructor(
    private resolveUrl: ResolveUrl,
    /** When true, do not attach Bearer (auth routes that accept anonymous calls). */
    private skipBearerForPath: (path: string) => boolean,
  ) {}

  private async refreshAccessToken(): Promise<boolean> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const { refreshToken } = getStoredTokens();
        if (!refreshToken) {
          return false;
        }

        const refreshPath = `${AUTH_API_PREFIX}/refresh`;
        const response = await fetch(verifyStackGatewayUrl(refreshPath), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          clearTokens();
          return false;
        }

        const data = await response.json();
        if (data.success && data.data) {
          storeTokens(data.data.accessToken, data.data.refreshToken);
          return true;
        }
        return false;
      } catch {
        clearTokens();
        return false;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private async fetchWithAuth(
    endpoint: string,
    options: RequestInit = {},
    retryOn401: boolean = true,
  ): Promise<Response> {
    const url = this.resolveUrl(endpoint);
    const skipBearer = this.skipBearerForPath(endpoint);

    const buildHeaders = (): Record<string, string> => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
      };
      if (!skipBearer) {
        const { accessToken } = getStoredTokens();
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }
      }
      return headers;
    };

    let headers = buildHeaders();
    let response = await fetch(url, { ...options, headers });

    if (response.status === 401 && retryOn401 && !skipBearer) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        headers = buildHeaders();
        response = await fetch(url, { ...options, headers });
      } else {
        clearTokens();
        throw new Error("Session expired. Please login again.");
      }
    }

    return response;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryOn401: boolean = true,
  ): Promise<T> {
    try {
      const response = await this.fetchWithAuth(endpoint, options, retryOn401);

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            errorData.error ||
            "Access forbidden. Please check CORS configuration on the backend server.",
        );
      }

      let data;
      try {
        data = await response.json();
      } catch {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        throw new Error("Invalid response format");
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || `Request failed with status ${response.status}`);
      }

      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error occurred");
    }
  }

  /** For 204 No Content (e.g. DELETE /account). */
  async requestVoid(
    endpoint: string,
    options: RequestInit = {},
    retryOn401: boolean = true,
  ): Promise<void> {
    try {
      const response = await this.fetchWithAuth(endpoint, options, retryOn401);

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            errorData.error ||
            "Access forbidden. Please check CORS configuration on the backend server.",
        );
      }

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || err.error || `Request failed with status ${response.status}`);
      }

      if (response.status === 204 || response.status === 205) {
        return;
      }

      const text = await response.text();
      if (!text.trim()) {
        return;
      }
      const data = JSON.parse(text) as { success?: boolean; message?: string; error?: string };
      if (data && data.success === false) {
        throw new Error(data.message || data.error || "Request failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error occurred");
    }
  }

  async getMe(): Promise<MeApiResponse> {
    return this.request<MeApiResponse>(`${AUTH_API_PREFIX}/me`);
  }

  async patchMe(body: PatchMeRequest): Promise<MeApiResponse> {
    return this.request<MeApiResponse>(`${AUTH_API_PREFIX}/me`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  async getSessions(): Promise<SessionsApiResponse> {
    return this.request<SessionsApiResponse>(`${AUTH_API_PREFIX}/sessions`);
  }

  async deleteSession(sessionId: string): Promise<void> {
    const id = encodeURIComponent(sessionId);
    return this.requestVoid(`${AUTH_API_PREFIX}/sessions/${id}`, { method: "DELETE" });
  }

  /**
   * POST /change-password — some gateways return 200 with an empty body on success; the generic
   * `request()` JSON parse would throw. We treat empty OK responses as success.
   */
  async changePassword(body: ChangePasswordRequest): Promise<ChangePasswordApiResponse> {
    const endpoint = `${AUTH_API_PREFIX}/change-password`;
    try {
      const response = await this.fetchWithAuth(
        endpoint,
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        true,
      );

      const text = await response.text();

      if (response.status === 403) {
        let msg = "Access forbidden.";
        try {
          const errData = text ? (JSON.parse(text) as { message?: string }) : {};
          msg = errData.message || msg;
        } catch {
          /* use default */
        }
        throw new Error(
          msg || "Access forbidden. Please check CORS configuration on the backend server.",
        );
      }

      if (!response.ok) {
        let errMsg = `Request failed with status ${response.status}`;
        try {
          const errData = text ? (JSON.parse(text) as { message?: string; error?: string }) : {};
          errMsg = errData.message || errData.error || errMsg;
        } catch {
          /* keep default */
        }
        throw new Error(errMsg);
      }

      if (!text.trim()) {
        return { success: true, message: "Password updated" };
      }

      let data: ChangePasswordApiResponse;
      try {
        data = JSON.parse(text) as ChangePasswordApiResponse;
      } catch {
        throw new Error("Invalid response format");
      }

      if (data.success === false) {
        throw new Error(data.message || "Password change failed");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error occurred");
    }
  }

  async deleteAccount(body?: DeleteAccountRequest): Promise<void> {
    return this.requestVoid(`${AUTH_API_PREFIX}/account`, {
      method: "DELETE",
      body: body && Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
    });
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>(`${AUTH_API_PREFIX}/register`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>(`${AUTH_API_PREFIX}/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async googleAuth(data: GoogleAuthRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>(`${AUTH_API_PREFIX}/google`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>(`${AUTH_API_PREFIX}/refresh`, {
      method: "POST",
      body: JSON.stringify(data),
    }, false);
  }

  async logout(data: LogoutRequest): Promise<ApiResponse> {
    return this.request<ApiResponse>(`${AUTH_API_PREFIX}/logout`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logoutAll(): Promise<ApiResponse> {
    return this.request<ApiResponse>(`${AUTH_API_PREFIX}/logout-all`, {
      method: "POST",
    });
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    return this.request<ApiResponse>(`${AUTH_API_PREFIX}/forgot-password`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    return this.request<ApiResponse>(`${AUTH_API_PREFIX}/reset-password`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

function billingResolveUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BILLING_API_URL}${p}`;
}

/** Auth via public API gateway (same host as BGV). */
export const authApiClient = new ApiClient(verifyStackGatewayUrl, (path) =>
  AUTH_PATHS_WITHOUT_BEARER.has(path),
);

export const billingApiClient = new ApiClient(billingResolveUrl, () => false);
