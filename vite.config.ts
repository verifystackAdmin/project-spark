import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  /** Dev `/api/bgv/...` → VerifyStack API gateway (BGV, billing, auth `/api/v1/...`, etc.). */
  const bgvGatewayTarget =
    env.VITE_BGV_GATEWAY_PROXY_TARGET || "https://verify.verifystack.in";
  const devPort = Number(env.VITE_DEV_PORT) || 5173;

  return {
    server: {
      host: "localhost",
      port: devPort,
      proxy: {
        // Same-origin in dev: billingApi uses /api/billing/... (see src/lib/billingApi.ts billingPath)
        "/api/billing": {
          target: "https://bgv-billing-service.onrender.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          logLevel: "debug",
        },
        "/api/risk-shield": {
          target: "https://risk-shield-lite-service.onrender.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/risk-shield/, ""),
          logLevel: "debug",
        },
        // BGV API gateway — `/api/bgv/api/v1/...` → gateway origin (default verify.verifystack.in)
        "/api/bgv": {
          target: bgvGatewayTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/bgv/, ""),
          logLevel: "debug",
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("recharts") || id.includes("d3-")) return "charts";
            if (id.includes("@tanstack/react-query")) return "query";
            if (id.includes("lucide-react")) return "icons";
            return "vendor";
          },
        },
      },
    },
  };
});
