package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

public class MergeFieldsExecutor implements LogicExecutor {
    private static final boolean NEED_PARENT_FIELD = true;
    private FieldDocument currentParentField;

    @Override
    public FieldDocument execute(final FieldDocument field) {
        field.setName(currentParentField.getName());
        field.getMetadata().putAll(this.currentParentField.getMetadata());
        return field;
    }

    @Override
    public boolean needParentField() {
        return NEED_PARENT_FIELD;
    }

    @Override
    public void setCurrentParentField(final FieldDocument field) {
        this.currentParentField = field;
    }


}
