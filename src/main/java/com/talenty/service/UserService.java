package com.talenty.service;

import com.talenty.domain.dto.user.UserLoginRequestDetails;
import com.talenty.domain.dto.user.hr.HrLoginResponseDetails;
import com.talenty.domain.mongo.TokenDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.exceptions.ConfirmationException;
import com.talenty.repository.TokenRepository;
import com.talenty.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    public UserService(final TokenRepository tokenRepository, final UserRepository userRepository) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }

    public HrLoginResponseDetails login(final UserLoginRequestDetails request) {
        return null;
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
