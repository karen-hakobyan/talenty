package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "exception.response.status.EMAIL_ALREADY_REGISTERED")
public class EmailAlreadyRegisteredException extends RuntimeException {

    public EmailAlreadyRegisteredException(final String message) {
        super(message);
    }

}
