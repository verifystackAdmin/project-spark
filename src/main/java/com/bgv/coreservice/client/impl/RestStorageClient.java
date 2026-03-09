package com.bgv.coreservice.client.impl;

import com.bgv.coreservice.client.StorageClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Primary
public class RestStorageClient implements StorageClient {
    private static final Logger logger = LoggerFactory.getLogger(RestStorageClient.class);

    @Override
    public String store(MultipartFile file) {
        logger.info("Storing file {}", file.getOriginalFilename());
        // TODO: Make actual API call
        return "https://fake-storage.com/" + file.getOriginalFilename();
    }
}