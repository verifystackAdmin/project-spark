package com.bgv.coreservice.service.orchestration;

import com.bgv.coreservice.dto.CreateVerificationRequest;
import com.bgv.coreservice.dto.DocumentUploadRequest;
import com.bgv.coreservice.dto.VerificationJobResponse;
import com.bgv.coreservice.dto.VerificationReportResponse;
import com.bgv.coreservice.dto.VerificationResultResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface VerificationOrchestrationService {

    VerificationJobResponse createVerificationJob(CreateVerificationRequest request);

    void uploadDocument(UUID verificationId, DocumentUploadRequest request, MultipartFile file);

    VerificationJobResponse getVerificationJob(UUID verificationId);

    VerificationResultResponse getVerificationResult(UUID verificationId);

    VerificationReportResponse getVerificationReport(UUID verificationId);

    void cancelVerification(UUID verificationId);
}
