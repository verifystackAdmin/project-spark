package com.bgv.coreservice.client.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntitlementCheckRequest {
    private String userId;
    private String orgId;
    private String featureCode;
    private int count;
}
