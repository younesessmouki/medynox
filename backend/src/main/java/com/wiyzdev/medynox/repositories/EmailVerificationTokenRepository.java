package com.wiyzdev.medynox.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wiyzdev.medynox.models.EmailVerificationToken;
import com.wiyzdev.medynox.models.User;

public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, UUID> {

	Optional<EmailVerificationToken> findByToken(String token);

	Optional<EmailVerificationToken> findTopByUserAndUsedAtIsNullOrderByExpiresAtDesc(User user);
}

