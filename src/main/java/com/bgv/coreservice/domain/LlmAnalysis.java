package com.bgv.coreservice.domain;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "llm_analysis")
@Getter
@Setter
public class LlmAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id", nullable = false)
    private DocumentUpload document;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb", nullable = false)
    private String rawResponse;

    private Boolean forgeryDetected;

    private Boolean tamperingDetected;

    @Column(columnDefinition = "TEXT")
    private String analysisSummary;

    @Column(columnDefinition = "TEXT")
    private String explainableVerdict;

    @Column(nullable = false, updatable = false)
    private OffsetDateTime createdAt;

}
