package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "exception.response.status.NO_SUCH_COMPANY")
public class NoSuchCompanyException extends RuntimeException {
}
