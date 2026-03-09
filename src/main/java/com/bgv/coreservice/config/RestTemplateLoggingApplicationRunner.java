package com.bgv.coreservice.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class RestTemplateLoggingApplicationRunner implements ApplicationRunner {

    private final RestTemplate restTemplate;

    public RestTemplateLoggingApplicationRunner(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        restTemplate.getInterceptors().add(new LoggingInterceptor());
    }
}
