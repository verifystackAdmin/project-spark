package com.bgv.coreservice.dto;

import com.bgv.coreservice.domain.VerificationType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateVerificationRequest {
    private String userId;
    @NotNull
    private VerificationType verificationType;
}
