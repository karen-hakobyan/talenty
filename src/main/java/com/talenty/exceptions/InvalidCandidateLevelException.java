package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "exception.response.status.INVALID_CANDIDATE_LEVEL")
public class InvalidCandidateLevelException extends RuntimeException {
}
