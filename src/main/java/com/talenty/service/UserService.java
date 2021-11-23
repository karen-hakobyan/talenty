package com.talenty.service;

import com.talenty.domain.dto.user.UserLoginRequestDetails;
import com.talenty.domain.dto.user.UserLoginResponseDetails;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.exceptions.UserNotFoundException;
import com.talenty.mapper.UserMapper;
import com.talenty.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserLoginResponseDetails login(final UserLoginRequestDetails request) {

        final Optional <UserDocument> userOptional = userRepository.findByEmail(request.getEmail());

        if(userOptional.isEmpty()) {
            throw new UserNotFoundException();
        }
        /* TODO
             Check passwords matches.
        */

        return UserMapper.instance.documentToLoginResponse(userOptional.get());
    }
}
