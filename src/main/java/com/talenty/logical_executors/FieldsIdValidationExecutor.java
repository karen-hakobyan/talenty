package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.NoSuchTemplateException;

public class FieldsIdValidationExecutor implements LogicExecutor {

    @Override
    public void execute(final FieldDocument... field) {
        final FieldDocument parentField = field[0];
        final FieldDocument tempField = field[1];
        if (!parentField.getId().equals(tempField.getId())) {
            System.out.printf(
                    "Cause: Field ID miss match. Current Field: %s, Current Parent's Field: %s",
                    tempField,
                    parentField
            );
            throw new NoSuchTemplateException();
        }
    }

}
