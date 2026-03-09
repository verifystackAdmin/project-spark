package com.bgv.coreservice.client.impl;

import com.bgv.coreservice.client.OcrClient;
import com.bgv.coreservice.client.OcrResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
@Primary
public class RestOcrClient implements OcrClient {
    private static final Logger logger = LoggerFactory.getLogger(RestOcrClient.class);

    @Override
    public String submitOcrTask(InputStream documentStream, String contentType) {
        logger.info("Submitting OCR task");
        // TODO: Make actual API call
        return "ocr-task-123";
    }

    @Override
    public OcrResult getOcrResult(String taskId) {
        logger.info("Getting OCR result for task {}", taskId);
        // TODO: Make actual API call
        return new OcrResult();
    }
}