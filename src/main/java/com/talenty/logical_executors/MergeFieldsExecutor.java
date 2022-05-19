package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

import java.util.HashMap;
import java.util.Map;

public class MergeFieldsExecutor implements LogicExecutor {
    private static final boolean NEED_PARENT_FIELD = true;
    private FieldDocument currentParentField;

    @Override
    public void execute(final FieldDocument field) {

        //TODO fix this

        if (currentParentField == null || field == null) {
            return;
        }

        field.setName(this.currentParentField.getName());

        final Map<String, Object> fullMetadata = currentParentField.getMetadata();
        final Map<String, Object> resultMap = new HashMap<>(fullMetadata);
        resultMap.putAll(field.getMetadata());
        field.setMetadata(resultMap);

    }

    @Override
    public boolean needMatchableField() {
        return NEED_PARENT_FIELD;
    }

    @Override
    public void setCurrentBaseSourceField(final FieldDocument field) {
        this.currentParentField = field;
    }


}
