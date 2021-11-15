package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT)
public class ProvidedEmailAlreadyRegistered extends RuntimeException {

    public ProvidedEmailAlreadyRegistered(final String message) {
        super(message);
    }

}
