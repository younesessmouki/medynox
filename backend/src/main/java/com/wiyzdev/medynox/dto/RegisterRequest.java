package com.wiyzdev.medynox.dto;

import com.wiyzdev.medynox.models.Role;

import lombok.Builder;

@Builder
public record RegisterRequest(
	String fullName,
	String email,
	String password,
	String telephone,
	Role role
) {
}

