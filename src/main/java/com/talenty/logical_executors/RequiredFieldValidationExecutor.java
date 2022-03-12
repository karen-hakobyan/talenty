package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.NoSuchTemplateException;

import java.util.Map;

public class RequiredFieldValidationExecutor implements LogicExecutor{

    @Override
    public void execute(final FieldDocument... fields) {
        final FieldDocument parentSection = fields[0];
        final FieldDocument tempSection = fields[1];

        final Map<String, Object> tempParentFieldMetadata = parentSection.getMetadata();
        final Map<String, Object> tempSubmittedFieldMetadata = tempSection.getMetadata();

        final boolean doesSubmittedValueExists = tempSubmittedFieldMetadata.containsKey("submitted_value");
        final boolean doesRequiredFieldExists = tempParentFieldMetadata.containsKey("required");
        if (doesRequiredFieldExists) {
            final boolean required = (boolean) tempParentFieldMetadata.get("required");
            if (required && !doesSubmittedValueExists) {
                System.out.printf("Required field doesn't submitted! Field '%s'\n", tempSection);
                throw new NoSuchTemplateException();
            }
        }
    }

}
