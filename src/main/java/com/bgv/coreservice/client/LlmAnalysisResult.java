package com.bgv.coreservice.client;

import lombok.Data;

@Data
public class LlmAnalysisResult {
    private String summary;
    private String redFlags;
}
