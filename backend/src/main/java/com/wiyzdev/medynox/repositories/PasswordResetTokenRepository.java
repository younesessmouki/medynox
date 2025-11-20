package com.wiyzdev.medynox.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wiyzdev.medynox.models.PasswordResetToken;
import com.wiyzdev.medynox.models.User;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, java.util.UUID> {

	Optional<PasswordResetToken> findByToken(String token);

	Optional<PasswordResetToken> findTopByUserAndUsedAtIsNullOrderByExpiresAtDesc(User user);
}

