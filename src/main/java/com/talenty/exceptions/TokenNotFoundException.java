package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "exception.response.status.TOKEN_NOT_FOUND")
public class TokenNotFoundException extends RuntimeException {

    public TokenNotFoundException(final String message) {
        super(message);
    }
}
