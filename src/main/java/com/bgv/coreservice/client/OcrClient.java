package com.bgv.coreservice.client;

import java.io.InputStream;

public interface OcrClient {

    /**
     * Submits a document for OCR extraction.
     *
     * @param documentStream The document content as an InputStream.
     * @param contentType The content type of the document.
     * @return A unique identifier for the OCR task.
     */
    String submitOcrTask(InputStream documentStream, String contentType);

    /**
     * Retrieves the result of an OCR task.
     *
     * @param taskId The unique identifier of the OCR task.
     * @return The OCR result, or null if the task is not yet complete.
     */
    OcrResult getOcrResult(String taskId);

}
