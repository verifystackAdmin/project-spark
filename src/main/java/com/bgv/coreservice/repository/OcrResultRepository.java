package com.bgv.coreservice.repository;

import com.bgv.coreservice.domain.OcrResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OcrResultRepository extends JpaRepository<OcrResult, UUID> {
}
