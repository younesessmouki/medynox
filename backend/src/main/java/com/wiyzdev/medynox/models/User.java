package com.wiyzdev.medynox.models;

import java.time.Instant;
import java.time.LocalDate;
import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@GeneratedValue
	@Column(nullable = false, updatable = false, columnDefinition = "uuid")
	private UUID id;

	// Personal Information
	@Column(name = "first_name", nullable = false, length = 100)
	private String firstName;

	@Column(name = "last_name", nullable = false, length = 100)
	private String lastName;

	@Column(nullable = false, unique = true, length = 150)
	private String email;

	@Column(length = 30)
	private String phone;

	@Column(name = "password_hash", nullable = false)
	private String passwordHash;

	@Column(name = "birth_date")
	private LocalDate birthDate;

	@Column(length = 20)
	private String gender;

	// Professional Information
	@Column(name = "main_specialty", length = 100)
	private String mainSpecialty;

	@Column(name = "secondary_specialties", columnDefinition = "TEXT")
	private String secondarySpecialties; // JSON array as string

	@Column(name = "order_number", length = 100)
	private String orderNumber;

	@Column(name = "experience_years")
	private Integer experienceYears;

	@Column(columnDefinition = "TEXT")
	private String bio;

	// Cabinet Information
	@Column(name = "cabinet_name", length = 150)
	private String cabinetName;

	@Column(columnDefinition = "TEXT")
	private String address;

	@Column(length = 100)
	private String city;

	@Column(name = "postal_code", length = 20)
	private String postalCode;

	@Column(name = "cabinet_phone", length = 30)
	private String cabinetPhone;

	@Column(name = "establishment_type", length = 100)
	private String establishmentType;

	@Column(name = "cabinet_logo", length = 255)
	private String cabinetLogo; // File path or URL

	// Administrative Information
	@Column(name = "ice", length = 50)
	private String ice;

	@Column(name = "ifiscal", length = 50)
	private String ifiscal;

	@Column(name = "cnss", length = 50)
	private String cnss;

	@Column(name = "rib", length = 50)
	private String rib;

	// Preferences
	@Column(name = "language", length = 20)
	@Builder.Default
	private String language = "fr";

	@Column(name = "timezone", length = 50)
	@Builder.Default
	private String timezone = "Africa/Casablanca";

	@Column(name = "notifications_email")
	@Builder.Default
	private Boolean notificationsEmail = true;

	@Column(name = "notifications_sms")
	@Builder.Default
	private Boolean notificationsSms = false;

	@Column(name = "notifications_whatsapp")
	@Builder.Default
	private Boolean notificationsWhatsapp = false;

	// Account Status
	@Builder.Default
	@ElementCollection(fetch = FetchType.EAGER)
	@Enumerated(EnumType.STRING)
	@CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
	@Column(name = "role", nullable = false)
	private Set<Role> roles = EnumSet.of(Role.DOCTOR);

	@Builder.Default
	@Enumerated(EnumType.STRING)
	@Column(name = "account_status", nullable = false)
	private AccountStatus accountStatus = AccountStatus.PENDING;

	@Builder.Default
	@Column(name = "is_email_verified", nullable = false)
	private boolean emailVerified = false;

	@Column(name = "enabled")
	@Builder.Default
	private Boolean enabled = false;

	@Column(name = "created_at", nullable = false, updatable = false)
	private Instant createdAt;

	@Column(name = "updated_at", nullable = false)
	private Instant updatedAt;

	// Convenience methods
	public String getFullName() {
		return (firstName != null ? firstName : "") + " " + (lastName != null ? lastName : "");
	}

	public void setFullName(String fullName) {
		// Parse fullName into firstName and lastName
		if (fullName != null && !fullName.trim().isEmpty()) {
			String[] parts = fullName.trim().split("\\s+", 2);
			this.firstName = parts[0];
			this.lastName = parts.length > 1 ? parts[1] : "";
		}
	}

	@PrePersist
	void onCreate() {
		var now = Instant.now();
		if (this.createdAt == null) {
		this.createdAt = now;
		}
		this.updatedAt = now;
		if (this.enabled == null) {
			this.enabled = false;
		}
	}

	@PreUpdate
	void onUpdate() {
		this.updatedAt = Instant.now();
	}
}
