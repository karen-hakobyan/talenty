package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "exception.response.status.INVALID_SINGLE_CHOICE_FIELD_EXCEPTION")
public class InvalidSingleChoiceFieldException extends RuntimeException{
}
