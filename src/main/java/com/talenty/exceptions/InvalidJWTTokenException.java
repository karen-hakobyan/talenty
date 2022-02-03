package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "exception.response.status.INVALID_JWT_TOKEN")
public class InvalidJWTTokenException extends RuntimeException {
}
