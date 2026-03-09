package com.bgv.coreservice.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "verification_report")
@Getter
@Setter
public class VerificationReport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private VerificationJob job;

    @Column(nullable = false, length = 2048)
    private String reportUrl;

    @Column(nullable = false, length = 64)
    private String checksum;

    @Column(nullable = false, updatable = false)
    private OffsetDateTime createdAt;

}
