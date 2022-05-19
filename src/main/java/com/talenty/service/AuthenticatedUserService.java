package com.talenty.service;

import com.talenty.domain.dto.user.AuthenticatedUser;
import com.talenty.exceptions.UserNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticatedUserService {

    public static AuthenticatedUser getCurrentUser() {
        final AuthenticatedUser authenticatedUser;

        try {
            authenticatedUser = (AuthenticatedUser) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        } catch (final Exception e) {
            System.out.println("Current user not found while getting authenticated user");
            throw new UserNotFoundException();
        }

        if (authenticatedUser == null) {
            System.out.println("Current user not found while getting authenticated user");
            throw new UserNotFoundException();
        }

        return authenticatedUser;
    }

}
