package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

import java.util.HashMap;
import java.util.Map;

public class MergeFieldsExecutor implements LogicExecutor {
    private static final boolean NEED_PARENT_FIELD = true;
    private FieldDocument currentParentField;

    @Override
    public FieldDocument execute(final FieldDocument field) {
        if (currentParentField == null || field == null) {
            return field;
        }
        final Map<String, Object> fullMetadata = currentParentField.getMetadata();
        final Map<String, Object> resultMap = new HashMap<>(fullMetadata);

        field.setName(currentParentField.getName());
        if (resultMap.containsKey("autocomplete")) {
            if ((Boolean) resultMap.get("autocomplete")) {
                field.setMetadata(resultMap);
                return field;
            }
        } else {
            if (field.getMetadata().containsKey("submitted_value")) {
                resultMap.put("submitted_value", field.getMetadata().get("submitted_value"));
            }
        }
        field.setMetadata(resultMap);
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
