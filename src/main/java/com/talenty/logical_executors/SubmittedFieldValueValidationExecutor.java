package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.validation.ValidationChecker;
import org.springframework.stereotype.Component;

@Component
public class SubmittedFieldValueValidationExecutor implements LogicExecutor {

    @Override
    public void execute(final FieldDocument... field) {
        final FieldDocument parentField = field[0];
        final FieldDocument tempField = field[1];
        if (parentField.getFields() != null && tempField.getFields() != null) return;

        final boolean doesSubmittedValueExists = tempField.getMetadata().containsKey("submitted_value");

        if (doesSubmittedValueExists) ValidationChecker.assertSubmittedFieldIsValid(tempField, parentField);
    }

}
