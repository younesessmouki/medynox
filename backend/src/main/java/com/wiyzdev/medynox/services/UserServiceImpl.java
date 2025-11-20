package com.wiyzdev.medynox.services;

import java.util.UUID;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wiyzdev.medynox.models.User;
import com.wiyzdev.medynox.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	@Override
	@Transactional(readOnly = true)
	@NonNull
	@SuppressWarnings("null")
	public User findById(@NonNull UUID id) {
		return userRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("User not found with id: " + id));
	}

	@Override
	@Transactional(readOnly = true)
	@NonNull
	@SuppressWarnings("null")
	public User findByEmail(@NonNull String email) {
		if (email.isBlank()) {
			throw new IllegalArgumentException("Email cannot be empty");
		}
		return userRepository.findByEmailIgnoreCase(email)
			.orElseThrow(() -> new RuntimeException("User not found with email: " + email));
	}

	@Override
	@Transactional
	@NonNull
	public User save(@NonNull User user) {
		return userRepository.save(user);
	}

	@Override
	@Transactional(readOnly = true)
	public boolean existsByEmail(@NonNull String email) {
		if (email.isBlank()) {
			return false;
		}
		return userRepository.existsByEmailIgnoreCase(email);
	}

	@Override
	@Transactional
	public void delete(@NonNull UUID id) {
		if (!userRepository.existsById(id)) {
			throw new RuntimeException("User not found with id: " + id);
		}
		userRepository.deleteById(id);
	}

}
