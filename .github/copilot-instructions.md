# VerifyMe AI Core - Copilot Instructions

## Architecture Overview
This is a React SPA verification platform built with Vite, TypeScript, Tailwind CSS, and shadcn/ui components. It integrates with a BGV Auth Service for authentication and provides AI-powered verification checks (identity, face match, phone credibility, social media analysis, chat analysis).

**Key Components:**
- **Frontend:** React Router for navigation, React Query for data fetching, React Hook Form + Zod for forms
- **Authentication:** JWT-based with automatic token refresh, Google OAuth support
- **UI:** shadcn/ui component library with Radix UI primitives, Lucide icons, Recharts for data visualization
- **Backend Integration:** REST API at `VITE_API_BASE_URL` (default: localhost:8080), proxied in dev

## Development Workflow
- **Start dev server:** `npm run dev` (runs on localhost:5173 with API proxy to :8080)
- **Build:** `npm run build` (outputs to dist/)
- **Lint:** `npm run lint` (ESLint with React/TypeScript rules)
- **Environment:** Create `.env` with `VITE_API_BASE_URL` and `VITE_GOOGLE_CLIENT_ID`

## Code Patterns
- **Imports:** Use `@/` alias for src/ (configured in vite.config.ts and components.json)
- **Styling:** `cn()` utility from lib/utils.ts for conditional Tailwind classes
- **Components:** shadcn/ui in components/ui/, custom components in components/, pages in pages/
- **API Calls:** Use apiClient from lib/api.ts (handles auth headers and token refresh automatically)
- **State Management:** React Context for auth (AuthContext), React Query for server state
- **Forms:** React Hook Form with Zod schemas, error handling via toast notifications
- **File Uploads:** DocumentUpload component with drag-drop, progress simulation
- **Navigation:** React Router with protected routes via AuthContext

## Key Files
- [src/App.tsx](src/App.tsx) - Main app with routing and providers
- [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx) - Authentication state and methods
- [src/lib/api.ts](src/lib/api.ts) - API client with JWT handling
- [src/components/ui/](src/components/ui/) - shadcn/ui components
- [src/pages/RunCheck.tsx](src/pages/RunCheck.tsx) - Verification flow entry point

## Conventions
- Component props use TypeScript interfaces
- Async operations use try/catch with toast error handling
- Local storage for tokens (accessToken, refreshToken)
- Responsive design with Tailwind breakpoints
- Dark mode support via next-themes (not fully implemented yet)

## API Integration
- Auth endpoints: /auth/register, /auth/login, /auth/google, /auth/refresh
- All non-auth requests include Bearer token in Authorization header
- Automatic 401 handling with token refresh
- CORS configured on backend for localhost:5173

## Common Tasks
- Adding new verification types: Update verificationTypes array in RunCheck.tsx
- New API endpoints: Add methods to ApiClient class in lib/api.ts
- UI components: Use shadcn/ui CLI or copy from existing patterns
- Forms: Use useForm hook with zodResolver and form schema