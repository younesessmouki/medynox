package com.wiyzdev.medynox.dto;

import lombok.Builder;

@Builder
public record LoginRequest(
	String email,
	String password
) {
}

