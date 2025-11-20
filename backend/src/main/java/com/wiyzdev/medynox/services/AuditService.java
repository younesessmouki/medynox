package com.wiyzdev.medynox.services;

import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wiyzdev.medynox.models.AuditLog;
import com.wiyzdev.medynox.models.User;
import com.wiyzdev.medynox.repositories.AuditLogRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

/**
 * Service for audit logging
 */
@Service
@RequiredArgsConstructor
public class AuditService {

	private final AuditLogRepository auditLogRepository;

	/**
	 * Log an action
	 */
	@Transactional
	public void log(String action, User user, String entityType, UUID entityId, Map<String, Object> details, HttpServletRequest request) {
		var auditLog = AuditLog.builder()
			.user(user)
			.action(action)
			.entityType(entityType)
			.entityId(entityId)
			.details(details)
			.ipAddress(extractIpAddress(request))
			.userAgent(request != null ? request.getHeader("User-Agent") : null)
			.build();

		auditLogRepository.save(auditLog);
	}

	/**
	 * Log an action without entity
	 */
	@Transactional
	public void log(String action, User user, Map<String, Object> details, HttpServletRequest request) {
		log(action, user, null, null, details, request);
	}

	/**
	 * Extract IP address from request
	 */
	private String extractIpAddress(HttpServletRequest request) {
		if (request == null) {
			return null;
		}

		var xForwardedFor = request.getHeader("X-Forwarded-For");
		if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
			return xForwardedFor.split(",")[0].trim();
		}

		var xRealIp = request.getHeader("X-Real-IP");
		if (xRealIp != null && !xRealIp.isEmpty()) {
			return xRealIp;
		}

		return request.getRemoteAddr();
	}
}

