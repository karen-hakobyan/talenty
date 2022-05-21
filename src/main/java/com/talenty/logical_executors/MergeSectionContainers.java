package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.executor.BaseSource;

import java.util.List;
import java.util.Objects;

public class MergeSectionContainers implements LogicExecutor {
    private FieldDocument baseField;

    @Override
    public void execute(final FieldDocument field) {
        if (field.getMetadata() != null &&
                field.getMetadata().containsKey("submitted_value")) {
            this.baseField.getMetadata().put("submitted_value", field.getMetadata().get("submitted_value"));
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
