package com.talenty.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "exception.response.status.SECTION_CONTAINER_FIELDS_TYPES_MISS_MATCH")
public class SectionContainerFieldsTypesMissMatch extends RuntimeException {
}
