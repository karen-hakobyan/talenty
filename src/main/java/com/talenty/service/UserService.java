package com.talenty.service;

import com.talenty.domain.dto.reset.ResetPasswordDetails;
import com.talenty.domain.dto.user.UserLoginRequestDetails;
import com.talenty.domain.dto.user.UserLoginResponseDetails;
import com.talenty.domain.mongo.TokenDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.email.EmailSender;
import com.talenty.exceptions.AccountIsAlreadyVerified;
import com.talenty.exceptions.AccountIsNotVerifiedException;
import com.talenty.exceptions.TokenNotFoundException;
import com.talenty.exceptions.UserNotFoundException;
import com.talenty.mapper.UserBuilder;
import com.talenty.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserBuilder userBuilder;
    private final TokenService tokenService;
    private final EmailSender emailSender;

    public UserService(final UserRepository userRepository, final PasswordEncoder passwordEncoder, final UserBuilder userBuilder, final TokenService tokenService, EmailSender emailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userBuilder = userBuilder;
        this.tokenService = tokenService;
        this.emailSender = emailSender;
    }

    public UserLoginResponseDetails login(final UserLoginRequestDetails request) {
        final Optional<UserDocument> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            System.out.printf("User with email %s not found", request.getEmail());
            throw new UserNotFoundException();
        }

        final boolean doPasswordsMatch = passwordEncoder.matches(request.getPassword(), userOptional.get().getPassword());
        if (!doPasswordsMatch) {
            System.out.printf("Incorrect password for user with email %s", request.getPassword());
            throw new UserNotFoundException();
        }

        final UserDocument user = userOptional.get();
        if (!user.isVerifiedAccount()) {
            System.out.printf("User with email %s is not verified, confirmation email has been sent again!", user.getEmail());
            emailSender.sendConfirmation(user.getEmail(), tokenService.generate(user));
            throw new AccountIsNotVerifiedException();
        }

        System.out.printf("User with email %s has been successfully logged in!", user.getEmail());
        return userBuilder.buildAuthenticatedUser(user);
    }

    public void confirm(final String token) {
        final TokenDocument tokenOptional = tokenService.findByValue(token);
        final Optional<UserDocument> userOptional = userRepository.findById(tokenOptional.getUserId());
        if (userOptional.isEmpty()) return;

        final UserDocument user = userOptional.get();

        if (user.isVerifiedAccount()) {
            System.out.printf("User with email %s already verified his account", user.getEmail());
            tokenService.expireToken(tokenOptional);
            throw new AccountIsAlreadyVerified();
        }

        user.setVerifiedAccount(true);
        tokenService.expireToken(tokenOptional);
        userRepository.save(user);
    }

    public Optional<UserDocument> findByEmail(final String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<UserDocument> finById(final String id) {
        return userRepository.findById(id);
    }

    public void resetPassword(final UserDocument user, final ResetPasswordDetails details) {
        user.setPassword(passwordEncoder.encode(details.getPassword()));
        userRepository.save(user);
    }

}
