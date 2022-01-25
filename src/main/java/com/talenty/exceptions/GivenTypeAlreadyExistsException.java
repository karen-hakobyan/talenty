package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "exception.response.status.GIVEN_TYPE_ALREADY_EXISTS")
public class GivenTypeAlreadyExistsException extends RuntimeException {
}
