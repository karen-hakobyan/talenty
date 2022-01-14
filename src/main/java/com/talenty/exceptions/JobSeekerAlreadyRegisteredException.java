package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "exception.response.status.JOB_SEEKER_ALREADY_REGISTERED")
public class JobSeekerAlreadyRegisteredException extends RuntimeException {
}
