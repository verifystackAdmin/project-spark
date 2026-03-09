package com.bgv.coreservice.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record VerificationReportResponse(
        UUID jobId,
        String reportUrl,
        String checksum,
        OffsetDateTime createdAt
) {
}
