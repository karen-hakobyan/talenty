package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED, reason = "exception.response.status.ACCOUNT_IS_ALREADY_VERIFIED")
public class AccountIsAlreadyVerified extends RuntimeException {
}
