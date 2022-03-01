package com.talenty.email;


import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Component
public class EmailSender {

    //    @Value("REACT_APP_BACKEND_URL")
    private static final String BACKEND_URL = "https://api.talenty.duckdns.org";
    private static final String CONFIRM_TOKEN_PART = "/sign-in?token=%token%";
    private static final String RESET_PASSWORD_TOKEN_PART = "/forget-password?token=%token%";
    private static String CONFIRMATION_URL;
    private static String RESET_PASSWORD_URL;
    private final JavaMailSender emailSender;

    public EmailSender(final JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void sendConfirmation(final String to, final String token) {
        try {
            final MimeMessage message = emailSender.createMimeMessage();
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject("This is the Subject Line!");
            message.setContent("<html>\n" +
                    "    <head>\n" +
                    "    </head>\n" +
                    "    <body>\n" +
                    "    Just click on <a href=\"" + CONFIRMATION_URL.replace("%token%", token) + "\">confirm</a> to verify your account!\n" +
                    "    </body>\n" +
                    "</html>", "text/html");
            emailSender.send(message);
            System.out.println("Confirmation message to: " + to + " has been sent with token: " + token);
        } catch (final MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendResetPassword(final String to, final String token) {
        try {
            final MimeMessage message = emailSender.createMimeMessage();
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject("This is the Subject Line!");
            message.setContent("<html>\n" +
                    "    <head>\n" +
                    "    </head>\n" +
                    "    <body>\n" +
                    "    Just click on <a href=\"" + RESET_PASSWORD_URL.replace("%token%", token) + "\">reset</a> to change your password!\n" +
                    "    </body>\n" +
                    "</html>", "text/html");
            emailSender.send(message);
            System.out.println("Confirmation message to: " + to + " has been sent with token: " + token);
        } catch (final MessagingException e) {
            e.printStackTrace();
        }
    }

    @PostConstruct
    private void init() {
        CONFIRMATION_URL = (BACKEND_URL == null ? "http://localhost:7800" : BACKEND_URL) + CONFIRM_TOKEN_PART;
        RESET_PASSWORD_URL = (BACKEND_URL == null ? "http://localhost:7800" : BACKEND_URL) + RESET_PASSWORD_TOKEN_PART;
        System.out.println("BACKEND_URL: " + BACKEND_URL);
        System.out.println("EMAIL_CONFIRMATION_URL: " + CONFIRMATION_URL);
        System.out.println("EMAIL_PASSWORD_RESET_URL: " + RESET_PASSWORD_URL);
    }

}