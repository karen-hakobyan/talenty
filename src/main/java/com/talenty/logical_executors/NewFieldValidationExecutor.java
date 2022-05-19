package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.validation.ValidationChecker;

import java.util.Objects;

public class NewFieldValidationExecutor implements LogicExecutor {

    @Override
    public FieldDocument execute(final FieldDocument field) {
        if (field.getMetadata().containsKey("status") && Objects.equals(field.getMetadata().get("status"), "NEW")) {
            ValidationChecker.assertNewFieldIsValid(field);
        }
        return field;
    }

    @Override
    public boolean needMatchableField() {
        return false;
    }

    @Override
    public void setCurrentBaseSourceField(FieldDocument field) {
    }

}
