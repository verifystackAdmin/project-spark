package com.bgv.coreservice.client;

import com.bgv.coreservice.domain.VerificationType;

public interface BillingClient {
    String checkEntitlement(String userId, VerificationType verificationType);
    void commitUsage(String reservationId);
    void releaseUsage(String reservationId);
}
