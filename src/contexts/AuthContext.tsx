import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authApiClient as apiClient, getStoredTokens, storeTokens, clearTokens } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleAuth: (idToken: string) => Promise<void>;
  logout: () => void;
  logoutAll: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const decodeToken = (token: string): User | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload) as User;
    console.log("Decoded user from token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getRedirectPath = () => {
    const from = location.state?.from?.pathname;
    return from && from !== '/login' && from !== '/signup' ? from : '/dashboard';
  };

  useEffect(() => {
    const checkAuth = () => {
      const { accessToken } = getStoredTokens();
      if (accessToken) {
        const decodedUser = decodeToken(accessToken);
        if (decodedUser && decodedUser.exp * 1000 > Date.now()) {
          setUser(decodedUser);
          setIsAuthenticated(true);
        } else {
          clearTokens();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleAuthSuccess = (accessToken: string, refreshToken: string, message: string) => {
    storeTokens(accessToken, refreshToken);
    const decodedUser = decodeToken(accessToken);
    setUser(decodedUser);
    setIsAuthenticated(true);
    toast({
      title: "Success",
      description: message,
    });
    navigate(getRedirectPath());
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.login({ email, password });
      if (response.success && response.data) {
        handleAuthSuccess(response.data.accessToken, response.data.refreshToken, "Logged in successfully!");
      } else {
        toast({
          title: "Error",
          description: response.message || "Login failed: Invalid response from server.",
          variant: "destructive",
        });
        throw new Error(`Login failed: ${response.message}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.register({ name, email, password });
      if (response.success && response.data) {
        handleAuthSuccess(response.data.accessToken, response.data.refreshToken, "Account created successfully!");
      } else {
        toast({
          title: "Error",
          description: response.message || "Registration failed: Invalid response from server.",
          variant: "destructive",
        });
        throw new Error(`Registration failed: ${response.message}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const googleAuth = async (idToken: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.googleAuth({ idToken });
      if (response.success && response.data) {
        handleAuthSuccess(response.data.accessToken, response.data.refreshToken, "Logged in with Google successfully!");
      } else {
        toast({
          title: "Error",
          description: response.message || "Google authentication failed: Invalid response from server.",
          variant: "destructive",
        });
        throw new Error(`Google authentication failed: ${response.message}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Google authentication failed";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearTokens();
    setIsAuthenticated(false);
    setUser(null);
  };

  const logout = async () => {
    try {
      const { refreshToken } = getStoredTokens();
      if (refreshToken) {
        await apiClient.logout({ refreshToken });
      }
    } catch (error) {
      // Continue with logout even if API call fails
    }
    handleLogout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/login");
  };

  const logoutAll = async () => {
    try {
      await apiClient.logoutAll();
      handleLogout();
      toast({
        title: "Logged out",
        description: "You have been logged out from all devices.",
      });
      navigate("/login");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Logout failed";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await apiClient.forgotPassword({ email });
      toast({
        title: "Success",
        description: "If the email exists, a password reset link has been sent.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send reset email";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await apiClient.resetPassword({ token, newPassword });
      toast({
        title: "Success",
        description: "Password has been reset successfully. Please login with your new password.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to reset password";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      const { refreshToken } = getStoredTokens();
      if (!refreshToken) return false;

      const response = await apiClient.refreshToken({ refreshToken });

      if (response.success && response.data) {
        storeTokens(response.data.accessToken, response.data.refreshToken);
        const decodedUser = decodeToken(response.data.accessToken);
        setUser(decodedUser);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      handleLogout();
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        register,
        googleAuth,
        logout,
        logoutAll,
        forgotPassword,
        resetPassword,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

