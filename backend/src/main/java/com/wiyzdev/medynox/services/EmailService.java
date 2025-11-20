package com.wiyzdev.medynox.services;

import java.util.Objects;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

	private final JavaMailSender mailSender;

	@Value("${spring.mail.username}")
	private String fromAddress;

	public void sendVerificationEmail(String to, String fullName, String token) {
		var verificationLink = "http://localhost:3000/verify-email?token=" + token;
		var subject = "Activation de votre compte MEDYNOX";
		var html = buildTemplate(fullName, verificationLink);
		sendHtmlMail(to, subject, html);
	}

	public void sendPasswordResetEmail(String to, String fullName, String token) {
		var resetLink = "http://localhost:3000/reset-password?token=" + token;
		var subject = "Réinitialisation de votre mot de passe MEDYNOX";
		var html = buildPasswordResetTemplate(fullName, resetLink);
		sendHtmlMail(to, subject, html);
	}

	@SuppressWarnings("null")
	private void sendHtmlMail(String to, String subject, String body) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			var helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, "UTF-8");
			var sender = Objects.requireNonNullElse(fromAddress, "no-reply@medynox.com");
			var recipient = Objects.requireNonNull(to, "Recipient email is required");
			var safeSubject = Objects.requireNonNull(subject, "Subject is required");
			var safeBody = Objects.requireNonNull(body, "Body is required");
			helper.setFrom(sender);
			helper.setTo(recipient);
			helper.setSubject(safeSubject);
			helper.setText(safeBody, true);
			mailSender.send(message);
		}
		catch (MessagingException ex) {
			throw new IllegalStateException("Impossible d'envoyer l'email", ex);
		}
	}

	private String buildTemplate(String fullName, String link) {
		return """
			<!DOCTYPE html>
			<html lang="fr">
			<head>
				<meta charset="UTF-8">
				<title>Activation de votre compte MEDYNOX</title>
			</head>
			<body style="font-family: Arial, sans-serif; background-color: #f6f7fb; padding: 24px;">
				<table width="100%%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; padding: 32px;">
					<tr>
						<td>
							<h2 style="color:#0f172a;">Bonjour %s,</h2>
							<p style="color:#475569;">Merci d'avoir rejoint MEDYNOX. Cliquez sur le bouton ci-dessous pour activer votre compte.</p>
							<p style="text-align:center; margin: 32px 0;">
								<a href="%s" style="background-color:#0ea5e9;color:#ffffff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;">Activer mon compte</a>
							</p>
							<p style="color:#94a3b8; font-size: 14px;">Ce lien expirera dans 15 minutes.</p>
							<p style="color:#475569;">À très vite,<br>L'équipe MEDYNOX</p>
						</td>
					</tr>
				</table>
			</body>
			</html>
			""".formatted(fullName, link);
	}

	private String buildPasswordResetTemplate(String fullName, String link) {
		return """
			<!DOCTYPE html>
			<html lang="fr">
			<head>
				<meta charset="UTF-8">
				<title>Réinitialisation de votre mot de passe MEDYNOX</title>
			</head>
			<body style="font-family: Arial, sans-serif; background-color: #f6f7fb; padding: 24px;">
				<table width="100%%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; padding: 32px;">
					<tr>
						<td>
							<h2 style="color:#0f172a;">Bonjour %s,</h2>
							<p style="color:#475569;">Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.</p>
							<p style="text-align:center; margin: 32px 0;">
								<a href="%s" style="background-color:#0ea5e9;color:#ffffff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:600;">Réinitialiser mon mot de passe</a>
							</p>
							<p style="color:#94a3b8; font-size: 14px;">Ce lien expirera dans 30 minutes.</p>
							<p style="color:#475569;">Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.<br><br>À très vite,<br>L'équipe MEDYNOX</p>
						</td>
					</tr>
				</table>
			</body>
			</html>
			""".formatted(fullName, link);
	}
}

