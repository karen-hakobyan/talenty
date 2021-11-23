package com.talenty.mapper;

import com.talenty.domain.dto.user.UserLoginResponseDetails;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.jwt.JWTService;
import org.springframework.stereotype.Component;

@Component
public class UserBuilder {

    private final JWTService jwtService;

    public UserBuilder(final JWTService jwtService) {
        this.jwtService = jwtService;
    }

    public UserLoginResponseDetails buildAuthenticatedUser(final UserDocument user) {
        final UserLoginResponseDetails response = new UserLoginResponseDetails();
        response.setJwtToken(jwtService.generate(user));
        return response;
    }

}
