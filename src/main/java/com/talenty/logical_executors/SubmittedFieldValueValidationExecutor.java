package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.validation.ValidationChecker;

public class SubmittedFieldValueValidationExecutor implements LogicExecutor {
    private static final boolean NEED_PARENT_FIELD = true;
    private FieldDocument currentParentField;

    @Override
    public void execute(final FieldDocument field) {
        if (this.currentParentField.getFields() != null && (field == null || field.getFields() != null)) return;
        if (field.getMetadata().containsKey("submitted_value"))
            ValidationChecker.assertSubmittedFieldIsValid(field, currentParentField);
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
