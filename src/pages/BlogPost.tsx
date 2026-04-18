import type { FC } from "react";
import { useParams, Navigate } from "react-router-dom";
import EmployeeBackgroundVerificationIndia2026 from "./blog/EmployeeBackgroundVerificationIndia2026";
import VendorDueDiligenceB2BContractors2026 from "./blog/VendorDueDiligenceB2BContractors2026";
import LandlordsChecklist2026 from "./blog/LandlordsChecklist2026";
import DegreeMillsForgedCertificates2026 from "./blog/DegreeMillsForgedCertificates2026";
import MaidDigitalVerificationHomeSafety2026 from "./blog/MaidDigitalVerificationHomeSafety2026";

const postRegistry: Record<string, FC> = {
  "degree-mills-forged-certificates-education-verification-2026": DegreeMillsForgedCertificates2026,
  "landlords-checklist-2026-handover-property-management": LandlordsChecklist2026,
  "maid-digital-verification-aadhaar-not-enough-2026": MaidDigitalVerificationHomeSafety2026,
  "vendor-due-diligence-b2b-contractors-2026": VendorDueDiligenceB2BContractors2026,
  "employee-background-verification-india-2026": EmployeeBackgroundVerificationIndia2026,
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const Post = slug ? postRegistry[slug] : undefined;
  if (!Post) return <Navigate to="/blog" replace />;
  return <Post />;
};

export default BlogPost;
