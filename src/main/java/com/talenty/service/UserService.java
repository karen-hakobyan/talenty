package com.talenty.service;

import com.talenty.domain.dto.reset.ResetPasswordDetails;
import com.talenty.domain.dto.user.UserLoginRequestDetails;
import com.talenty.domain.dto.user.UserLoginResponseDetails;
import com.talenty.domain.mongo.TokenDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.email.EmailSender;
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
            throw new UserNotFoundException();
        }

        final boolean passwordsMatch = passwordEncoder.matches(request.getPassword(), userOptional.get().getPassword());

        if (!passwordsMatch) {
            throw new UserNotFoundException();
        }

        final UserDocument user = userOptional.get();
        if(!user.isVerifiedAccount()) {
            emailSender.sendConfirmation(user.getEmail(), tokenService.generate(user));
            throw new AccountIsNotVerifiedException();
        }

        return userBuilder.buildAuthenticatedUser(userOptional.get());
    }

    public void confirm(final String token) {
        final Optional<TokenDocument> tokenOptional = tokenService.findByValue(token);
        if (tokenOptional.isEmpty()) {
            throw new TokenNotFoundException("Token: " + token + " does not exist!");
        }

        final Optional<UserDocument> userOptional = userRepository.findById(tokenOptional.get().getUserId());
        if (userOptional.isEmpty()) {
            return;
        }

        final UserDocument user = userOptional.get();
        user.setVerifiedAccount(true);

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
