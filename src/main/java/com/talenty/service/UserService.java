package com.talenty.service;

import com.talenty.domain.dto.reset.ResetPasswordDetails;
import com.talenty.domain.dto.user.UserLoginRequestDetails;
import com.talenty.domain.dto.user.UserLoginResponseDetails;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.JobSeekerDocument;
import com.talenty.domain.mongo.TokenDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.email.EmailSender;
import com.talenty.exceptions.AccountIsAlreadyVerified;
import com.talenty.exceptions.AccountIsNotVerifiedException;
import com.talenty.exceptions.UserNotFoundException;
import com.talenty.jwt.JWTService;
import com.talenty.mapper.UserBuilder;
import com.talenty.repository.UserRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserBuilder userBuilder;
    private final TokenService tokenService;
    private final EmailSender emailSender;
    private final JWTService jwtService;

    public UserService(final UserRepository userRepository,
                       final PasswordEncoder passwordEncoder,
                       final UserBuilder userBuilder,
                       final TokenService tokenService,
                       final EmailSender emailSender,
                       final JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userBuilder = userBuilder;
        this.tokenService = tokenService;
        this.emailSender = emailSender;
        this.jwtService = jwtService;
    }

    public UserLoginResponseDetails login(final UserLoginRequestDetails request) {
        final Optional<UserDocument> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            System.out.printf("User with email '%s' not found\n", request.getEmail());
            throw new UserNotFoundException();
        }

        final boolean doPasswordsMatch = passwordEncoder.matches(request.getPassword(), userOptional.get().getPassword());
        if (!doPasswordsMatch) {
            System.out.printf("Incorrect password for user with email '%s'\n", request.getPassword());
            throw new UserNotFoundException();
        }

        final UserDocument user = userOptional.get();
        if (!user.isVerifiedAccount()) {
            System.out.printf("User with email '%s' is not verified, confirmation email has been sent again\n", user.getEmail());
            emailSender.sendConfirmation(user.getEmail(), tokenService.generate(user));
            throw new AccountIsNotVerifiedException();
        }

        System.out.printf("User with email '%s' has been successfully logged in\n", user.getEmail());
        if (Objects.equals(user.getRole(), "ROLE_JOB_SEEKER")) {
            return userBuilder.buildAuthenticatedUser((JobSeekerDocument) user);
        } else if (Objects.equals(user.getRole(), "ROLE_HR_ADMIN")) {
            return userBuilder.buildAuthenticatedUser((HrDocument) user);
        }
        return userBuilder.buildAuthenticatedUser(user);
    }

    public void confirm(final String token) {
        final TokenDocument tokenOptional = tokenService.findByValue(token);
        final Optional<UserDocument> userOptional = userRepository.findById(tokenOptional.getUserId());
        if (userOptional.isEmpty()) return;

        final UserDocument user = userOptional.get();

        if (user.isVerifiedAccount()) {
            System.out.printf("User with email '%s' already verified\n", user.getEmail());
            tokenService.expireToken(tokenOptional);
            throw new AccountIsAlreadyVerified();
        }

        user.setVerifiedAccount(true);
        tokenService.expireToken(tokenOptional);
        userRepository.save(user);
        System.out.printf("User with email '%s' has been successfully confirmed\n", user.getEmail());
    }

    public Optional<UserDocument> findByEmail(final String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<UserDocument> finById(final String id) {
        return userRepository.findById(id);
    }

    public String resetPassword(final String token, final ResetPasswordDetails details) {
        ValidationChecker.assertPasswordIsValid(details.getPassword());
        ValidationChecker.assertPasswordsAreEqual(details.getPassword(), details.getConfirmPassword());

        final TokenDocument tokenDocument = tokenService.findByValue(token);
        final Optional<UserDocument> userOptional = finById(tokenDocument.getUserId());

        if (userOptional.isEmpty()) {
            System.out.printf("User with '%s' id does not exist\n", tokenDocument.getUserId());
            throw new UserNotFoundException();
        }

        final UserDocument user = userOptional.get();
        user.setPassword(passwordEncoder.encode(details.getPassword()));
        userRepository.save(user);
        tokenService.expireToken(tokenDocument);
        return jwtService.generate(user);
    }

    public void sendResetPassword(final String email) {
        final Optional<UserDocument> userOptional = findByEmail(email);

        if (userOptional.isEmpty()) {
            System.out.printf("User with '%s' email does not exist\n", email);
            throw new UserNotFoundException();
        }

        final String token = tokenService.generate(userOptional.get());
        emailSender.sendResetPassword(userOptional.get().getEmail(), token);
    }

}