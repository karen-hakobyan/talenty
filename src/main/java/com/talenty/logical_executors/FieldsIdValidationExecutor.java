package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
public class FieldsIdValidationExecutor implements LogicExecutor {

    @Override
    public void execute(final FieldDocument... field) {
        final FieldDocument parentField = field[0];
        final FieldDocument tempField = field[1];
        if (!parentField.getId().equals(tempField.getId())) {
            System.out.printf("Fields Id`s miss match. Field: %s, Parent's Field: %s\n", tempField, parentField);
            throw new NoSuchTemplateException();
        }
    }

}
