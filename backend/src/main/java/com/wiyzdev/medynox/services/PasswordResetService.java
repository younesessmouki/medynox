package com.wiyzdev.medynox.services;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.wiyzdev.medynox.models.PasswordResetToken;
import com.wiyzdev.medynox.models.User;
import com.wiyzdev.medynox.repositories.PasswordResetTokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

	private static final Duration TOKEN_TTL = Duration.ofMinutes(30);

	private final PasswordResetTokenRepository repository;

	@Transactional
	public PasswordResetToken createToken(User user) {
		var token = PasswordResetToken.builder()
			.token(UUID.randomUUID().toString())
			.user(user)
			.expiresAt(Instant.now().plus(TOKEN_TTL))
			.build();
		@SuppressWarnings("null")
		var saved = repository.save(token);
		return saved;
	}

	@Transactional
	public PasswordResetToken regenerateToken(User user) {
		repository.findTopByUserAndUsedAtIsNullOrderByExpiresAtDesc(user)
			.ifPresent(existing -> {
				existing.setUsedAt(Instant.now());
				repository.save(existing);
			});
		return createToken(user);
	}

	@Transactional(readOnly = true)
	public PasswordResetToken validateToken(String tokenValue) {
		var token = repository.findByToken(tokenValue)
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token de réinitialisation invalide"));

		if (token.getUsedAt() != null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ce token a déjà été utilisé.");
		}

		if (token.getExpiresAt().isBefore(Instant.now())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ce token a expiré.");
		}

		return token;
	}

	@Transactional
	public void markTokenAsUsed(PasswordResetToken token) {
		token.setUsedAt(Instant.now());
		repository.save(token);
	}
}

