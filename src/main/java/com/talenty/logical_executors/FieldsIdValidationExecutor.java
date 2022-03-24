package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.NoSuchTemplateException;

import java.util.Map;
import java.util.Objects;

public class FieldsIdValidationExecutor implements LogicExecutor {

    private final ExecutorWithParent executorWithParent;

    public FieldsIdValidationExecutor(final ExecutorWithParent executorWithParent) {
        this.executorWithParent = executorWithParent;
    }

    @Override
    public void execute(final FieldDocument field) {
        final Map<String, Object> metadata = field.getMetadata();

        final boolean fieldIsNew = metadata.containsKey("status") && Objects.equals(metadata.get("status"), "NEW");
        if (fieldIsNew) return;

        final FieldDocument parentField = executorWithParent.getCurrentParentField();

        if (!parentField.getId().equals(field.getId())) {
            System.out.printf("Fields Id`s miss match. Field: %s, Parent's Field: %s\n", field, parentField);
            throw new NoSuchTemplateException();
        }
    }

}
