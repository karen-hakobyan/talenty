package com.talenty.service;

import com.talenty.domain.dto.user.UserLoginRequestDetails;
import com.talenty.domain.dto.user.UserLoginResponseDetails;
import com.talenty.domain.mongo.TokenDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.exceptions.ConfirmationException;
import com.talenty.exceptions.UserNotFoundException;
import com.talenty.mapper.UserBuilder;
import com.talenty.repository.TokenRepository;
import com.talenty.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserBuilder userBuilder;

    public UserService(final TokenRepository tokenRepository, final UserRepository userRepository, final PasswordEncoder passwordEncoder, final UserBuilder userBuilder) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userBuilder = userBuilder;
    }

    public UserLoginResponseDetails login(final UserLoginRequestDetails request) {

        final Optional<UserDocument> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            throw new UserNotFoundException();
        }

        final boolean passwordsMatch = passwordEncoder.matches(request.getPassword(), userOptional.get().getPassword());

        if(!passwordsMatch) {
            throw new UserNotFoundException();
        }

        return userBuilder.buildAuthenticatedUser(userOptional.get());
    }

    public void confirm(final String token) {
        final Optional<TokenDocument> tokenOptional = tokenRepository.findByValue(token);
        if (tokenOptional.isEmpty()) {
            throw new ConfirmationException("Token: " + token + " does not exist!");
        }

        final Optional<UserDocument> userOptional = userRepository.findById(tokenOptional.get().getUserId());
        if (userOptional.isEmpty()) {
            return;
        }

        final UserDocument user = userOptional.get();
        user.setVerifiedAccount(true);

        userRepository.save(user);
    }

}
