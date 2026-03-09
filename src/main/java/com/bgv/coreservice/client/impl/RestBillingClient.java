package com.bgv.coreservice.client.impl;

import com.bgv.coreservice.client.BillingClient;
import com.bgv.coreservice.client.dto.EntitlementCheckRequest;
import com.bgv.coreservice.client.dto.EntitlementCheckResponse;
import com.bgv.coreservice.client.dto.UsageRequest;
import com.bgv.coreservice.domain.VerificationType;
import com.bgv.coreservice.exception.BillingServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

@Primary
@Service
public class RestBillingClient implements BillingClient {

    private static final Logger logger = LoggerFactory.getLogger(RestBillingClient.class);
    private final RestTemplate restTemplate;
    private final String billingServiceUrl;

    public RestBillingClient(RestTemplate restTemplate, @Value("${billing.service.url}") String billingServiceUrl) {
        this.restTemplate = restTemplate;
        this.billingServiceUrl = billingServiceUrl;
    }

    @Override
    public String checkEntitlement(String userId, VerificationType verificationType) {
        EntitlementCheckRequest request = new EntitlementCheckRequest(userId, null, verificationType.getFeatureCode().toString(), 1);
        logger.info("Checking entitlement for user {} and verification type {}", userId, verificationType);
        try {
            EntitlementCheckResponse response = restTemplate.postForObject(billingServiceUrl + "/entitlements/check", request, EntitlementCheckResponse.class);
            if (response == null || !response.isEntitled()) {
                logger.error("User {} is not entitled for verification type {}", userId, verificationType);
                throw new BillingServiceException("User is not entitled for this verification type");
            }
            logger.info("User {} is entitled for verification type {}. Reservation ID: {}", userId, verificationType, response.getReservationId());
            return response.getReservationId();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            logger.error("Error from billing service: {}", e.getMessage());
            throw new BillingServiceException("Error from billing service");
        }
    }

    @Override
    public void commitUsage(String reservationId) {
        UsageRequest request = new UsageRequest(reservationId);
        logger.info("Committing usage for reservation ID {}", reservationId);
        restTemplate.postForObject(billingServiceUrl + "/usage/commit", request, Void.class);
        logger.info("Committed usage for reservation ID {}", reservationId);
    }

    @Override
    public void releaseUsage(String reservationId) {
        UsageRequest request = new UsageRequest(reservationId);
        logger.info("Releasing usage for reservation ID {}", reservationId);
        restTemplate.postForObject(billingServiceUrl + "/usage/release", request, Void.class);
        logger.info("Released usage for reservation ID {}", reservationId);
    }
}