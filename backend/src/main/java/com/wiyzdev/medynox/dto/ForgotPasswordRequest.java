package com.wiyzdev.medynox.dto;

import lombok.Builder;

@Builder
public record ForgotPasswordRequest(
	String email
) {
}

