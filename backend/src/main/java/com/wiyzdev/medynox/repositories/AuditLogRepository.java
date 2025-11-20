package com.wiyzdev.medynox.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wiyzdev.medynox.models.AuditLog;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {

	Page<AuditLog> findByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);

	Page<AuditLog> findByActionOrderByCreatedAtDesc(String action, Pageable pageable);

	@Query("SELECT al FROM AuditLog al WHERE al.entityType = :entityType AND al.entityId = :entityId ORDER BY al.createdAt DESC")
	Page<AuditLog> findByEntity(@Param("entityType") String entityType, @Param("entityId") UUID entityId, Pageable pageable);
}

