package com.bgv.coreservice.dto;

import com.bgv.coreservice.domain.VerificationStatus;

import java.time.OffsetDateTime;
import java.util.UUID;

public record VerificationJobResponse(
        UUID id,
        String userId,
        VerificationStatus status,
        OffsetDateTime createdAt
) {
}
