package com.wiyzdev.medynox.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO for refresh token request
 */
public record RefreshTokenRequest(
	@NotBlank(message = "Le token de rafraîchissement est requis")
	String refreshToken
) {
}

