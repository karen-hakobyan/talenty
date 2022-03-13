package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.validation.ValidationChecker;
import org.springframework.stereotype.Component;

@Component
public class SubmittedFieldValueValidationExecutor implements LogicExecutor {

    @Override
    public void execute(final FieldDocument... field) {
        final FieldDocument parentSection = field[0];
        final FieldDocument tempSection = field[1];
        if (parentField.getFields() != null && tempField.getFields() != null) return;

        final boolean doesSubmittedValueExists = tempSection.getMetadata().containsKey("submitted_value");

        if (doesSubmittedValueExists) ValidationChecker.assertSubmittedFieldIsValid(tempSection, parentSection);
    }

}
