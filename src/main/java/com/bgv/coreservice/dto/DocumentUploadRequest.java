package com.bgv.coreservice.dto;

import com.bgv.coreservice.domain.DocumentType;

public record DocumentUploadRequest(
        DocumentType documentType,
        String documentUrl
) {
}
