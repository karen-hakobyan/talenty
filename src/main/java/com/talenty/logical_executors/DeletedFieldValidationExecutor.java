package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.validation.ValidationChecker;

import java.util.Map;
import java.util.Objects;

public class DeletedFieldValidationExecutor implements LogicExecutor {
    private static final boolean NEED_PARENT_FIELD = true;
    private FieldDocument currentParentField;

    @Override
    public FieldDocument execute(final FieldDocument field) {
        final Map<String, Object> metadata = field.getMetadata();
        if (metadata.containsKey("status") && Objects.equals(metadata.get("status"), "DELETED")) {
            ValidationChecker.assertDeletedFieldIsValid(this.currentParentField);
            // returning null because it is deleted
            return null;
        }
        return field;
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
