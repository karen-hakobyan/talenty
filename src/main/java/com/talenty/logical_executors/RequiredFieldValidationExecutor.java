package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class RequiredFieldValidationExecutor implements LogicExecutor {

    @Override
    public void execute(final FieldDocument... fields) {
        final FieldDocument parentField = fields[0];
        final FieldDocument tempField = fields[1];
        if (parentField.getFields() != null && tempField.getFields() != null) return;

        final Map<String, Object> tempParentFieldMetadata = parentField.getMetadata();
        final Map<String, Object> tempSubmittedFieldMetadata = tempField.getMetadata();

        final boolean doesSubmittedValueExists = tempSubmittedFieldMetadata.containsKey("submitted_value");
        final boolean doesRequiredFieldExists = tempParentFieldMetadata.containsKey("required");
        if (doesRequiredFieldExists) {
            final boolean required = (boolean) tempParentFieldMetadata.get("required");
            if (required && !doesSubmittedValueExists) {
                System.out.printf("Required field doesn't submitted! Field '%s'\n", tempField);
                throw new NoSuchTemplateException();
            }
        }
    }

}
