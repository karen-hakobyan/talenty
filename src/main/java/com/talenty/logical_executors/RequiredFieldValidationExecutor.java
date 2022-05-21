package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.NoSuchTemplateException;

import java.util.Map;

public class RequiredFieldValidationExecutor implements LogicExecutor {
    private static final boolean NEED_PARENT_FIELD = true;
    private FieldDocument currentParentField;

    @Override
    public void execute(final FieldDocument field) {
        final Map<String, Object> tempSubmittedFieldMetadata = field.getMetadata();
        if (this.currentParentField.getFields() != null && field.getFields() != null) return;

        final Map<String, Object> tempParentFieldMetadata = this.currentParentField.getMetadata();

        final boolean doesRequiredFieldExists = tempParentFieldMetadata.containsKey("required");
        if (doesRequiredFieldExists) {
            final boolean required = (boolean) tempParentFieldMetadata.get("required");
            final boolean doesSubmittedValueExists = tempSubmittedFieldMetadata.containsKey("submitted_value");
            if (required && !doesSubmittedValueExists) {
                System.out.printf("Required field doesn't submitted! Field '%s'\n", field);
                throw new NoSuchTemplateException();
            }
        }
    }

    @Override
    public boolean needMatchableField() {
        return NEED_PARENT_FIELD;
    }

    @Override
    public void setCurrentBaseSourceField(final FieldDocument field) {
        this.currentParentField = field;
    }

}
