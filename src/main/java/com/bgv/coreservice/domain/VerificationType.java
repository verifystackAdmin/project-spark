package com.bgv.coreservice.domain;

public enum VerificationType {
    RELATIONSHIP_BACKGROUND_CHECK(FeatureCode.RELATIONSHIP_BACKGROUND_CHECK),
    TENANT_VERIFICATION(FeatureCode.TENANT_VERIFICATION),
    DOMESTIC_WORKER_VERIFICATION(FeatureCode.DOMESTIC_WORKER_VERIFICATION),
    FREELANCER_VERIFICATION(FeatureCode.FREELANCER_VERIFICATION),
    ONLINE_SELLER_VERIFICATION(FeatureCode.ONLINE_SELLER_VERIFICATION),
    DATING_PROFILE_AUTHENTICITY(FeatureCode.DATING_PROFILE_AUTHENTICITY),
    GLOBAL_IDENTITY_CHECK(FeatureCode.GLOBAL_IDENTITY_CHECK),
    CHAT_ANALYSIS(FeatureCode.CHAT_ANALYSIS),
    UNLIMITED_PLAN(FeatureCode.UNLIMITED);

    private final FeatureCode featureCode;

    VerificationType(FeatureCode featureCode) {
        this.featureCode = featureCode;
    }

    public FeatureCode getFeatureCode() {
        return featureCode;
    }
}
