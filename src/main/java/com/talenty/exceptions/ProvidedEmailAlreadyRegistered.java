package com.talenty.exceptions;

import com.talenty.exceptions.messages.TalentyExceptionMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = TalentyExceptionMessage.EMAIL_ALREADY_REGISTERED)
public class ProvidedEmailAlreadyRegistered extends RuntimeException {

    public ProvidedEmailAlreadyRegistered(final String message) {
        super(message);
    }

}
