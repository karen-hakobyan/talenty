package com.talenty.service;

import com.talenty.domain.mongo.TokenDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.repository.TokenRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TokenService {

    private final TokenRepository tokenRepository;

    public TokenService(final TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public String generate(final UserDocument user) {
        final String token = UUID.randomUUID().toString();
        tokenRepository.save(new TokenDocument(token, user.getId()));
        return token;
    }

    public Optional<TokenDocument> findByValue(final String token) {
        return tokenRepository.findByValue(token);
    }
}
