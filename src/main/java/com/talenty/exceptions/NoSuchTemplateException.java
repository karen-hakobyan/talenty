package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "exception.response.status.NO_SUCH_TEMPLATE")
public class NoSuchTemplateException extends RuntimeException {
}
