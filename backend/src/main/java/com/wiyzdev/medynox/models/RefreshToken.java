package com.wiyzdev.medynox.models;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Refresh token entity for JWT refresh token management
 * Supports token rotation and revocation
 */
@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

	@Id
	@GeneratedValue
	@Column(nullable = false, updatable = false, columnDefinition = "uuid")
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_refresh_token_user"))
	private User user;

	@Column(nullable = false, unique = true, length = 500)
	private String token;

	@Column(name = "expires_at", nullable = false)
	private Instant expiresAt;

	@Builder.Default
	@Column(nullable = false)
	private Boolean revoked = false;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "replaced_by_token_id", foreignKey = @ForeignKey(name = "fk_refresh_token_replaced_by"))
	private RefreshToken replacedByToken;

	@Column(name = "created_at", nullable = false, updatable = false)
	private Instant createdAt;

	@Column(name = "created_by_ip", length = 45)
	private String createdByIp;

	@Column(name = "revoked_at")
	private Instant revokedAt;

	@Column(name = "revoked_by_ip", length = 45)
	private String revokedByIp;

	public boolean isExpired() {
		return Instant.now().isAfter(expiresAt);
	}

	public boolean isActive() {
		return !revoked && !isExpired();
	}
}

