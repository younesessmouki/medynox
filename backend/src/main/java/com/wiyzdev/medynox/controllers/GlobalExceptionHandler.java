package com.wiyzdev.medynox.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResponseStatusException.class)
	public ResponseEntity<Map<String, String>> handleResponseStatusException(ResponseStatusException ex) {
		Map<String, String> error = new HashMap<>();
		String reason = ex.getReason() != null ? ex.getReason() : ex.getStatusCode().toString();
		error.put("error", reason);
		error.put("message", reason);
		return ResponseEntity.status(ex.getStatusCode()).body(error);
	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<Map<String, String>> handleBadCredentialsException(BadCredentialsException ex) {
		Map<String, String> error = new HashMap<>();
		error.put("error", "Identifiants invalides");
		error.put("message", ex.getMessage() != null ? ex.getMessage() : "Identifiants invalides");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
		Map<String, String> error = new HashMap<>();
		error.put("error", "Une erreur est survenue");
		error.put("message", ex.getMessage() != null ? ex.getMessage() : "Une erreur est survenue");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	}
}

