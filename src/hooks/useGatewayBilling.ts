import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRazorpayOrder,
  listBillingPlans,
  listMyBillingSubscriptions,
  normalizeGatewaySubscriptionList,
  verifyRazorpayPayment,
  isRazorpayVerifySuccess,
  type RazorpayOrderResponse,
  type RazorpayVerifyResponse,
} from "@/lib/bgvGatewayApi";
import { loadRazorpayCheckoutScript, openRazorpayHostedCheckout } from "@/lib/razorpayCheckout";

export const gatewayBillingKeys = {
  plans: ["gateway-billing", "plans"] as const,
  subs: (userId: string) => ["gateway-billing", "subscriptions", userId] as const,
};

export function useGatewayBillingPlans() {
  return useQuery({
    queryKey: gatewayBillingKeys.plans,
    queryFn: () => listBillingPlans(),
  });
}

export function useMyGatewaySubscriptions(userId: string) {
  const id = userId.trim();
  return useQuery({
    queryKey: gatewayBillingKeys.subs(id),
    queryFn: () => listMyBillingSubscriptions(id),
    enabled: id.length > 0,
    select: (raw) => normalizeGatewaySubscriptionList(raw),
  });
}

async function runRazorpayHostedCheckoutFlow(
  orderPromise: Promise<RazorpayOrderResponse>,
  userId: string,
): Promise<RazorpayVerifyResponse> {
  await loadRazorpayCheckoutScript();
  const order = await orderPromise;
  if (!order.keyId?.trim() || !order.razorpayOrderId?.trim()) {
    throw new Error(
      "Gateway did not return a Razorpay key id or order id. Configure live (or test) key + secret on the API gateway; the SPA only opens Checkout with what the gateway returns.",
    );
  }

  return new Promise<RazorpayVerifyResponse>((resolve, reject) => {
    let settled = false;
    const done = (fn: () => void) => {
      if (settled) return;
      settled = true;
      fn();
    };

    openRazorpayHostedCheckout({
      key: order.keyId,
      order_id: order.razorpayOrderId,
      handler: async (response) => {
        try {
          const v = await verifyRazorpayPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          if (!isRazorpayVerifySuccess(v)) {
            done(() => reject(new Error(v.message || "Payment could not be verified.")));
            return;
          }
          done(() => resolve(v));
        } catch (e) {
          done(() => reject(e instanceof Error ? e : new Error(String(e))));
        }
      },
      prefill: { email: userId },
      theme: { color: "#2563eb" },
      modal: {
        ondismiss: () => {
          done(() => reject(new Error("Payment cancelled.")));
        },
      },
    });
  });
}

/**
 * Buy a plan: `POST .../billing/payments/razorpay/orders` → hosted Checkout → `POST .../razorpay/verify`.
 * On success (`paid` / `already_paid` / `payment_already_applied`), subscriptions refresh.
 */
export function useSubscribeToPlanMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { planId: string; userId: string; tenantId?: string }) =>
      runRazorpayHostedCheckoutFlow(
        createRazorpayOrder({
          userId: vars.userId,
          tenantId: vars.tenantId ?? vars.userId,
          orgId: null,
          planId: vars.planId,
        }),
        vars.userId,
      ),
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({ queryKey: gatewayBillingKeys.plans });
      void qc.invalidateQueries({ queryKey: gatewayBillingKeys.subs(vars.userId) });
    },
  });
}

/** Wallet top-up: order body uses `amountPaise` (≥ 100), no `planId`. */
export function useWalletTopUpMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { userId: string; tenantId?: string; amountPaise: number }) =>
      runRazorpayHostedCheckoutFlow(
        createRazorpayOrder({
          userId: vars.userId,
          tenantId: vars.tenantId ?? vars.userId,
          orgId: null,
          amountPaise: vars.amountPaise,
        }),
        vars.userId,
      ),
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({ queryKey: gatewayBillingKeys.plans });
      void qc.invalidateQueries({ queryKey: gatewayBillingKeys.subs(vars.userId) });
    },
  });
}
