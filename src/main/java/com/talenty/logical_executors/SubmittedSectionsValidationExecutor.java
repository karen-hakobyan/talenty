package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.validation.ValidationChecker;

import java.util.Map;

public class SubmittedSectionsValidationExecutor implements LogicExecutor {

    @Override
    public void execute(final FieldDocument... field) {
        final FieldDocument parentSection = field[0];
        final FieldDocument tempSection = field[1];

        final Map<String, Object> tempParentFieldMetadata = parentSection.getMetadata();
        final Map<String, Object> tempSubmittedFieldMetadata = tempSection.getMetadata();

        final boolean doesSubmittedValueExists = tempSubmittedFieldMetadata.containsKey("submitted_value");
        final boolean doesRequiredFieldExists = tempParentFieldMetadata.containsKey("required");
        if (doesRequiredFieldExists) {
            final boolean required = (boolean) tempParentFieldMetadata.get("required");
            if (required && !doesSubmittedValueExists) {
                System.out.printf("Cause: Required field doesn't submitted! Field '%s'\n", tempSection);
                throw new NoSuchTemplateException();
            }
        }

        if (doesSubmittedValueExists) {
            ValidationChecker.assertSubmittedFieldIsValid(tempSection, parentSection);
        }

    }

}
