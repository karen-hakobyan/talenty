package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "exception.response.status.PASSWORDS_DO_NOT_MATCH")
public class PasswordsDoNotMatchException extends RuntimeException {
}
