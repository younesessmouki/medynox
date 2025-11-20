package com.wiyzdev.medynox.dto;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record RegisterDoctorRequest(
	// Personal Information
	@JsonProperty("firstName") String firstName,
	@JsonProperty("lastName") String lastName,
	@JsonProperty("email") String email,
	@JsonProperty("phone") String phone,
	@JsonProperty("password") String password,
	@JsonProperty("confirmPassword") String confirmPassword,
	@JsonProperty("birthDate") String birthDate,
	@JsonProperty("gender") String gender,

	// Professional Information
	@JsonProperty("mainSpecialty") String mainSpecialty,
	@JsonProperty("secondarySpecialties") List<String> secondarySpecialties,
	@JsonProperty("orderNumber") String orderNumber,
	@JsonProperty("experienceYears") Integer experienceYears,
	@JsonProperty("bio") String bio,

	// Cabinet Information
	@JsonProperty("cabinetName") String cabinetName,
	@JsonProperty("address") String address,
	@JsonProperty("city") String city,
	@JsonProperty("postalCode") String postalCode,
	@JsonProperty("cabinetPhone") String cabinetPhone,
	@JsonProperty("establishmentType") String establishmentType,
	@JsonProperty("cabinetLogo") String cabinetLogo,

	// Administrative Information
	@JsonProperty("ice") String ice,
	@JsonProperty("if") String ifiscal, // "if" is a reserved keyword in Java, mapped to "ifiscal"
	@JsonProperty("cnss") String cnss,
	@JsonProperty("rib") String rib,

	// Preferences
	@JsonProperty("language") String language,
	@JsonProperty("timezone") String timezone,
	@JsonProperty("notifications") Map<String, Boolean> notifications
) {
}

