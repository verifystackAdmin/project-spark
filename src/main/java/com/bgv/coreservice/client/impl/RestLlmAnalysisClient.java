package com.bgv.coreservice.client.impl;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.bgv.coreservice.client.LlmAnalysisClient;
import com.bgv.coreservice.client.LlmAnalysisResult;
import com.bgv.coreservice.llm.ChatAnalysisPrompt;
import com.google.genai.client.GenerativeAIClient;
import com.google.genai.model.GenerativeModel;
import com.google.genai.requests.GenerateContentRequest;
import com.google.genai.types.GenerateContentResponse;

@Service
@Primary
public class RestLlmAnalysisClient implements LlmAnalysisClient {
    private static final Logger logger = LoggerFactory.getLogger(RestLlmAnalysisClient.class);
    private final String apiKey;
    private final String modelName;

    public RestLlmAnalysisClient(@Value("${gemini.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.modelName = "gemini-pro";
    }


    @Override
    public LlmAnalysisResult submitAnalysisTask(String ocrData) {
        logger.info("Submitting analysis task");
        String prompt = "Analyze the following chat conversation for red flags like manipulation, gaslighting, and emotional abuse.\\nProvide a summary of the conversation and a list of any red flags found.\\n\\nConversation:\\n" + ocrData;
        try {
            GenerativeAIClient generativeAIClient = GenerativeAIClient.builder().setApiKey(apiKey).build();
            GenerativeModel model = generativeAIClient.getGenerativeModel(modelName);
            GenerateContentResponse response = model.generateContent(prompt);
            String summary = response.getText();
            logger.info("LLM analysis result: {}", summary);
            LlmAnalysisResult result = new LlmAnalysisResult();
            result.setSummary(summary);
            return result;
        } catch (Exception e) {
            logger.error("Error submitting analysis task", e);
            throw new RuntimeException(e);
        }
    }
}