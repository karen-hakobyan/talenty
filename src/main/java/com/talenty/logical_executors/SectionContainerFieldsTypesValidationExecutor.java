package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.SectionContainerFieldsTypesMissMatch;

import java.util.Map;
import java.util.Objects;

public class SectionContainerFieldsTypesValidationExecutor implements LogicExecutor {
    final static boolean NEED_PARENT = true;
    private FieldDocument parentField;


    @Override
    public void execute(final FieldDocument field) {
        final Map<String, Object> childMetadata = field.getMetadata();
        final Map<String, Object> parentMetadata = parentField.getMetadata();
        if (!(childMetadata.containsKey("type") && Objects.equals(childMetadata.get("type"), parentMetadata.get("type")))) {
            System.out.println("Section containers fields types must be same");
            throw new SectionContainerFieldsTypesMissMatch();
        }
    }

    @Override
    public void setCurrentBaseSourceField(final FieldDocument field) {
        this.parentField = field;
    }

    @Override
    public boolean needMatchableField() {
        return NEED_PARENT;
    }

}
