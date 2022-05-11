package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

import java.util.Objects;

public class MatchFieldsExecutor implements LogicExecutor {

    private FieldDocument parentField;

    @Override
    public FieldDocument execute(final FieldDocument field) {
        if (Objects.equals(field.getName(), this.parentField.getName())) {
            if (this.parentField.getMetadata() != null &&
                    this.parentField.getMetadata().containsKey("submitted_value")) {
                final String value = String.valueOf(this.parentField.getMetadata().get("submitted_value"));
                field.getMetadata().put("submitted_value", value);
            }
        }
        return null;
    }

    @Override
    public boolean needMatchableField() {
        return true;
    }

    @Override
    public void setCurrentBaseSourceField(final FieldDocument field) {
        this.parentField = field;
    }

}
