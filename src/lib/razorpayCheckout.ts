/**
 * Razorpay Checkout (hosted) — loads https://checkout.razorpay.com/v1/checkout.js
 * Order + verify run against the API gateway (`bgvGatewayApi`), not internal hosts.
 */

export type RazorpayPaymentSuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export type RazorpayHostedOptions = {
  key: string;
  order_id: string;
  handler: (response: RazorpayPaymentSuccess) => void | Promise<void>;
  prefill?: { email?: string; name?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
  notes?: Record<string, string>;
};

type RazorpayInstance = { open: () => void };

type RazorpayConstructor = new (options: RazorpayHostedOptions) => RazorpayInstance;

export function loadRazorpayCheckoutScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay Checkout requires a browser."));
  }
  const w = window as Window & { Razorpay?: RazorpayConstructor };
  if (w.Razorpay) return Promise.resolve();

  const existing = document.getElementById("razorpay-checkout-js");
  if (existing) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const id = window.setInterval(() => {
        if ((window as Window & { Razorpay?: RazorpayConstructor }).Razorpay) {
          window.clearInterval(id);
          resolve();
        } else if (Date.now() - start > 25_000) {
          window.clearInterval(id);
          reject(new Error("Timed out loading Razorpay Checkout."));
        }
      }, 40);
    });
  }

  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.id = "razorpay-checkout-js";
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Razorpay Checkout script."));
    document.body.appendChild(s);
  });
}

export function openRazorpayHostedCheckout(options: RazorpayHostedOptions): void {
  const R = (window as Window & { Razorpay?: RazorpayConstructor }).Razorpay;
  if (!R) throw new Error("Razorpay is not loaded. Call loadRazorpayCheckoutScript() first.");
  const rzp = new R(options);
  rzp.open();
}
