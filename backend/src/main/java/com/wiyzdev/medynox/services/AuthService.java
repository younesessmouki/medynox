package com.wiyzdev.medynox.services;

import com.wiyzdev.medynox.dto.AuthResponse;
import com.wiyzdev.medynox.dto.ForgotPasswordRequest;
import com.wiyzdev.medynox.dto.LoginRequest;
import com.wiyzdev.medynox.dto.RegisterRequest;
import com.wiyzdev.medynox.dto.RegisterDoctorRequest;
import com.wiyzdev.medynox.dto.ResetPasswordRequest;

import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {

	AuthResponse register(RegisterRequest request, HttpServletRequest httpRequest);

	AuthResponse registerDoctor(RegisterDoctorRequest request, HttpServletRequest httpRequest);

	AuthResponse login(LoginRequest request, HttpServletRequest httpRequest);

	AuthResponse refreshToken(String refreshToken, HttpServletRequest httpRequest);

	void logout(String email, HttpServletRequest httpRequest);

	void logoutAll(String email, HttpServletRequest httpRequest);

	String verifyEmail(String token);

	String resendVerification(String email);

	AuthResponse createStaffAccount(RegisterRequest request, String doctorEmail);

	String forgotPassword(ForgotPasswordRequest request);

	String resetPassword(ResetPasswordRequest request);
}

