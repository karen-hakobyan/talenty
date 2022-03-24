package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.NoSuchTemplateException;

import java.util.Map;
import java.util.Objects;

public class RequiredFieldValidationExecutor implements LogicExecutor {

    private final ExecutorWithParent executorWithParent;

    public RequiredFieldValidationExecutor(final ExecutorWithParent executorWithParent) {
        this.executorWithParent = executorWithParent;
    }

    @Override
    public void execute(final FieldDocument field) {
        final Map<String, Object> tempSubmittedFieldMetadata = field.getMetadata();

        final boolean fieldIsNew = tempSubmittedFieldMetadata.containsKey("status")
                && Objects.equals(tempSubmittedFieldMetadata.get("status"), "NEW");
        if (fieldIsNew) return;

        final FieldDocument parentField = executorWithParent.getCurrentParentField();
        if (parentField.getFields() != null && field.getFields() != null) return;

        final Map<String, Object> tempParentFieldMetadata = parentField.getMetadata();

        final boolean doesSubmittedValueExists = tempSubmittedFieldMetadata.containsKey("submitted_value");
        final boolean doesRequiredFieldExists = tempParentFieldMetadata.containsKey("required");
        if (doesRequiredFieldExists) {
            final boolean required = (boolean) tempParentFieldMetadata.get("required");
            if (required && !doesSubmittedValueExists) {
                System.out.printf("Required field doesn't submitted! Field '%s'\n", field);
                throw new NoSuchTemplateException();
            }
        }
    }

}
