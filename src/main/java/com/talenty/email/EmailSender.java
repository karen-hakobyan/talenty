package com.talenty.email;


import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Component
public class EmailSender {

    private static final String CONFIRMATION_URL = "http://localhost:7800/confirm?token=%token%";
    private static final String RESET_PASSWORD_URL = "http://localhost:7800/reset/password?token=%token%";
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
            message.setContent("<html lang=\"en\">\n" +
                    "<head>\n" +
                    "    <title>A</title>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "\n" +
                    "<form action=\""+RESET_PASSWORD_URL.replace("%token%", token)+"\" method=\"post\" name=\"EmailForm\" enctype=\"application/x-www-form-urlencoded\">\n" +
                    "    New password:\n" +
                    "    <br>\n" +
                    "    <label>\n" +
                    "        <input type=\"password\" name=\"password\" id=\"password\" >\n" +
                    "    </label>\n" +
                    "    <br><br>\n" +
                    "    Confirm password:\n" +
                    "    <br>\n" +
                    "    <label>\n" +
                    "        <input type=\"password\" name=\"confirmPassword\" id=\"confirmPassword\">\n" +
                    "    </label>\n" +
                    "    <br><br>\n" +
                    "    <input type=\"submit\" value=\"Submit\">\n" +
                    "</form>\n" +
                    "\n" +
                    "</body>\n" +
                    "</html>", "text/html");
            emailSender.send(message);
            System.out.println("Confirmation message to: " + to + " has been sent with token: " + token);
        } catch (final MessagingException e) {
            e.printStackTrace();
        }
    }

}