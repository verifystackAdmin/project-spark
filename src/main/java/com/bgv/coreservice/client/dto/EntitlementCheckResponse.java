package com.bgv.coreservice.client.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntitlementCheckResponse {
    private String reservationId;
    private boolean entitled;
}
