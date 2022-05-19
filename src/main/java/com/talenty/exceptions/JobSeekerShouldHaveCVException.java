package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "exception.response.status.JOB_SEEKER_SHOULD_HAVE_CV")
public class JobSeekerShouldHaveCVException extends RuntimeException {
}
