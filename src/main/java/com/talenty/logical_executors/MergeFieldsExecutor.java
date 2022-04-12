package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

import java.util.Map;

public class MergeFieldsExecutor implements LogicExecutor {
    private static final boolean NEED_PARENT_FIELD = true;
    private FieldDocument currentParentField;

    @Override
    public FieldDocument execute(final FieldDocument field) {
        final Map<String, Object> fullMetadata = currentParentField.getMetadata();
        if (fullMetadata.containsKey("autocomplete") && !(boolean) fullMetadata.get("autocomplete")) {
            fullMetadata.put("submitted_value", field.getMetadata().get("submitted_value"));
        }
        field.setName(currentParentField.getName());
        field.setMetadata(fullMetadata);
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
