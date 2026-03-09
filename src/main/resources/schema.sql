-- Fintech-grade, compliance-ready database schema for BGV Core Service
-- All timestamps are in UTC.
-- All ENUM types are defined to ensure data integrity.
-- Audit trail tables are included for compliance.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types for status fields
CREATE TYPE verification_status AS ENUM (
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'FAILED',
    'CANCELLED'
);

CREATE TYPE verification_task_type AS ENUM (
    'OCR_EXTRACTION',
    'LLM_FORGERY_ANALYSIS',
    'RISK_SCORING',
    'REPORT_GENERATION',
    'BILLING'
);

CREATE TYPE document_type AS ENUM (
    'PAN',
    'AADHAAR',
    'PASSPORT',
    'DRIVING_LICENSE'
);

CREATE TYPE verification_type AS ENUM (
    'RELATIONSHIP_BACKGROUND_CHECK',
    'TENANT_VERIFICATION',
    'DOMESTIC_WORKER_VERIFICATION',
    'FREELANCER_VERIFICATION',
    'ONLINE_SELLER_VERIFICATION',
    'DATING_PROFILE_AUTHENTICITY',
    'GLOBAL_IDENTITY_CHECK',
    'CHAT_ANALYSIS'
);

-- Main table for the entire verification job
CREATE TABLE verification_job (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL, -- The user for whom the verification is being done
    reservation_id VARCHAR(255),
    verification_type verification_type NOT NULL,
    status verification_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table to track individual tasks within a verification job
CREATE TABLE verification_task (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES verification_job(id),
    task_type verification_task_type NOT NULL,
    status verification_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table to store uploaded documents
CREATE TABLE document_upload (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES verification_job(id),
    document_type document_type NOT NULL,
    storage_url VARCHAR(2048) NOT NULL, -- URL to the document in object storage
    checksum VARCHAR(64) NOT NULL, -- SHA-256 checksum of the document
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table to store results from the OCR service
CREATE TABLE ocr_result (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES document_upload(id),
    raw_response JSONB NOT NULL, -- Raw JSON response from the OCR service
    extracted_data JSONB, -- Cleaned and structured data
    is_valid BOOLEAN,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table to store results from the LLM analysis service
CREATE TABLE llm_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES document_upload(id),
    raw_response JSONB NOT NULL, -- Raw JSON response from the LLM service
    forgery_detected BOOLEAN,
    tampering_detected BOOLEAN,
    analysis_summary TEXT,
    explainable_verdict TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table to store the final verification result and trust score
CREATE TABLE verification_result (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES verification_job(id),
    trust_score NUMERIC(5, 2) NOT NULL,
    summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table to store the generated PDF report
CREATE TABLE verification_report (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES verification_job(id),
    report_url VARCHAR(2048) NOT NULL, -- URL to the signed PDF report
    checksum VARCHAR(64) NOT NULL, -- SHA-256 checksum of the report
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Audit log for all significant events
CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    job_id UUID REFERENCES verification_job(id),
    event_type VARCHAR(255) NOT NULL,
    event_details JSONB,
    created_by VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_verification_job_user_id ON verification_job(user_id);
CREATE INDEX idx_verification_task_job_id ON verification_task(job_id);
CREATE INDEX idx_document_upload_job_id ON document_upload(job_id);
CREATE INDEX idx_ocr_result_document_id ON ocr_result(document_id);
CREATE INDEX idx_llm_analysis_document_id ON llm_analysis(document_id);
CREATE INDEX idx_verification_result_job_id ON verification_result(job_id);
CREATE INDEX idx_verification_report_job_id ON verification_report(job_id);
CREATE INDEX idx_audit_log_job_id ON audit_log(job_id);
