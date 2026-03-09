package com.bgv.coreservice.controller;

import com.bgv.coreservice.dto.*;
import com.bgv.coreservice.service.orchestration.VerificationOrchestrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/verifications")
@RequiredArgsConstructor
public class VerificationController {

    private static final Logger logger = LoggerFactory.getLogger(VerificationController.class);
    private final VerificationOrchestrationService verificationOrchestrationService;

    @PostMapping
    public ResponseEntity<VerificationJobResponse> createVerification(@RequestBody @Valid CreateVerificationRequest request) {
        logger.info("Received request to create verification: {}", request);
        VerificationJobResponse response = verificationOrchestrationService.createVerificationJob(request);
        logger.info("Created verification job with id {}", response.id());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/{id}/documents")
    public ResponseEntity<Void> uploadDocument(@PathVariable UUID id,
                                               @RequestPart("request") @Valid DocumentUploadRequest request,
                                               @RequestPart("file") MultipartFile file) {
        logger.info("Received request to upload document for verification id {}", id);
        verificationOrchestrationService.uploadDocument(id, request, file);
        logger.info("Accepted document for verification id {}", id);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VerificationJobResponse> getVerification(@PathVariable UUID id) {
        logger.info("Received request to get verification status for id {}", id);
        VerificationJobResponse response = verificationOrchestrationService.getVerificationJob(id);
        logger.info("Returning verification status for id {}", id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/result")
    public ResponseEntity<VerificationResultResponse> getVerificationResult(@PathVariable UUID id) {
        logger.info("Received request to get verification result for id {}", id);
        VerificationResultResponse response = verificationOrchestrationService.getVerificationResult(id);
        if (response == null) {
            logger.info("Verification result not found for id {}", id);
            return ResponseEntity.notFound().build();
        }
        logger.info("Returning verification result for id {}", id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/report")
    public ResponseEntity<VerificationReportResponse> getVerificationReport(@PathVariable UUID id) {
        logger.info("Received request to get verification report for id {}", id);
        VerificationReportResponse response = verificationOrchestrationService.getVerificationReport(id);
        if (response == null) {
            logger.info("Verification report not found for id {}", id);
            return ResponseEntity.notFound().build();
        }
        logger.info("Returning verification report for id {}", id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelVerification(@PathVariable UUID id) {
        logger.info("Received request to cancel verification for id {}", id);
        verificationOrchestrationService.cancelVerification(id);
        logger.info("Accepted request to cancel verification for id {}", id);
        return ResponseEntity.accepted().build();
    }
}
