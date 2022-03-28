package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.validation.ValidationChecker;

public class SubmittedFieldValueValidationExecutor implements LogicExecutor {
    private static final boolean NEED_PARENT_FIELD = true;
    private FieldDocument currentParentField;

    @Override
    public FieldDocument execute(final FieldDocument field) {
        if (this.currentParentField.getFields() != null && field.getFields() != null) return field;
        if (field.getMetadata().containsKey("submitted_value"))
            ValidationChecker.assertSubmittedFieldIsValid(field, currentParentField);
        return field;
    }

    @Override
    public boolean needParentField() {
        return NEED_PARENT_FIELD;
    }

    @Override
    public void setCurrentParentField(final FieldDocument field) {
        this.currentParentField = field;
    }

}
