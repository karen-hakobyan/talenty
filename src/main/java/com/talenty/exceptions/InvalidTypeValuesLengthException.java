package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "exception.response.status.INVALID_TYPE_VALUES_LENGTH")
public class InvalidTypeValuesLengthException extends RuntimeException {
}
