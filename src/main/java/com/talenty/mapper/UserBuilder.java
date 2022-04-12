package com.talenty.mapper;

import com.talenty.domain.dto.user.UserLoginResponseDetails;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.JobSeekerDocument;
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

    public UserLoginResponseDetails buildAuthenticatedUser(final JobSeekerDocument user) {
        final UserLoginResponseDetails response = new UserLoginResponseDetails();
        response.setJwtToken(jwtService.generate(user));
        return response;
    }

    public UserLoginResponseDetails buildAuthenticatedUser(final HrDocument user) {
        final UserLoginResponseDetails response = new UserLoginResponseDetails();
        response.setJwtToken(jwtService.generate(user));
        return response;
    }

}
