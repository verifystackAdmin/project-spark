import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import SeoHead from "@/components/SeoHead";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import UseCases from "./pages/UseCases";
import HowItWorksPage from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DocumentUploadPage from "./pages/DocumentUploadPage";
import RunCheck from "./pages/RunCheck";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Refund from "./pages/Refund";
import Cookies from "./pages/Cookies";
import Help from "./pages/Help";
import ApiDocs from "./pages/ApiDocs";
import Status from "./pages/Status";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import DocumentVerification from "./pages/DocumentVerification";
import BusinessVerification from "./pages/BusinessVerification";
import TrustScore from "./pages/TrustScore";
import Demo from "./pages/Demo";
import Security from "./pages/Security";
import Newsletter from "./pages/Newsletter";
import SampleReport from "./pages/SampleReport";
import SampleReportPage from "./pages/SampleReportPage";
import LeadershipTeam from "./pages/LeadershipTeam";

// Product pages
import BusinessBackgroundVerification from "./pages/product/BusinessBackgroundVerification";
import TenantPropertyVerification from "./pages/product/TenantPropertyVerification";
import DomesticWorkerVerificationProduct from "./pages/product/DomesticWorkerVerification";
import PersonalIdentityVerification from "./pages/product/PersonalIdentityVerification";
import VerifyStackShield from "./pages/product/VerifyStackShield";
import VerifyStackRiskEngine from "./pages/product/VerifyStackRiskEngine";
import VerifyStackTrustScore from "./pages/product/VerifyStackTrustScore";

// Use-case pages
import EmploymentVerification from "./pages/use-case/EmploymentVerification";
import EducationVerification from "./pages/use-case/EducationVerification";
import ContractorVendorVerification from "./pages/use-case/ContractorVendorVerification";
import AddressVerification from "./pages/use-case/AddressVerification";
import CriminalRecordCheck from "./pages/use-case/CriminalRecordCheck";
import IdentityVerification from "./pages/use-case/IdentityVerification";
import TenantVerification from "./pages/use-case/TenantVerification";
import RoommateVerification from "./pages/use-case/RoommateVerification";
import PGResidentVerification from "./pages/use-case/PGResidentVerification";
import RentalBackgroundCheck from "./pages/use-case/RentalBackgroundCheck";
import MaidVerification from "./pages/use-case/MaidVerification";
import DriverVerification from "./pages/use-case/DriverVerification";
import CaregiverVerification from "./pages/use-case/CaregiverVerification";
import CookVerification from "./pages/use-case/CookVerification";
import HousehelpBackgroundCheck from "./pages/use-case/HousehelpBackgroundCheck";
import RelationshipBackgroundCheck from "./pages/use-case/RelationshipBackgroundCheck";
import DatingProfileVerification from "./pages/use-case/DatingProfileVerification";
import OnlineSellerVerification from "./pages/use-case/OnlineSellerVerification";
import SocialRiskCheck from "./pages/use-case/SocialRiskCheck";
import FreelancerVerificationUseCase from "./pages/use-case/FreelancerVerification";

// Legacy use-case pages
import TenantScreening from "./pages/use-cases/TenantScreening";
import EmployeeBackgroundCheck from "./pages/use-cases/EmployeeBackgroundCheck";
import FreelancerVerification from "./pages/use-cases/FreelancerVerification";
import HousingSocietyScreening from "./pages/use-cases/HousingSocietyScreening";
import StaffingAgencyVerification from "./pages/use-cases/StaffingAgencyVerification";
import VendorVerification from "./pages/use-cases/VendorVerification";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ThemeProvider>
        <SeoHead />
        <ScrollToTop />
        <AuthProvider>
          <div className="min-h-dvh min-w-0 overflow-x-clip">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/upload-documents" element={<DocumentUploadPage />} />
            <Route path="/run-check" element={<RunCheck />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/payments" element={<Payments />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/reports" element={<Reports />} />
            </Route>
            <Route path="/report" element={<Report />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/team" element={<LeadershipTeam />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/help" element={<Help />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/status" element={<Status />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/security" element={<Security />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/sample-report" element={<SampleReport />} />
            <Route path="/sample-report/view" element={<SampleReportPage />} />
            <Route path="/document-verification" element={<DocumentVerification />} />
            <Route path="/business-verification" element={<BusinessVerification />} />
            <Route path="/trust-score" element={<TrustScore />} />
            <Route path="/demo" element={<Demo />} />

            {/* Industry solutions (canonical URLs) */}
            <Route path="/solutions/business-background-verification" element={<BusinessBackgroundVerification />} />
            <Route path="/solutions/tenant-property-verification" element={<TenantPropertyVerification />} />
            <Route path="/solutions/personal-identity-verification" element={<PersonalIdentityVerification />} />
            <Route path="/solutions/domestic-worker-verification" element={<DomesticWorkerVerificationProduct />} />

            {/* Branded products only */}
            <Route path="/product/verifystack-shield" element={<VerifyStackShield />} />
            <Route path="/product/verifystack-riskengine" element={<VerifyStackRiskEngine />} />
            <Route path="/product/verifystack-trustscore" element={<VerifyStackTrustScore />} />

            {/* Legacy /product/* industry URLs → canonical */}
            <Route
              path="/product/business-background-verification"
              element={<Navigate to="/solutions/business-background-verification" replace />}
            />
            <Route
              path="/product/tenant-property-verification"
              element={<Navigate to="/solutions/tenant-property-verification" replace />}
            />
            <Route
              path="/product/personal-identity-verification"
              element={<Navigate to="/solutions/personal-identity-verification" replace />}
            />
            <Route
              path="/product/domestic-worker-verification"
              element={<Navigate to="/solutions/domestic-worker-verification" replace />}
            />
            <Route
              path="/use-cases/domestic-worker-verification"
              element={<Navigate to="/solutions/domestic-worker-verification" replace />}
            />

            {/* Use Case Pages */}
            <Route path="/use-case/employment-verification" element={<EmploymentVerification />} />
            <Route path="/use-case/education-verification" element={<EducationVerification />} />
            <Route path="/use-case/contractor-vendor-verification" element={<ContractorVendorVerification />} />
            <Route path="/use-case/address-verification" element={<AddressVerification />} />
            <Route path="/use-case/criminal-record-check" element={<CriminalRecordCheck />} />
            <Route path="/use-case/identity-verification" element={<IdentityVerification />} />
            <Route path="/use-case/tenant-verification" element={<TenantVerification />} />
            <Route path="/use-case/roommate-verification" element={<RoommateVerification />} />
            <Route path="/use-case/pg-resident-verification" element={<PGResidentVerification />} />
            <Route path="/use-case/rental-background-check" element={<RentalBackgroundCheck />} />
            <Route path="/use-case/maid-verification" element={<MaidVerification />} />
            <Route path="/use-case/driver-verification" element={<DriverVerification />} />
            <Route path="/use-case/caregiver-verification" element={<CaregiverVerification />} />
            <Route path="/use-case/cook-verification" element={<CookVerification />} />
            <Route path="/use-case/househelp-background-check" element={<HousehelpBackgroundCheck />} />
            <Route path="/use-case/relationship-background-check" element={<RelationshipBackgroundCheck />} />
            <Route path="/use-case/dating-profile-verification" element={<DatingProfileVerification />} />
            <Route path="/use-case/online-seller-verification" element={<OnlineSellerVerification />} />
            <Route path="/use-case/social-risk-check" element={<SocialRiskCheck />} />
            <Route path="/use-case/freelancer-verification" element={<FreelancerVerificationUseCase />} />

            {/* Legacy use-case routes */}
            <Route path="/use-cases/tenant-screening" element={<TenantScreening />} />
            <Route path="/use-cases/employee-background-check" element={<EmployeeBackgroundCheck />} />
            <Route path="/use-cases/freelancer-verification" element={<FreelancerVerification />} />
            <Route path="/use-cases/housing-society-screening" element={<HousingSocietyScreening />} />
            <Route path="/use-cases/staffing-agency-verification" element={<StaffingAgencyVerification />} />
            <Route path="/use-cases/vendor-verification" element={<VendorVerification />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
