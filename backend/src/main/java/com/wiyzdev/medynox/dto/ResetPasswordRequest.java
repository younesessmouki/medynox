package com.wiyzdev.medynox.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public record ResetPasswordRequest(
	@JsonProperty("token") String token,
	@JsonProperty("newPassword") String newPassword,
	@JsonProperty("confirmPassword") String confirmPassword
) {
}

