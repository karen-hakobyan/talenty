package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "exception.response.status.HR_ALREADY_REGISTERED")
public class HrAlreadyRegisteredException extends RuntimeException {
}
