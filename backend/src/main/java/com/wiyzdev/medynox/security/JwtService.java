package com.wiyzdev.medynox.security;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.wiyzdev.medynox.models.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/**
 * Service for JWT token generation and validation
 * Supports both access tokens (short-lived) and refresh tokens (long-lived)
 */
@Service
public class JwtService {

	private static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;

	private final Key signingKey;
	private final long accessTokenExpirationMillis;
	private final long refreshTokenExpirationMillis;

	public JwtService(
		@Value("${jwt.secret}") String secret,
		@Value("${jwt.access.expiration:900000}") long accessTokenExpirationMillis, // Default 15 minutes
		@Value("${jwt.refresh.expiration:604800000}") long refreshTokenExpirationMillis // Default 7 days
	) {
		this.signingKey = buildKey(secret);
		this.accessTokenExpirationMillis = accessTokenExpirationMillis;
		this.refreshTokenExpirationMillis = refreshTokenExpirationMillis;
	}

	/**
	 * Generate access token (short-lived, 15 minutes default)
	 */
	public String generateAccessToken(UserDetails userDetails) {
		return generateToken(userDetails, accessTokenExpirationMillis);
	}

	/**
	 * Generate refresh token (long-lived, 7 days default)
	 */
	public String generateRefreshToken(User user) {
		var now = Instant.now();
		var expiration = now.plusMillis(refreshTokenExpirationMillis);
		return Jwts.builder()
			.setSubject(user.getEmail())
			.claim("userId", user.getId().toString())
			.claim("type", "refresh")
			.setIssuedAt(Date.from(now))
			.setExpiration(Date.from(expiration))
			.signWith(signingKey, SIGNATURE_ALGORITHM)
			.compact();
	}

	/**
	 * Generate token with custom expiration
	 */
	private String generateToken(UserDetails userDetails, long expirationMillis) {
		var now = Instant.now();
		var expiration = now.plusMillis(expirationMillis);
		return Jwts.builder()
			.setSubject(userDetails.getUsername())
			.claim("type", "access")
			.setIssuedAt(Date.from(now))
			.setExpiration(Date.from(expiration))
			.signWith(signingKey, SIGNATURE_ALGORITHM)
			.compact();
	}

	/**
	 * Extract username (email) from token
	 */
	public String extractUsername(String token) {
		return extractAllClaims(token).getSubject();
	}

	/**
	 * Extract user ID from token (if present)
	 */
	public UUID extractUserId(String token) {
		var claims = extractAllClaims(token);
		var userIdStr = claims.get("userId", String.class);
		return userIdStr != null ? UUID.fromString(userIdStr) : null;
	}

	/**
	 * Check if token is valid for user
	 */
	public boolean isTokenValid(String token, UserDetails userDetails) {
		var username = extractUsername(token);
		return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}

	/**
	 * Check if token is expired
	 */
	public boolean isTokenExpired(String token) {
		return extractAllClaims(token)
			.getExpiration()
			.before(Date.from(Instant.now()));
	}

	/**
	 * Extract all claims from token
	 */
	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder()
			.setSigningKey(signingKey)
			.build()
			.parseClaimsJws(token)
			.getBody();
	}

	/**
	 * Build signing key from secret
	 */
	private static Key buildKey(String secret) {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
	}
}

