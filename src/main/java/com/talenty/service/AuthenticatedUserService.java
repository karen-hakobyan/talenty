package com.talenty.service;

import com.talenty.domain.dto.user.AuthenticatedUser;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticatedUserService {

    public Optional<AuthenticatedUser> getCurrentUser() {
        final AuthenticatedUser authenticatedUser;

        try {
            authenticatedUser = (AuthenticatedUser) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        } catch (final Exception e) {
            return Optional.empty();
        }

        return Optional.of(authenticatedUser);
    }

}
