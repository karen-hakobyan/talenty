package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.validation.ValidationChecker;

import java.util.Objects;

public class SubmittedSectionValidationExecutor implements LogicExecutor {

    @Override
    public void execute(final FieldDocument... field) {
        if (!Objects.equals(field[0].getMetadata().get("type"), "section")) {
            return;
        }
        ValidationChecker.assertSubmittedSectionIsValid(field[0]);
    }

}
