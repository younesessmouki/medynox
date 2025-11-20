package com.wiyzdev.medynox.services;

import java.util.UUID;

import org.springframework.lang.NonNull;

import com.wiyzdev.medynox.models.User;

public interface UserService {

	@NonNull
	User findById(@NonNull UUID id);

	@NonNull
	User findByEmail(@NonNull String email);

	@NonNull
	User save(@NonNull User user);

	boolean existsByEmail(@NonNull String email);

	void delete(@NonNull UUID id);

}
