package com.wiyzdev.medynox.security;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.JwtException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final CustomUserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(
		@NonNull HttpServletRequest request,
		@NonNull HttpServletResponse response,
		@NonNull FilterChain filterChain
	) throws ServletException, IOException {
		String token = null;
		
		// Try to get token from Authorization header first
		var authorizationHeader = request.getHeader("Authorization");
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			token = authorizationHeader.substring(7);
		}
		
		// If no token in header, try to get from cookie (HTTP Only cookie)
		if (token == null) {
			var cookies = request.getCookies();
			if (cookies != null) {
				for (var cookie : cookies) {
					// Check for access_token cookie (new) or jwt cookie (legacy)
					if ("access_token".equals(cookie.getName()) || "jwt".equals(cookie.getName())) {
						token = cookie.getValue();
						break;
					}
				}
			}
		}

		// If no token found, continue without authentication
		if (token == null) {
			filterChain.doFilter(request, response);
			return;
		}

		String username;
		try {
			username = jwtService.extractUsername(token);
		}
		catch (JwtException | IllegalArgumentException ex) {
			filterChain.doFilter(request, response);
			return;
		}

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);

			if (jwtService.isTokenValid(token, userDetails)) {
				var authentication = new UsernamePasswordAuthenticationToken(
					userDetails,
					null,
					userDetails.getAuthorities()
				);
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}

		filterChain.doFilter(request, response);
	}

	@Override
	protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
		// Skip OPTIONS requests (CORS preflight)
		if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
			return true;
		}
		// Skip auth endpoints
		var path = request.getServletPath();
		return path.startsWith("/api/auth/");
	}
}

