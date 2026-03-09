package com.bgv.coreservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerificationStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String stepId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private VerificationJob job;

    @Enumerated(EnumType.STRING)
    private StepType type;

    @Enumerated(EnumType.STRING)
    private StepStatus status;

    private int retryCount;
}
