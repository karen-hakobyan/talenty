package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import org.springframework.stereotype.Component;

@Component
public class FieldsIdValidationExecutor implements LogicExecutor {

    private FieldDocument currentParentField;

    @Override
    public FieldDocument execute(final FieldDocument field) {
        if (!this
                .currentParentField
                .getId()
                .equals(
                        field
                                .getId())) {
            System.out.printf("Fields Id`s miss match. Field: %s, Parent's Field: %s\n", field, currentParentField);
            throw new NoSuchTemplateException();
        }
        return field;
    }

    @Override
    public boolean needMatchableField() {
        return true;
    }

    @Override
    public void setCurrentBaseSourceField(final FieldDocument field) {
        this.currentParentField = field;
    }

}
