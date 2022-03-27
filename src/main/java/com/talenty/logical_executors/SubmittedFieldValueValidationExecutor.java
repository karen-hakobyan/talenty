package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.service.FieldService;
import com.talenty.validation.ValidationChecker;

public class SubmittedFieldValueValidationExecutor implements LogicExecutor {

    private final ExecutorWithParent executorWithParent;

    public SubmittedFieldValueValidationExecutor(final ExecutorWithParent executorWithParent) {
        this.executorWithParent = executorWithParent;
    }

    @Override
    public void execute(final FieldDocument field) {
        if (FieldService.isFieldNew(field)) return;

        final ExecutorWithParent.Node currentNode = executorWithParent.getCurrentNode();
        final FieldDocument currentParentField = currentNode.getCurrentParentField();

        if (currentParentField.getFields() != null && field.getFields() != null) return;

        final boolean doesSubmittedValueExists = field.getMetadata().containsKey("submitted_value");

        if (doesSubmittedValueExists) ValidationChecker.assertSubmittedFieldIsValid(field, currentParentField);
    }

}
