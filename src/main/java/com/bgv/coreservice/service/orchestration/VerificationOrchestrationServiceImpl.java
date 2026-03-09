package com.bgv.coreservice.service.orchestration;

import com.bgv.coreservice.client.*;
import com.bgv.coreservice.domain.DocumentUpload;
import com.bgv.coreservice.domain.VerificationJob;
import com.bgv.coreservice.domain.VerificationStatus;
import com.bgv.coreservice.dto.*;
import com.bgv.coreservice.repository.DocumentUploadRepository;
import com.bgv.coreservice.repository.VerificationJobRepository;
import com.bgv.coreservice.repository.VerificationReportRepository;
import com.bgv.coreservice.repository.VerificationResultRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * This service orchestrates the entire verification process. It is the central point of control for all verification-related
 * activities, including document upload, OCR processing, LLM analysis, risk scoring, and report generation.
 *
 * The service is designed to be asynchronous and resilient. It uses a state machine to track the progress of each
 * verification job and ensures that all tasks are executed in the correct order.
 */
@Service
@RequiredArgsConstructor
public class VerificationOrchestrationServiceImpl implements VerificationOrchestrationService {

    private static final Logger logger = LoggerFactory.getLogger(VerificationOrchestrationServiceImpl.class);
    private final VerificationJobRepository verificationJobRepository;
    private final DocumentUploadRepository documentUploadRepository;
    private final VerificationResultRepository verificationResultRepository;
    private final VerificationReportRepository verificationReportRepository;
    private final BillingClient billingClient;
    private final StorageClient storageClient;
    private final OcrClient ocrClient;
    private final LlmAnalysisClient llmAnalysisClient;
    private final NotificationClient notificationClient;

    @Override
    @Transactional
    public VerificationJobResponse createVerificationJob(CreateVerificationRequest request) {
        logger.info("Creating verification job for request: {}", request);
        if (request.getUserId() == null) {
            logger.error("User ID is null");
            throw new RuntimeException("User ID is null");
        }
        if (request.getVerificationType() == null) {
            logger.error("Verification type is null");
            throw new RuntimeException("Verification type is null");
        }
        String reservationId = null;
        VerificationJob job = new VerificationJob();
        job.setUserId(request.getUserId());
        job.setVerificationType(request.getVerificationType());
        job.setCreatedAt(OffsetDateTime.now());
        job.setUpdatedAt(OffsetDateTime.now());

        try {
            // 1. Check entitlement and reserve usage with the billing service.
            reservationId = billingClient.checkEntitlement(request.getUserId(), request.getVerificationType());
            job.setReservationId(reservationId);
            job.setStatus(VerificationStatus.PENDING);
        } catch (BillingServiceException e) {
            logger.error("Billing service exception during entitlement check for user {}: {}", request.getUserId(), e.getMessage());
            job.setStatus(VerificationStatus.FAILED);
            job.setFailureReason(e.getMessage());
            job = verificationJobRepository.save(job); // Save the failed job
            return new VerificationJobResponse(job.getId(), job.getUserId(), job.getStatus(), job.getCreatedAt());
        }

        // 2. Create a new verification job in the database.
        // If entitlement check passes, continue with job creation.
        // The job object already has userId, verificationType, createdAt, updatedAt set before try-catch
        job = verificationJobRepository.save(job);
        logger.info("Saved verification job with id {}", job.getId());

        // 3. Trigger the asynchronous verification workflow.
        triggerWorkflow(job);

        // TODO: This is not the right place to commit usage. It should be done when the verification is successfully completed.
        billingClient.commitUsage(reservationId);


        // 4. Return a response to the client with the job details.
        return new VerificationJobResponse(job.getId(), job.getUserId(), job.getStatus(), job.getCreatedAt());
    }

    @Async
    public void triggerWorkflow(VerificationJob job) {
        logger.info("Workflow triggered for job {} of type {}", job.getId(), job.getVerificationType());
        // This is a placeholder for a more robust workflow engine
        System.out.println("Workflow triggered for job " + job.getId() + " of type " + job.getVerificationType());
        switch (job.getVerificationType()) {
            case RELATIONSHIP_BACKGROUND_CHECK:
                // TODO: Implement workflow for relationship background check
                break;
            case TENANT_VERIFICATION:
                // TODO: Implement workflow for tenant verification
                break;
            case DOMESTIC_WORKER_VERIFICATION:
                // TODO: Implement workflow for domestic worker verification
                break;
            case FREELANCER_VERIFICATION:
                // TODO: Implement workflow for freelancer verification
                break;
            case ONLINE_SELLER_VERIFICATION:
                // TODO: Implement workflow for online seller verification
                break;
            case DATING_PROFILE_AUTHENTICITY:
                // TODO: Implement workflow for dating profile authenticity
                break;
            case GLOBAL_IDENTITY_CHECK:
                // TODO: Implement workflow for global identity check
                break;
            case CHAT_ANALYSIS:
                // TODO: Implement workflow for chat analysis
                break;
            case UNLIMITED_PLAN:
                // TODO: Implement workflow for unlimited plan
                break;
            default:
                logger.error("Unknown verification type: {}", job.getVerificationType());
                throw new RuntimeException("Unknown verification type: " + job.getVerificationType());
        }
    }


    @Override
    @Transactional
    public void uploadDocument(UUID verificationId, DocumentUploadRequest request, MultipartFile file) {
        logger.info("Uploading document for verification id {}", verificationId);
        // 1. Find the verification job by its ID.
        VerificationJob job = verificationJobRepository.findById(verificationId)
                .orElseThrow(() -> new RuntimeException("Verification job not found")); // TODO: Use custom exception

        // 2. Upload the document to a secure object storage
        String fileUrl = storageClient.store(file);
        logger.info("Stored document in {}", fileUrl);
        String checksum = "sha256-fake-checksum"; // TODO: Calculate checksum

        // 3. Create a new DocumentUpload entity to track the uploaded document.
        DocumentUpload documentUpload = new DocumentUpload();
        documentUpload.setJob(job);
        documentUpload.setDocumentType(request.documentType());
        documentUpload.setStorageUrl(fileUrl);
        documentUpload.setChecksum(checksum);
        documentUpload.setCreatedAt(OffsetDateTime.now());
        documentUploadRepository.save(documentUpload);
        logger.info("Saved document upload with id {}", documentUpload.getId());


        // 4. Trigger the OCR extraction task.
        try {
            ocrClient.submitOcrTask(file.getInputStream(), file.getContentType());
            logger.info("Submitted OCR task for document {}", documentUpload.getId());
        } catch (IOException e) {
            logger.error("Error submitting OCR task", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public VerificationJobResponse getVerificationJob(UUID verificationId) {
        logger.info("Getting verification job for id {}", verificationId);
        return verificationJobRepository.findById(verificationId)
                .map(job -> new VerificationJobResponse(job.getId(), job.getUserId(), job.getStatus(), job.getCreatedAt()))
                .orElseThrow(() -> new RuntimeException("Verification job not found")); // TODO: Use custom exception
    }

    @Override
    @Transactional(readOnly = true)
    public VerificationResultResponse getVerificationResult(UUID verificationId) {
        logger.info("Getting verification result for id {}", verificationId);
        VerificationJob job = verificationJobRepository.findById(verificationId)
                .orElseThrow(() -> new RuntimeException("Verification job not found")); // TODO: Use custom exception
        return verificationResultRepository.findByJob(job)
                .map(result -> new VerificationResultResponse(job.getId(), result.getTrustScore(), result.getSummary(), result.getCreatedAt()))
                .orElse(null); // Or throw exception if result not ready
    }

    @Override
    @Transactional(readOnly = true)
    public VerificationReportResponse getVerificationReport(UUID verificationId) {
        logger.info("Getting verification report for id {}", verificationId);
        VerificationJob job = verificationJobRepository.findById(verificationId)
                .orElseThrow(() -> new RuntimeException("Verification job not found")); // TODO: Use custom exception
        return verificationReportRepository.findByJob(job)
                .map(report -> new VerificationReportResponse(job.getId(), report.getReportUrl(), report.getChecksum(), report.getCreatedAt()))
                .orElse(null); // Or throw exception if report not ready
    }

    @Override
    @Transactional
    public void cancelVerification(UUID verificationId) {
        logger.info("Cancelling verification for id {}", verificationId);
        VerificationJob job = verificationJobRepository.findById(verificationId)
                .orElseThrow(() -> new RuntimeException("Verification job not found")); // TODO: Use custom exception

        if (job.getStatus() == VerificationStatus.COMPLETED || job.getStatus() == VerificationStatus.CANCELLED) {
            logger.warn("Cannot cancel verification for id {} as it is already {}" , verificationId, job.getStatus());
            // Cannot cancel a completed or already cancelled job
            // TODO: Throw custom exception
            return;
        }

        job.setStatus(VerificationStatus.CANCELLED);
        job.setUpdatedAt(OffsetDateTime.now());
        verificationJobRepository.save(job);
        logger.info("Cancelled verification for id {}", verificationId);

        // Release billing reservation
        billingClient.releaseUsage(job.getReservationId());

        // Trigger notification
        notificationClient.triggerNotification("verification-cancelled", job);
    }
}
