package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "exception.response.status.WRONG_SUBMISSION_FOR_ANNOUNCEMENT")
public class WrongSubmissionForAnnouncement extends RuntimeException {
}
