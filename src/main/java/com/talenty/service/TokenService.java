package com.talenty.service;

import com.talenty.domain.mongo.TokenDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.exceptions.TokenNotFoundException;
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

    public TokenDocument findByValue(final String token) {
        final Optional<TokenDocument> byValue = tokenRepository.findByValue(token);
        if(byValue.isEmpty()) {
            throw new TokenNotFoundException("");
        }
        return byValue.get();
    }

    public void expireToken(final TokenDocument token) {
        token.setExpired(true);
        tokenRepository.save(token);
    }

}
