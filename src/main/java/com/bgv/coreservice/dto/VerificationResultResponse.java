package com.bgv.coreservice.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record VerificationResultResponse(
        UUID jobId,
        BigDecimal trustScore,
        String summary,
        OffsetDateTime createdAt
) {
}
