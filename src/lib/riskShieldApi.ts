/** Verify Stack risk-shield-lite-service — POST /risk-shield-lite/analyze */

export interface RiskShieldAnalyzeResponse {
  trustScore?: number;
  riskLevel?: string;
  signals?: Record<string, unknown> | unknown[];
  reasons?: string[];
  disclaimer?: string;
}

function riskShieldBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_RISK_SHIELD_API_BASE as string | undefined;
  if (fromEnv?.trim()) return fromEnv.replace(/\/$/, "");
  if (import.meta.env.DEV) return "/api/risk-shield";
  return "https://risk-shield-lite-service.onrender.com";
}

export async function analyzeRiskShield(
  input: {
    email: string;
    phone: string;
    name?: string;
  },
  options?: { signal?: AbortSignal }
): Promise<RiskShieldAnalyzeResponse> {
  const base = riskShieldBaseUrl();
  const url = `${base}/risk-shield-lite/analyze`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: input.email.trim(),
      phone: input.phone.trim(),
      name: (input.name ?? "").trim() || "—",
    }),
    signal: options?.signal,
  });

  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Risk service returned invalid JSON.");
  }

  if (!res.ok) {
    const msg =
      (data as { message?: string })?.message ??
      (data as { error?: string })?.error ??
      `Risk service error (${res.status})`;
    throw new Error(typeof msg === "string" ? msg : "Risk analysis failed.");
  }

  return data as RiskShieldAnalyzeResponse;
}
