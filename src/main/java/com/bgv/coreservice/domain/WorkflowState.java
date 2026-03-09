package com.bgv.coreservice.domain;

public enum WorkflowState {
    RECEIVED,
    VALIDATED,
    BILLING_APPROVED,
    IN_PROGRESS,
    WAITING_ASYNC,
    FAILED,
    COMPLETED
}
