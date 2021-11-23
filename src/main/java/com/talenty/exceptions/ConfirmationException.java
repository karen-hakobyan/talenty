package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT)
public class ConfirmationException extends RuntimeException {

    public ConfirmationException(final String message) {
        super(message);
    }
}
