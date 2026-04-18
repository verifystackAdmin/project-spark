import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          prompt: () => void;
          renderButton: (element: HTMLElement, config: { theme: string; size: string; width?: string }) => void;
        };
      };
    };
  }
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, googleAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname;
      const redirectPath = from && from !== "/login" && from !== "/signup" ? from : "/dashboard";
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    const handleGoogleCallback = async (response: { credential: string }) => {
      try {
        setIsSubmitting(true);
        await googleAuth(response.credential);
      } catch {
        // handled in context
      } finally {
        setIsSubmitting(false);
      }
    };

    const render = () => {
      if (!window.google) return;
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
      if (!clientId) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCallback,
      });
      const el = document.getElementById("google-signin-button");
      if (el) {
        el.innerHTML = "";
        window.google.accounts.id.renderButton(el, {
          theme: "outline",
          size: "large",
        });
      }
    };

    if (window.google) {
      render();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = render;
    document.body.appendChild(script);

    return () => {
      const el = document.getElementById("google-signin-button");
      if (el) el.innerHTML = "";
    };
  }, [googleAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch {
      // handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthSplitLayout mode="login">
      <div className="mx-auto w-full max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Sign in</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">Sign in to continue to your dashboard</p>

        <div
          id="google-signin-button"
          className="mt-8 min-h-[44px] w-full [&>div]:flex [&>div]:w-full [&>div]:justify-center [&_iframe]:max-w-full"
        />

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center" aria-hidden>
            <span className="w-full border-t border-border" />
          </div>
          <p className="relative mx-auto w-fit bg-background px-3 text-center text-xs text-muted-foreground">
            or sign in with email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-border bg-muted/40 pl-10 pr-4 transition-colors focus-visible:bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline sm:text-sm">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-border bg-muted/40 pl-10 pr-11 transition-colors focus-visible:bg-background"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            className="mt-2 h-12 w-full rounded-xl text-base font-semibold shadow-md"
            size="lg"
            disabled={isSubmitting || !email || !password}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Create one free <span aria-hidden>→</span>
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
};

export default Login;
