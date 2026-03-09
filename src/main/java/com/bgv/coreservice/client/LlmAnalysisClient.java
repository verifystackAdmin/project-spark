package com.bgv.coreservice.client;

import com.bgv.coreservice.client.LlmAnalysisResult;

public interface LlmAnalysisClient {

    /**
     * Submits OCR data for forgery and tampering analysis.
     *
     * @param ocrData The extracted OCR data.
     * @return The analysis result.
     */
    LlmAnalysisResult submitAnalysisTask(String ocrData);

}
