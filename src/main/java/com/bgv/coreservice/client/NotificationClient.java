package com.bgv.coreservice.client;

public interface NotificationClient {

    /**
     * Triggers a notification.
     *
     * @param event The event to notify about.
     * @param payload The payload associated with the event.
     */
    void triggerNotification(String event, Object payload);
}
