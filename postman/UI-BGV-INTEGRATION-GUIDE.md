# UI ↔ BGV API integration (single source)

Use the **public API gateway** only (`gatewayUrl`). Do not call internal service URLs from the browser.

## Variables (Postman / env)

| Variable | Purpose |
|----------|---------|
| `gatewayUrl` | e.g. `http://localhost:8080` or Azure public gateway URL |
| `adminApiKey` | Header `X-VerifyStack-Admin-Key` for **`/api/v1/billing/admin/**`** and **`/api/v1/notifications/admin/**`** only (Postman folders **01**, **06**). Default local: `dev-notification-admin-key` |
| `requesterId` | Signed-in user id — for B2C usually **email** |
| `tenantId` | **Must match** subscription `tenantId`; B2C: **same as `requesterId`** |
| `planId` | Set after admin “Create Plan” (collection test script) |
| `subscriptionId` | Set after “Create Subscription” (folder **02**) |
| `planFeatureId` | From `GET .../billing/admin/plans` → `plan.features[].featureId` (folder **01** PATCH/DELETE) |
| `reportId` | Set after `POST .../orchestrator/reports` |

## Package → `requestedChecks` (UI)

The **Run check** screen does **not** let users pick individual checks. It loads the signed-in user’s **active subscription**, reads **`plan.features`** (or matches `planId` to `GET /api/v1/billing/plans`), maps each `featureCode` to a check via `PLAN_FEATURE_CODE_TO_BG_CHECK` in `src/lib/bgvGatewayApi.ts`, and sends that list as `requestedChecks`.

| Plan `featureCode` | Sent as `requestedChecks` |
|--------------------|---------------------------|
| `IDENTITY_PAN` | `IDENTITY_PAN` |
| `IDENTITY_AADHAAR` | `IDENTITY_AADHAAR` |
| `EMPLOYMENT_EPFO` | `EMPLOYMENT_EPFO` |
| `COURT_RECORD` | `COURT_RECORD` |
| `CIBIL_CHECK` | `CREDIT_REPORT` |

Postman / raw API may still send any valid subset manually; the product UI always follows the plan.

### Billing / plan features

- Each check maps to a **plan feature**. The UI sends check type `CREDIT_REPORT`; the plan must include feature **`CIBIL_CHECK`** (catalog maps credit → CIBIL).
- Admin setup (once per env): create plan → add features per catalog → activate plan → user subscribes with `userId` + **`tenantId`** (same email as B2C for both).

## Rules

1. **`requesterId` + `tenantId`** must equal the values used in **`POST .../billing/subscriptions/{planId}`** (B2C: both = user email).
2. Orchestrator submit has **no** admin key.
3. After submit (`202` + `reportId`): **grant consent** → poll pipeline → GET report / PDF (see Postman folder **03–04**).

## One-shot submit (after plan + subscribe)

```bash
curl -sS -X POST "$GATEWAY_URL/api/v1/orchestrator/reports" \
  -H "Content-Type: application/json" \
  -d '{
    "requesterId": "user@example.com",
    "tenantId": "user@example.com",
    "subjectFullName": "Ramesh Kumar Singh",
    "subjectPhone": "9876543210",
    "requestedChecks": [
      "IDENTITY_PAN",
      "IDENTITY_AADHAAR",
      "EMPLOYMENT_EPFO",
      "COURT_RECORD",
      "CREDIT_REPORT"
    ]
  }'
```

Then: `POST .../consent/{reportId}/grant`, poll `GET .../aggregation/reports/{reportId}/pipeline`, then `GET .../reports/{reportId}`.

## Repo reference

- Postman: `postman/VerifyStack-API.postman_collection.json` — **VerifyStack — Full API (single collection)** (`vs-complete-2026`). Folders **00 → 08**: health, admin plans (**01** needs `X-VerifyStack-Admin-Key`), subscribe, BGV + consent, reports/dashboard, notifications, admin templates & analytics (**06** needs admin key), billing debug, local docker actuators. Product flows **00 → 02 → 03 → 04 → 05** need no admin key. Optional mock: `postman/KYC-Hub-Mock.postman_collection.json` if present.
- App code: `src/lib/bgvGatewayApi.ts` (`submitBgvReport`, `submitBgvReportAndGrantConsent`), `src/components/bgv/BgvFullCheckPanel.tsx`.
