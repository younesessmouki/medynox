package com.wiyzdev.medynox.services;

import java.time.Instant;
import java.time.LocalDate;
import java.util.EnumSet;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wiyzdev.medynox.dto.AuthResponse;
import com.wiyzdev.medynox.dto.ForgotPasswordRequest;
import com.wiyzdev.medynox.dto.LoginRequest;
import com.wiyzdev.medynox.dto.RegisterDoctorRequest;
import com.wiyzdev.medynox.dto.RegisterRequest;
import com.wiyzdev.medynox.dto.ResetPasswordRequest;
import com.wiyzdev.medynox.models.AccountStatus;
import com.wiyzdev.medynox.models.Role;
import com.wiyzdev.medynox.models.User;
import com.wiyzdev.medynox.repositories.UserRepository;
import com.wiyzdev.medynox.security.CustomUserDetailsService;
import com.wiyzdev.medynox.security.JwtService;
import com.wiyzdev.medynox.security.RefreshTokenService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
	private final VerificationService verificationService;
	private final PasswordResetService passwordResetService;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final CustomUserDetailsService userDetailsService;
	private final EmailService emailService;
	private final ObjectMapper objectMapper;
	private final RefreshTokenService refreshTokenService;
	private final AuditService auditService;

	@Override
	@Transactional
	public AuthResponse registerDoctor(RegisterDoctorRequest request, HttpServletRequest httpRequest) {
		if (userRepository.existsByEmailIgnoreCase(request.email())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Un compte existe déjà avec cet email.");
		}

		// Validate password match
		if (!request.password().equals(request.confirmPassword())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Les mots de passe ne correspondent pas.");
		}

		// Parse birth date
		LocalDate birthDate = null;
		if (request.birthDate() != null && !request.birthDate().isEmpty()) {
			try {
				birthDate = LocalDate.parse(request.birthDate());
			} catch (Exception e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Format de date invalide.");
			}
		}

		// Serialize secondary specialties to JSON
		String secondarySpecialtiesJson = null;
		if (request.secondarySpecialties() != null && !request.secondarySpecialties().isEmpty()) {
			try {
				secondarySpecialtiesJson = objectMapper.writeValueAsString(request.secondarySpecialties());
			} catch (JsonProcessingException e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erreur lors de la sérialisation des spécialités.");
			}
		}

		// Map notifications
		Map<String, Boolean> notifications = request.notifications();
		boolean notificationsEmail = true; // Default value
		boolean notificationsSms = false; // Default value
		boolean notificationsWhatsapp = false; // Default value
		
		if (notifications != null) {
			Boolean emailValue = notifications.get("email");
			Boolean smsValue = notifications.get("sms");
			Boolean whatsappValue = notifications.get("whatsapp");
			
			if (emailValue != null) {
				notificationsEmail = emailValue;
			}
			if (smsValue != null) {
				notificationsSms = smsValue;
			}
			if (whatsappValue != null) {
				notificationsWhatsapp = whatsappValue;
			}
		}

		var user = User.builder()
			.firstName(request.firstName())
			.lastName(request.lastName())
			.email(request.email())
			.phone(request.phone())
			.passwordHash(passwordEncoder.encode(request.password()))
			.birthDate(birthDate)
			.gender(request.gender())
			.mainSpecialty(request.mainSpecialty())
			.secondarySpecialties(secondarySpecialtiesJson)
			.orderNumber(request.orderNumber())
			.experienceYears(request.experienceYears())
			.bio(request.bio())
			.cabinetName(request.cabinetName())
			.address(request.address())
			.city(request.city())
			.postalCode(request.postalCode())
			.cabinetPhone(request.cabinetPhone())
			.establishmentType(request.establishmentType())
			.cabinetLogo(request.cabinetLogo()) // TODO: Handle file upload
			.ice(request.ice())
			.ifiscal(request.ifiscal())
			.cnss(request.cnss())
			.rib(request.rib())
			.language(request.language() != null ? request.language() : "fr")
			.timezone(request.timezone() != null ? request.timezone() : "Africa/Casablanca")
			.notificationsEmail(notificationsEmail)
			.notificationsSms(notificationsSms)
			.notificationsWhatsapp(notificationsWhatsapp)
			.roles(EnumSet.of(Role.DOCTOR))
			.accountStatus(AccountStatus.PENDING)
			.emailVerified(false)
			.enabled(false)
			.build();

		@SuppressWarnings("null")
		var savedUser = userRepository.save(user);
		var token = verificationService.createToken(savedUser);
		emailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getFullName(), token.getToken());

		// Audit log
		auditService.log("USER_REGISTERED", savedUser, Map.of("email", savedUser.getEmail()), httpRequest);

		return AuthResponse.builder()
			.fullName(savedUser.getFullName())
			.email(savedUser.getEmail())
			.message("Inscription réussie. Veuillez vérifier votre email pour activer votre compte.")
			.build();
	}

	@Override
	@Transactional
	public AuthResponse login(LoginRequest request, HttpServletRequest httpRequest) {
		var user = userRepository.findByEmailIgnoreCase(request.email())
			.orElseThrow(() -> new BadCredentialsException("Identifiants invalides"));

		if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
			auditService.log("LOGIN_FAILED", user, Map.of("reason", "invalid_password"), httpRequest);
			throw new BadCredentialsException("Identifiants invalides");
		}

		if (!user.isEmailVerified()) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Email non vérifié");
		}

		if (user.getAccountStatus() == AccountStatus.SUSPENDED) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Compte suspendu");
		}

		var userDetails = userDetailsService.loadUserByUsername(user.getEmail());
		var accessToken = jwtService.generateAccessToken(userDetails);
		var refreshToken = refreshTokenService.createRefreshToken(user, extractIpAddress(httpRequest));

		// Audit log
		auditService.log("LOGIN_SUCCESS", user, Map.of(), httpRequest);

		return AuthResponse.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken.getToken())
			.tokenType("Bearer")
			.fullName(user.getFullName())
			.email(user.getEmail())
			.message("Connexion réussie")
			.build();
	}

	@Override
	@Transactional
	public AuthResponse refreshToken(String refreshToken, HttpServletRequest httpRequest) {
		var token = refreshTokenService.verifyRefreshToken(refreshToken);
		var user = token.getUser();

		// Rotate refresh token
		var newRefreshToken = refreshTokenService.rotateRefreshToken(refreshToken, extractIpAddress(httpRequest));

		// Generate new access token
		var userDetails = userDetailsService.loadUserByUsername(user.getEmail());
		var accessToken = jwtService.generateAccessToken(userDetails);

		return AuthResponse.builder()
			.accessToken(accessToken)
			.refreshToken(newRefreshToken.getToken())
			.tokenType("Bearer")
			.fullName(user.getFullName())
			.email(user.getEmail())
			.message("Token rafraîchi")
			.build();
	}

	@Override
	@Transactional
	public void logout(String email, HttpServletRequest httpRequest) {
		var user = userRepository.findByEmailIgnoreCase(email)
			.orElse(null);

		if (user != null) {
			// Get refresh token from cookie if available
			var cookies = httpRequest.getCookies();
			if (cookies != null) {
				for (var cookie : cookies) {
					if ("refresh_token".equals(cookie.getName())) {
						try {
							var refreshToken = refreshTokenService.findByToken(cookie.getValue());
							refreshTokenService.revokeToken(refreshToken, extractIpAddress(httpRequest));
						} catch (Exception e) {
							// Token not found or invalid, continue
						}
						break;
					}
				}
			}

			auditService.log("LOGOUT", user, Map.of(), httpRequest);
		}
	}

	@Override
	@Transactional
	public void logoutAll(String email, HttpServletRequest httpRequest) {
		var user = userRepository.findByEmailIgnoreCase(email)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

		refreshTokenService.revokeAllUserTokens(user.getId(), extractIpAddress(httpRequest));
		auditService.log("LOGOUT_ALL", user, Map.of(), httpRequest);
	}

	/**
	 * Extract IP address from request
	 */
	private String extractIpAddress(HttpServletRequest request) {
		if (request == null) {
			return null;
		}

		var xForwardedFor = request.getHeader("X-Forwarded-For");
		if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
			return xForwardedFor.split(",")[0].trim();
		}

		var xRealIp = request.getHeader("X-Real-IP");
		if (xRealIp != null && !xRealIp.isEmpty()) {
			return xRealIp;
		}

		return request.getRemoteAddr();
	}

	@Override
	@Transactional
	public String verifyEmail(String token) {
		var verificationToken = verificationService.validateToken(token);
		var user = verificationToken.getUser();
		user.setEmailVerified(true);
		user.setAccountStatus(AccountStatus.ACTIVE);
		user.setUpdatedAt(Instant.now());

		verificationService.markTokenAsUsed(verificationToken);
		userRepository.save(user);

		return "Votre adresse email a été vérifiée avec succès.";
	}

	@Override
	@Transactional
	public String resendVerification(String email) {
		var user = userRepository.findByEmailIgnoreCase(email)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

		if (user.isEmailVerified()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le compte est déjà vérifié.");
		}

		var token = verificationService.regenerateToken(user);
		emailService.sendVerificationEmail(user.getEmail(), user.getFullName(), token.getToken());

		return "Un nouvel email de vérification vient d'être envoyé.";
	}

	@Override
	@Transactional
	public AuthResponse register(RegisterRequest request, HttpServletRequest httpRequest) {
		var targetRole = request.role() == null ? Role.DOCTOR : request.role();
		if (targetRole != Role.DOCTOR) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only doctors can self-register.");
		}
		var user = createUser(request, EnumSet.of(Role.DOCTOR));
		var token = verificationService.createToken(user);
		emailService.sendVerificationEmail(user.getEmail(), user.getFullName(), token.getToken());
		
		// Audit log
		auditService.log("USER_REGISTERED", user, Map.of("email", user.getEmail()), httpRequest);
		
		return AuthResponse.builder()
			.fullName(user.getFullName())
			.email(user.getEmail())
			.message("Inscription réussie. Veuillez vérifier votre email pour activer votre compte.")
			.build();
	}

	@Override
	@Transactional
	public AuthResponse createStaffAccount(RegisterRequest request, String doctorEmail) {
		var doctor = userRepository.findByEmailIgnoreCase(doctorEmail)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Médecin introuvable"));

		if (!doctor.getRoles().contains(Role.DOCTOR)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Seuls les médecins peuvent créer du personnel.");
		}

		if (!doctor.isEmailVerified() || doctor.getAccountStatus() != AccountStatus.ACTIVE) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Le compte médecin doit être actif et vérifié.");
		}

		var role = request.role();
		if (role == null || role == Role.DOCTOR) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le rôle doit être SECRETARY ou ASSISTANT.");
		}

		var user = createUser(request, EnumSet.of(role));
		var token = verificationService.createToken(user);
		emailService.sendVerificationEmail(user.getEmail(), user.getFullName(), token.getToken());

		return AuthResponse.builder()
			.fullName(user.getFullName())
			.email(user.getEmail())
			.message("Compte personnel créé. Un email de vérification a été envoyé.")
			.build();
	}

	@Override
	@Transactional
	public String forgotPassword(ForgotPasswordRequest request) {
		var user = userRepository.findByEmailIgnoreCase(request.email())
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun compte trouvé avec cet email."));

		var token = passwordResetService.createToken(user);
		emailService.sendPasswordResetEmail(user.getEmail(), user.getFullName(), token.getToken());

		return "Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.";
	}

	@Override
	@Transactional
	public String resetPassword(ResetPasswordRequest request) {
		// Validate password match
		if (!request.newPassword().equals(request.confirmPassword())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Les mots de passe ne correspondent pas.");
		}

		var resetToken = passwordResetService.validateToken(request.token());
		var user = resetToken.getUser();

		user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
		user.setUpdatedAt(Instant.now());
		userRepository.save(user);

		passwordResetService.markTokenAsUsed(resetToken);

		return "Votre mot de passe a été réinitialisé avec succès.";
	}

	private User createUser(RegisterRequest request, EnumSet<Role> roles) {
		if (userRepository.existsByEmailIgnoreCase(request.email())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Un compte existe déjà avec cet email.");
		}

		// Split fullName into firstName and lastName
		String firstName = "";
		String lastName = "";
		if (request.fullName() != null && !request.fullName().trim().isEmpty()) {
			String[] parts = request.fullName().trim().split("\\s+", 2);
			firstName = parts[0];
			lastName = parts.length > 1 ? parts[1] : "";
		}

		@SuppressWarnings("null")
		var user = userRepository.save(User.builder()
			.firstName(firstName)
			.lastName(lastName)
			.email(request.email())
			.phone(request.telephone())
			.passwordHash(passwordEncoder.encode(request.password()))
			.roles(EnumSet.copyOf(roles))
			.accountStatus(AccountStatus.PENDING)
			.emailVerified(false)
			.enabled(false)
			.build());
		return user;
	}
}

