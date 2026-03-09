package com.bgv.coreservice.repository;

import com.bgv.coreservice.domain.VerificationJob;
import com.bgv.coreservice.domain.VerificationResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface VerificationResultRepository extends JpaRepository<VerificationResult, UUID> {
    Optional<VerificationResult> findByJob(VerificationJob job);
}
