package com.wiyzdev.medynox.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wiyzdev.medynox.dto.AuthResponse;
import com.wiyzdev.medynox.dto.ForgotPasswordRequest;
import com.wiyzdev.medynox.dto.LoginRequest;
import com.wiyzdev.medynox.dto.RefreshTokenRequest;
import com.wiyzdev.medynox.dto.RegisterDoctorRequest;
import com.wiyzdev.medynox.dto.RegisterRequest;
import com.wiyzdev.medynox.dto.ResetPasswordRequest;
import com.wiyzdev.medynox.services.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@Value("${jwt.cookie.secure:false}")
	private boolean cookieSecure;

	@PostMapping("/register")
	public ResponseEntity<AuthResponse> register(
		@Valid @RequestBody RegisterDoctorRequest request,
		HttpServletRequest httpRequest
	) {
		return ResponseEntity.ok(authService.registerDoctor(request, httpRequest));
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(
		@Valid @RequestBody LoginRequest request,
		HttpServletRequest httpRequest,
		HttpServletResponse response
	) {
		var authResponse = authService.login(request, httpRequest);
		
		// Set access token in HTTP Only cookie
		if (authResponse.getAccessToken() != null) {
			var accessTokenCookie = createAccessTokenCookie(authResponse.getAccessToken()).build();
			var refreshTokenCookie = createRefreshTokenCookie(authResponse.getRefreshToken()).build();
			
			return ResponseEntity.ok()
				.header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString(), refreshTokenCookie.toString())
				.body(authResponse);
		}
		
		return ResponseEntity.ok(authResponse);
	}

	@PostMapping("/refresh")
	public ResponseEntity<AuthResponse> refreshToken(
		HttpServletRequest httpRequest,
		HttpServletResponse response
	) {
		// Get refresh token from cookie
		String refreshToken = null;
		var cookies = httpRequest.getCookies();
		if (cookies != null) {
			for (var cookie : cookies) {
				if ("refresh_token".equals(cookie.getName())) {
					refreshToken = cookie.getValue();
					break;
				}
			}
		}

		if (refreshToken == null || refreshToken.isEmpty()) {
			return ResponseEntity.status(401).body(
				AuthResponse.builder()
					.message("Refresh token manquant")
					.build()
			);
		}

		var authResponse = authService.refreshToken(refreshToken, httpRequest);
		
		if (authResponse.getAccessToken() != null) {
			var accessTokenCookie = createAccessTokenCookie(authResponse.getAccessToken()).build();
			var refreshTokenCookie = createRefreshTokenCookie(authResponse.getRefreshToken()).build();
			
			return ResponseEntity.ok()
				.header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString(), refreshTokenCookie.toString())
				.body(authResponse);
		}
		
		return ResponseEntity.ok(authResponse);
	}

	@PostMapping("/verify-email")
	public ResponseEntity<String> verifyEmail(@RequestParam String token) {
		return ResponseEntity.ok(authService.verifyEmail(token));
	}

	@PostMapping("/request-verification-email")
	public ResponseEntity<String> requestVerificationEmail(@RequestBody ForgotPasswordRequest request) {
		return ResponseEntity.ok(authService.resendVerification(request.email()));
	}

	@PostMapping("/resend")
	public ResponseEntity<String> resend(@RequestParam String email) {
		return ResponseEntity.ok(authService.resendVerification(email));
	}

	@PostMapping("/staff")
	@PreAuthorize("hasRole('DOCTOR')")
	public ResponseEntity<AuthResponse> createStaff(@RequestBody RegisterRequest request, Authentication authentication) {
		return ResponseEntity.ok(authService.createStaffAccount(request, authentication.getName()));
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
		return ResponseEntity.ok(authService.forgotPassword(request));
	}

	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
		return ResponseEntity.ok(authService.resetPassword(request));
	}

	@GetMapping("/me")
	public ResponseEntity<?> getCurrentUser(Authentication authentication) {
		if (authentication == null || !authentication.isAuthenticated()) {
			return ResponseEntity.status(401).body("Non authentifié");
		}
		return ResponseEntity.ok(authentication.getPrincipal());
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout(
		Authentication authentication,
		HttpServletRequest httpRequest,
		HttpServletResponse response
	) {
		if (authentication != null && authentication.isAuthenticated()) {
			authService.logout(authentication.getName(), httpRequest);
		}
		
		// Clear both cookies
		var accessTokenCookie = createAccessTokenCookie("").maxAge(0).build();
		var refreshTokenCookie = createRefreshTokenCookie("").maxAge(0).build();
		
		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString(), refreshTokenCookie.toString())
			.body("Déconnexion réussie");
	}

	@PostMapping("/logout-all")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<String> logoutAll(
		Authentication authentication,
		HttpServletRequest httpRequest,
		HttpServletResponse response
	) {
		authService.logoutAll(authentication.getName(), httpRequest);
		
		// Clear both cookies
		var accessTokenCookie = createAccessTokenCookie("").maxAge(0).build();
		var refreshTokenCookie = createRefreshTokenCookie("").maxAge(0).build();
		
		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString(), refreshTokenCookie.toString())
			.body("Déconnexion de tous les appareils réussie");
	}

	/**
	 * Helper to create access token cookie
	 */
	private ResponseCookie.ResponseCookieBuilder createAccessTokenCookie(String token) {
		return ResponseCookie.from("access_token", token)
			.httpOnly(true)
			.secure(cookieSecure)
			.sameSite("Strict")
			.path("/")
			.maxAge(token.isEmpty() ? 0 : 15 * 60); // 15 minutes
	}

	/**
	 * Helper to create refresh token cookie
	 */
	private ResponseCookie.ResponseCookieBuilder createRefreshTokenCookie(String token) {
		return ResponseCookie.from("refresh_token", token)
			.httpOnly(true)
			.secure(cookieSecure)
			.sameSite("Strict")
			.path("/")
			.maxAge(token.isEmpty() ? 0 : 7 * 24 * 60 * 60); // 7 days
	}
}

