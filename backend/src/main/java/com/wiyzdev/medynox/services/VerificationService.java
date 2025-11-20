package com.wiyzdev.medynox.services;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.wiyzdev.medynox.models.EmailVerificationToken;
import com.wiyzdev.medynox.models.User;
import com.wiyzdev.medynox.repositories.EmailVerificationTokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VerificationService {

	private static final Duration TOKEN_TTL = Duration.ofMinutes(15);

	private final EmailVerificationTokenRepository repository;

	@Transactional
	public EmailVerificationToken createToken(User user) {
		var token = EmailVerificationToken.builder()
			.token(UUID.randomUUID().toString())
			.user(user)
			.expiresAt(Instant.now().plus(TOKEN_TTL))
			.build();
		@SuppressWarnings("null")
		var saved = repository.save(token);
		return saved;
	}

	@Transactional
	public EmailVerificationToken regenerateToken(User user) {
		repository.findTopByUserAndUsedAtIsNullOrderByExpiresAtDesc(user)
			.ifPresent(existing -> {
				existing.setUsedAt(Instant.now());
				repository.save(existing);
			});
		return createToken(user);
	}

	@Transactional(readOnly = true)
	public EmailVerificationToken validateToken(String tokenValue) {
		var token = repository.findByToken(tokenValue)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token de vérification invalide"));

		if (token.getUsedAt() != null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ce token a déjà été utilisé.");
		}

		if (token.getExpiresAt().isBefore(Instant.now())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ce token a expiré.");
		}

		return token;
	}

	@Transactional
	public void markTokenAsUsed(EmailVerificationToken token) {
		token.setUsedAt(Instant.now());
		repository.save(token);
	}
}

