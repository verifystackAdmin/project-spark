package com.bgv.coreservice.client.impl;

import com.bgv.coreservice.client.NotificationClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
public class RestNotificationClient implements NotificationClient {
    private static final Logger logger = LoggerFactory.getLogger(RestNotificationClient.class);

    @Override
    public void triggerNotification(String event, Object payload) {
        logger.info("Triggering notification for event {}", event);
        // TODO: Make actual API call
    }
}