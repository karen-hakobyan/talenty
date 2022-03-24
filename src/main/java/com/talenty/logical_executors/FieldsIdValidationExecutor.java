package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.service.FieldService;

public class FieldsIdValidationExecutor implements LogicExecutor {

    private final ExecutorWithParent executorWithParent;

    public FieldsIdValidationExecutor(final ExecutorWithParent executorWithParent) {
        this.executorWithParent = executorWithParent;
    }

    @Override
    public void execute(final FieldDocument field) {
        if (FieldService.isFieldNew(field)) return;

//        final FieldDocument parentField = executorWithParent.getCurrentNode();
//
//        if (!parentField.getId().equals(field.getId())) {
//            System.out.printf("Fields Id`s miss match. Field: %s, Parent's Field: %s\n", field, parentField);
//            throw new NoSuchTemplateException();
//        }
    }

}
