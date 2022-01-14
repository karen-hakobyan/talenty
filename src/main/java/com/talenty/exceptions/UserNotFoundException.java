package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "exception.response.status.USER_NOT_FOUND")
public class UserNotFoundException extends RuntimeException {

}
