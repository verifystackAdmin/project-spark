package com.bgv.coreservice.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "document_upload")
@Getter
@Setter
public class DocumentUpload {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private VerificationJob job;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DocumentType documentType;

    @Column(nullable = false, length = 2048)
    private String storageUrl;

    @Column(nullable = false, length = 64)
    private String checksum;

    @Column(nullable = false, updatable = false)
    private OffsetDateTime createdAt;

}
