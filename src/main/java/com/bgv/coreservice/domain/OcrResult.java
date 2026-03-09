package com.bgv.coreservice.domain;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "ocr_result")
@Getter
@Setter
public class OcrResult {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id", nullable = false)
    private DocumentUpload document;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb", nullable = false)
    private String rawResponse;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private String extractedData;

    private Boolean isValid;

    @Column(nullable = false, updatable = false)
    private OffsetDateTime createdAt;

}
