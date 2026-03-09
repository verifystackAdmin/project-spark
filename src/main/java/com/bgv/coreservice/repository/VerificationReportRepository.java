package com.bgv.coreservice.repository;

import com.bgv.coreservice.domain.VerificationJob;
import com.bgv.coreservice.domain.VerificationReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface VerificationReportRepository extends JpaRepository<VerificationReport, UUID> {
    Optional<VerificationReport> findByJob(VerificationJob job);
}
