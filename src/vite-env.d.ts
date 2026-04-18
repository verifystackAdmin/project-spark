/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public API gateway origin (e.g. https://verify.verifystack.in). Overrides `VITE_BGV_GATEWAY_URL` when set. */
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_BGV_GATEWAY_URL?: string;
  readonly VITE_BGV_GATEWAY_PROXY_TARGET?: string;
  readonly VITE_BILLING_API_URL?: string;
  readonly VITE_DEV_PORT?: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
