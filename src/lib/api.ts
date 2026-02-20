// API Configuration
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || "https://bgv-auth-service.onrender.com";
const BILLING_API_URL = import.meta.env.VITE_BILLING_API_URL || "https://bgv-billing-service.onrender.com";

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
  message?: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
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

// API Client
class ApiClient {
  private baseUrl: string;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<boolean> | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async refreshAccessToken(): Promise<boolean> {
    // If already refreshing, return the existing promise
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

        const response = await fetch(`${this.baseUrl}/auth/refresh`, {
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
      } catch (error) {
        clearTokens();
        return false;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryOn401: boolean = true
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Add auth token if available (skip for auth endpoints)
    const isAuthEndpoint = endpoint.startsWith("/auth/");
    if (!isAuthEndpoint) {
      const { accessToken } = getStoredTokens();
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401 && retryOn401 && !isAuthEndpoint) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          // Retry the request with new token
          const { accessToken } = getStoredTokens();
          if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
          }
          const retryResponse = await fetch(url, {
            ...options,
            headers,
          });
          
          if (!retryResponse.ok) {
            const errorData = await retryResponse.json().catch(() => ({}));
            throw new Error(errorData.message || errorData.error || "Request failed after token refresh");
          }
          
          const retryData = await retryResponse.json().catch(() => {
            throw new Error("Failed to parse response");
          });
          return retryData as T;
        } else {
          // Refresh failed, clear tokens and throw error
          clearTokens();
          throw new Error("Session expired. Please login again.");
        }
      }

      // Handle 403 Forbidden - likely CORS or permission issue
      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          errorData.error || 
          "Access forbidden. Please check CORS configuration on the backend server."
        );
      }

      // Parse JSON response
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // If response is not JSON, check if it's an error status
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

  // Auth endpoints
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async googleAuth(data: GoogleAuthRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/google", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
    // Don't retry on 401 for refresh endpoint itself
    return this.request<AuthResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify(data),
    }, false);
  }

  async logout(data: LogoutRequest): Promise<ApiResponse> {
    return this.request<ApiResponse>("/auth/logout", {
        method: "POST",
        body: JSON.stringify(data),
    });
  }

  async logoutAll(): Promise<ApiResponse> {
      return this.request<ApiResponse>("/auth/logout-all", {
          method: "POST",
      });
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
      return this.request<ApiResponse>("/auth/forgot-password", {
          method: "POST",
          body: JSON.stringify(data),
      });
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
      return this.request<ApiResponse>("/auth/reset-password", {
          method: "POST",
          body: JSON.stringify(data),
      });
  }
}

// Export singleton instances
export const authApiClient = new ApiClient(AUTH_API_URL);
export const billingApiClient = new ApiClient(BILLING_API_URL);
