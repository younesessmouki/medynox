package com.wiyzdev.medynox.security;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wiyzdev.medynox.models.RefreshToken;
import com.wiyzdev.medynox.models.User;
import com.wiyzdev.medynox.repositories.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;

/**
 * Service for managing refresh tokens with rotation and revocation
 */
@Service
@RequiredArgsConstructor
public class RefreshTokenService {

	private final RefreshTokenRepository refreshTokenRepository;
	private final JwtService jwtService;

	@Value("${jwt.refresh.expiration:604800000}") // Default 7 days in milliseconds
	private long refreshTokenExpirationMillis;

	/**
	 * Create a new refresh token for a user
	 */
	@Transactional
	public RefreshToken createRefreshToken(User user, String ipAddress) {
		// Revoke all existing tokens for this user (optional: can allow multiple devices)
		// For now, we'll allow multiple devices but limit to prevent abuse
		var maxActiveTokens = 5;
		var activeCount = refreshTokenRepository.countActiveTokensByUserId(user.getId(), Instant.now());
		if (activeCount >= maxActiveTokens) {
			// Revoke oldest tokens
			revokeAllUserTokens(user.getId(), ipAddress);
		}

		var token = jwtService.generateRefreshToken(user);
		var expiresAt = Instant.now().plusMillis(refreshTokenExpirationMillis);

		var refreshToken = RefreshToken.builder()
			.user(user)
			.token(token)
			.expiresAt(expiresAt)
			.revoked(false)
			.createdAt(Instant.now())
			.createdByIp(ipAddress)
			.build();

		return refreshTokenRepository.save(refreshToken);
	}

	/**
	 * Find refresh token by token string
	 */
	public RefreshToken findByToken(String token) {
		return refreshTokenRepository.findByToken(token)
			.orElseThrow(() -> new RuntimeException("Refresh token not found"));
	}

	/**
	 * Verify refresh token is valid and active
	 */
	public RefreshToken verifyRefreshToken(String token) {
		var refreshToken = findByToken(token);

		if (refreshToken.isExpired()) {
			throw new RuntimeException("Refresh token has expired");
		}

		if (refreshToken.getRevoked()) {
			throw new RuntimeException("Refresh token has been revoked");
		}

		return refreshToken;
	}

	/**
	 * Rotate refresh token: invalidate old one and create new one
	 */
	@Transactional
	public RefreshToken rotateRefreshToken(String oldToken, String ipAddress) {
		var oldRefreshToken = verifyRefreshToken(oldToken);
		
		// Revoke old token
		revokeToken(oldRefreshToken, ipAddress);

		// Create new token
		return createRefreshToken(oldRefreshToken.getUser(), ipAddress);
	}

	/**
	 * Revoke a specific token
	 */
	@Transactional
	public void revokeToken(RefreshToken token, String ipAddress) {
		token.setRevoked(true);
		token.setRevokedAt(Instant.now());
		token.setRevokedByIp(ipAddress);
		refreshTokenRepository.save(token);
	}

	/**
	 * Revoke all tokens for a user (logout from all devices)
	 */
	@Transactional
	public void revokeAllUserTokens(UUID userId, String ipAddress) {
		var tokens = refreshTokenRepository.findAll().stream()
			.filter(t -> t.getUser().getId().equals(userId) && !t.getRevoked())
			.toList();

		for (var token : tokens) {
			revokeToken(token, ipAddress);
		}
	}

	/**
	 * Delete expired tokens (cleanup job)
	 */
	@Transactional
	public void deleteExpiredTokens() {
		refreshTokenRepository.deleteExpiredTokens(Instant.now());
	}
}

