package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.validation.ValidationChecker;

import java.util.Map;
import java.util.Objects;

public class SubmittedFieldValueValidationExecutor implements LogicExecutor {

    private final ExecutorWithParent executorWithParent;

    public SubmittedFieldValueValidationExecutor(final ExecutorWithParent executorWithParent) {
        this.executorWithParent = executorWithParent;
    }

    @Override
    public void execute(final FieldDocument field) {
        final Map<String, Object> metadata = field.getMetadata();

        final boolean fieldIsNew = metadata.containsKey("status") && Objects.equals(metadata.get("status"), "NEW");
        if (fieldIsNew) return;

        final FieldDocument parentField = executorWithParent.getCurrentParentField();
        if (parentField.getFields() != null && field.getFields() != null) return;

        final boolean doesSubmittedValueExists = metadata.containsKey("submitted_value");

        if (doesSubmittedValueExists) ValidationChecker.assertSubmittedFieldIsValid(field, parentField);
    }

}
