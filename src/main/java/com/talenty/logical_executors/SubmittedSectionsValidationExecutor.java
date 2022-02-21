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

        if (parentSection.getFields().size() != tempSection.getFields().size()) {
            throw new NoSuchTemplateException();
        }

        final Map<String, Object> tempParentFieldMetadata = parentSection.getMetadata();
        final Map<String, Object> tempSubmittedFieldMetadata = tempSection.getMetadata();

        if (tempParentFieldMetadata.containsKey("required")) {
            if ((boolean) tempParentFieldMetadata.get("required")
                    && !tempSubmittedFieldMetadata.containsKey("submitted_value")) {
                System.out.printf(
                        "Cause: Required field doesn't submitted! Field: %s ",
                        tempSection
                );
                throw new NoSuchTemplateException();
            }
        }

        if (tempSubmittedFieldMetadata.containsKey("submitted_value")) {
            ValidationChecker.assertSubmittedFieldIsValid(tempSection, parentSection);
        }

    }

}
