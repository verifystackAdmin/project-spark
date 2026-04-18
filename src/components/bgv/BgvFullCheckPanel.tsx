import { useMemo, useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  submitBgvReport,
  resolveRequestedChecksFromSubscriptions,
  BgvApiError,
  isLikelyEntitlementBlockedError,
  formatGatewayErrorBody,
  mapEntitlementBlockedMessage,
  subjectVerificationRequirements,
  validateSubjectVerificationForChecks,
  type SubjectVerification,
} from "@/lib/bgvGatewayApi";
import { useGatewayBillingPlans, useMyGatewaySubscriptions } from "@/hooks/useGatewayBilling";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield } from "lucide-react";

const INDIA_DOC_TYPES: { value: string; label: string }[] = [
  { value: "VOTER_ID", label: "Voter ID" },
  { value: "DRIVING_LICENCE", label: "Driving licence" },
  { value: "PASSPORT", label: "Passport" },
  { value: "AADHAAR", label: "Aadhaar (document)" },
];

const PROCESSING_LINES = [
  "Creating your verification…",
  "Sending checks to VerifyStack…",
  "Queueing your report…",
  "Taking you to Reports…",
];

/**
 * BGV submit: `requestedChecks` are derived only from the user’s active plan features
 * (no per-check picker). See `PLAN_FEATURE_CODE_TO_BG_CHECK` in `bgvGatewayApi.ts`.
 */
const BgvFullCheckPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const requesterId = user?.email?.trim() ?? "";

  const subsQ = useMyGatewaySubscriptions(requesterId);
  const plansQ = useGatewayBillingPlans();
  const subs = subsQ.data ?? [];
  const subsFetched = subsQ.isFetched;
  const hasSubscription = subs.length > 0;

  const requestedChecks = useMemo(
    () => resolveRequestedChecksFromSubscriptions(subs, plansQ.data ?? []),
    [subs, plansQ.data],
  );

  const svReq = useMemo(() => subjectVerificationRequirements(requestedChecks), [requestedChecks]);

  const [subjectName, setSubjectName] = useState("");
  const [subjectPhone, setSubjectPhone] = useState("");
  const [sv, setSv] = useState<SubjectVerification>({});

  const setSvField = useCallback((key: keyof SubjectVerification, value: string) => {
    setSv((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    setSv({});
  }, [requestedChecks.join("|")]);
  const [submitting, setSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingLineIdx, setProcessingLineIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!processing) return;
    const id = window.setInterval(() => {
      setProcessingLineIdx((i) => (i + 1) % PROCESSING_LINES.length);
    }, 520);
    return () => window.clearInterval(id);
  }, [processing]);

  const planFeaturesLoading =
    hasSubscription && subsFetched && requestedChecks.length === 0 && plansQ.isLoading;
  const planMissingMappableFeatures =
    hasSubscription && subsFetched && !plansQ.isLoading && requestedChecks.length === 0;

  const subjectVerificationError = useMemo(
    () => validateSubjectVerificationForChecks(requestedChecks, sv),
    [requestedChecks, sv],
  );

  const handleSubmit = async () => {
    if (!requesterId) return;
    if (requestedChecks.length === 0) {
      setError("Your plan does not include any verifiable check features, or they could not be loaded.");
      return;
    }
    const name = subjectName.trim();
    const phone = subjectPhone.replace(/\D/g, "");
    if (!name || phone.length < 10) {
      setError("Enter subject full name and a valid 10-digit phone number.");
      return;
    }
    const verr = validateSubjectVerificationForChecks(requestedChecks, sv);
    if (verr) {
      setError(verr);
      return;
    }
    setError(null);
    setSubmitting(true);
    setProcessing(true);
    setProcessingLineIdx(0);
    try {
      const res = await submitBgvReport({
        requesterId,
        tenantId: requesterId,
        subjectFullName: name,
        subjectPhone: phone,
        requestedChecks: [...requestedChecks],
        subjectVerification: { ...sv },
      });
      const id = res.reportId;
      if (!id) throw new Error("Gateway did not return reportId.");
      navigate("/dashboard/reports", {
        replace: false,
        state: { bgvSubmitted: true as const, reportId: id },
      });
    } catch (e) {
      setProcessing(false);
      if (e instanceof BgvApiError && e.status === 400) {
        setError(formatGatewayErrorBody(e.responseBody));
        return;
      }
      if (e instanceof BgvApiError && isLikelyEntitlementBlockedError(e.status, e.responseBody)) {
        toast({
          variant: "destructive",
          title: "Cannot start this verification",
          description: mapEntitlementBlockedMessage(e.status, e.responseBody),
        });
        navigate("/dashboard/payments", {
          replace: false,
          state: { fromBgvCheck: true },
        });
        setError(null);
        return;
      }
      const raw = e instanceof Error ? e.message : "Failed to submit BGV request";
      setError(formatGatewayErrorBody(raw));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="max-w-3xl mx-auto mb-10 border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            New verification
          </CardTitle>
          <CardDescription>
            Log in to run a check. Included verifications follow your subscription plan — you only enter the
            subject&apos;s details here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to="/login">Log in to run a check</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative max-w-3xl mx-auto mb-10 overflow-hidden border-border bg-card shadow-sm">
      <AnimatePresence>
        {processing && (
          <motion.div
            key="bgv-processing"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-xl bg-background/93 px-6 py-10 text-center backdrop-blur-sm"
          >
            <Loader2 className="h-11 w-11 shrink-0 animate-spin text-primary" aria-hidden />
            <p className="text-base font-semibold text-foreground">{PROCESSING_LINES[processingLineIdx]}</p>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              Starting your background verification — this usually takes a few seconds.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Shield className="h-6 w-6 text-primary" />
          New background verification
        </CardTitle>
        <CardDescription className="space-y-2">
          <p>
            <span className="font-medium text-foreground">Requester &amp; tenant:</span>{" "}
            <span className="break-all font-mono text-sm">{requesterId || "—"}</span> (must match your
            subscription).
          </p>
          <p className="text-muted-foreground">
            Checks come from your plan only. Enter subject details and any verification fields required for
            those checks (PAN, DOB, address, etc.) — the gateway validates before billing.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {requesterId && subsFetched && !hasSubscription && (
          <div
            role="alert"
            className="rounded-lg border border-amber-500/45 bg-amber-500/[0.12] px-4 py-3 text-sm dark:border-amber-400/50 dark:bg-amber-950/55"
          >
            <p className="font-semibold text-foreground">No active subscription on file for this account.</p>
            <p className="mt-2 leading-relaxed text-foreground/90">
              Subscribe to a plan that includes the checks you need. Operators configure plan features; the app
              does not add checks manually.
            </p>
            <Button
              asChild
              className="mt-3 border border-amber-600/30 bg-background text-foreground hover:bg-amber-500/15 dark:border-amber-400/40 dark:hover:bg-amber-400/10"
              variant="outline"
              size="sm"
            >
              <Link to="/dashboard/payments">Choose a plan</Link>
            </Button>
          </div>
        )}

        {planMissingMappableFeatures && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            <p className="font-semibold">No checks could be derived from your plan.</p>
            <p className="mt-2 leading-relaxed opacity-95">
              Plans must attach per-check features (e.g. <code className="text-xs">IDENTITY_PAN</code>,{" "}
              <code className="text-xs">CIBIL_CHECK</code> for credit). Ask your operator to update the plan or
              try refreshing after payments sync.
            </p>
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="rounded-lg border border-border bg-muted-4 py-3 text-sm">
         m{planFeaturesLoading ? (
            <p className="mt-2 flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin shrink-0" />
              Loading plan features…
            </p>
          ) : requestedChecks.length > 0 ? (
            <p className="mt-1.5 font-mono text-xs leading-relaxed text-muted-foreground break-words">
              {requestedChecks.join(" · ")}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-muted-foreground">—</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="bgv-subject-name">Subject full name</Label>
            <Input
              id="bgv-subject-name"
              placeholder="Ramesh Kumar Singh"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="bgv-subject-phone">Subject phone</Label>
            <Input
              id="bgv-subject-phone"
              placeholder="9876543210"
              value={subjectPhone}
              onChange={(e) => setSubjectPhone(e.target.value)}
            />
          </div>
        </div>

        {(svReq.pan ||
          svReq.aadhaarNumber ||
          svReq.dateOfBirth ||
          svReq.fatherName ||
          svReq.address ||
          svReq.documentId ||
          svReq.documentType ||
          svReq.bankAccountNumber ||
          svReq.bankIfsc ||
          svReq.gstin ||
          svReq.cin ||
          svReq.vehicleRegistrationNumber) && (
          <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
            <p className="text-sm font-medium">Additional Subject Details (for checks)</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {svReq.pan ? (
                <div className="space-y-2 sm:col-span-1">
                  <Label htmlFor="bgv-sv-pan">PAN</Label>
                  <Input
                    id="bgv-sv-pan"
                    autoComplete="off"
                    className="font-mono uppercase"
                    placeholder="ABCDE1234F"
                    value={sv.pan ?? ""}
                    onChange={(e) => setSvField("pan", e.target.value.toUpperCase())}
                  />
                </div>
              ) : null}
              {svReq.aadhaarNumber ? (
                <div className="space-y-2 sm:col-span-1">
                  <Label htmlFor="bgv-sv-aadhaar">Aadhaar number</Label>
                  <Input
                    id="bgv-sv-aadhaar"
                    inputMode="numeric"
                    autoComplete="off"
                    className="font-mono"
                    placeholder="12 digits"
                    value={sv.aadhaarNumber ?? ""}
                    onChange={(e) => setSvField("aadhaarNumber", e.target.value.replace(/\D/g, "").slice(0, 12))}
                  />
                </div>
              ) : null}
              {svReq.dateOfBirth ? (
                <div className="space-y-2 sm:col-span-1">
                  <Label htmlFor="bgv-sv-dob">Date of birth</Label>
                  <Input
                    id="bgv-sv-dob"
                    type="date"
                    value={sv.dateOfBirth ?? ""}
                    onChange={(e) => setSvField("dateOfBirth", e.target.value)}
                  />
                </div>
              ) : null}
              {svReq.fatherName ? (
                <div className="space-y-2 sm:col-span-1">
                  <Label htmlFor="bgv-sv-father">Father&apos;s name</Label>
                  <Input
                    id="bgv-sv-father"
                    placeholder="As per PAN / court records"
                    value={sv.fatherName ?? ""}
                    onChange={(e) => setSvField("fatherName", e.target.value)}
                  />
                </div>
              ) : null}
              {svReq.address ? (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bgv-sv-address">Address</Label>
                  <Textarea
                    id="bgv-sv-address"
                    rows={3}
                    placeholder="Full address for court check"
                    value={sv.address ?? ""}
                    onChange={(e) => setSvField("address", e.target.value)}
                  />
                </div>
              ) : null}
              {svReq.documentId || svReq.documentType ? (
                <>
                  <div className="space-y-2 sm:col-span-1">
                    <Label htmlFor="bgv-sv-doc-id">Document ID</Label>
                    <Input
                      id="bgv-sv-doc-id"
                      value={sv.documentId ?? ""}
                      onChange={(e) => setSvField("documentId", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-1">
                    <Label>Document type</Label>
                    <Select
                      value={sv.documentType ?? ""}
                      onValueChange={(v) => setSvField("documentType", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIA_DOC_TYPES.map((d) => (
                          <SelectItem key={d.value} value={d.value}>
                            {d.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : null}
              {svReq.bankAccountNumber || svReq.bankIfsc ? (
                <>
                  <div className="space-y-2 sm:col-span-1">
                    <Label htmlFor="bgv-sv-bank-ac">Bank account number</Label>
                    <Input
                      id="bgv-sv-bank-ac"
                      inputMode="numeric"
                      autoComplete="off"
                      value={sv.bankAccountNumber ?? ""}
                      onChange={(e) => setSvField("bankAccountNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-1">
                    <Label htmlFor="bgv-sv-ifsc">IFSC</Label>
                    <Input
                      id="bgv-sv-ifsc"
                      className="font-mono uppercase"
                      placeholder="SBIN0001234"
                      value={sv.bankIfsc ?? ""}
                      onChange={(e) => setSvField("bankIfsc", e.target.value.toUpperCase())}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="bgv-sv-bank-phone">Bank phone (optional)</Label>
                    <Input
                      id="bgv-sv-bank-phone"
                      placeholder="If empty, subject phone is used"
                      value={sv.bankPhoneNumber ?? ""}
                      onChange={(e) => setSvField("bankPhoneNumber", e.target.value)}
                    />
                  </div>
                </>
              ) : null}
              {svReq.gstin ? (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bgv-sv-gstin">GSTIN</Label>
                  <Input
                    id="bgv-sv-gstin"
                    className="font-mono uppercase"
                    value={sv.gstin ?? ""}
                    onChange={(e) => setSvField("gstin", e.target.value.toUpperCase())}
                  />
                </div>
              ) : null}
              {svReq.cin ? (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bgv-sv-cin">CIN</Label>
                  <Input
                    id="bgv-sv-cin"
                    className="font-mono uppercase"
                    value={sv.cin ?? ""}
                    onChange={(e) => setSvField("cin", e.target.value.toUpperCase())}
                  />
                </div>
              ) : null}
              {svReq.vehicleRegistrationNumber ? (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bgv-sv-rc">Vehicle registration number</Label>
                  <Input
                    id="bgv-sv-rc"
                    className="font-mono uppercase"
                    value={sv.vehicleRegistrationNumber ?? ""}
                    onChange={(e) => setSvField("vehicleRegistrationNumber", e.target.value.toUpperCase())}
                  />
                </div>
              ) : null}
            </div>

            {(requestedChecks as string[]).some((c) => c === "COURT_RECORD" || c === "DOCUMENT_INDIA_ID") ? (
              <div className="space-y-3 border-t border-border/60 pt-4">
                <p className="text-xs font-medium text-muted-foreground">Optional extras</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bgv-sv-email">Email</Label>
                    <Input
                      id="bgv-sv-email"
                      type="email"
                      value={sv.email ?? ""}
                      onChange={(e) => setSvField("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bgv-sv-mother">Mother&apos;s name</Label>
                    <Input
                      id="bgv-sv-mother"
                      value={sv.motherName ?? ""}
                      onChange={(e) => setSvField("motherName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="bgv-sv-doc-dob">Document date of birth</Label>
                    <Input
                      id="bgv-sv-doc-dob"
                      type="date"
                      value={sv.documentDateOfBirth ?? ""}
                      onChange={(e) => setSvField("documentDateOfBirth", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {subjectVerificationError ? (
              <p className="text-xs text-amber-600 dark:text-amber-500">{subjectVerificationError}</p>
            ) : null}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={
            submitting ||
            !requesterId ||
            requestedChecks.length === 0 ||
            planFeaturesLoading ||
            !hasSubscription ||
            !!subjectVerificationError
          }
          size="lg"
          className="w-full sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit verification"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BgvFullCheckPanel;
