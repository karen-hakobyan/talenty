package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

import java.util.Objects;

public class MatchFieldsExecutor implements LogicExecutor {

    private FieldDocument baseField;

    @Override
    public void execute(final FieldDocument field) {
        if (Objects.equals(field.getName(), this.baseField.getName())) {
            if (field.getMetadata() != null && field.getMetadata().containsKey("submitted_value")) {
                final String value = String.valueOf(field.getMetadata().get("submitted_value"));
                this.baseField.getMetadata().put("submitted_value", value);
            }
        }
    }

    @Override
    public boolean needMatchableField() {
        return true;
    }

    @Override
    public void setCurrentBaseSourceField(final FieldDocument field) {
        this.baseField = field;
    }

}
