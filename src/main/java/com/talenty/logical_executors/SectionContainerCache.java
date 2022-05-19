package com.talenty.logical_executors;

import com.talenty.domain.dto.Field;
import com.talenty.domain.mongo.FieldDocument;

import java.util.List;
import java.util.Objects;

public class SectionContainerCache implements LogicExecutor {

    private final List<FieldDocument> list;
    private FieldDocument parentField;

    public SectionContainerCache(final List<FieldDocument> sectionsIds) {
        this.list = sectionsIds;
    }

    @Override
    public FieldDocument execute(final FieldDocument field) {
        if (parentField.getMetadata() != null &&
                parentField.getMetadata().containsKey("type") &&
                Objects.equals(parentField.getMetadata().get("type"), "section_container")) {
            this.list.add(parentField);
        }
        return field;
    }

    @Override
    public void setCurrentBaseSourceField(final FieldDocument field) {
        this.parentField = field;
    }

    @Override
    public boolean needMatchableField() {
        return true;
    }

}
