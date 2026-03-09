package com.bgv.coreservice.client;

import org.springframework.web.multipart.MultipartFile;

public interface StorageClient {
    String store(MultipartFile file);
}
