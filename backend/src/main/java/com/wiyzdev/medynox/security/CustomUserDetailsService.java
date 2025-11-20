package com.wiyzdev.medynox.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.wiyzdev.medynox.models.AccountStatus;
import com.wiyzdev.medynox.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) {
		return userRepository.findByEmailIgnoreCase(username)
			.map(user -> {
				var authorities = user.getRoles().stream()
					.map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
					.toList();
				var disabled = user.getAccountStatus() == AccountStatus.SUSPENDED;
				return User.withUsername(user.getEmail())
					.password(user.getPasswordHash())
					.authorities(authorities)
					.disabled(disabled)
					.accountLocked(false)
					.accountExpired(false)
					.credentialsExpired(false)
					.build();
			})
			.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
	}
}

