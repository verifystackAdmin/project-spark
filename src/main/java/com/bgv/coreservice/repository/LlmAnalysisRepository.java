package com.bgv.coreservice.repository;

import com.bgv.coreservice.domain.LlmAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LlmAnalysisRepository extends JpaRepository<LlmAnalysis, UUID> {
}
