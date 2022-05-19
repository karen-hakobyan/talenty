package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

import java.util.List;
import java.util.Objects;

public class SectionOfSectionContainersCacheMatchable implements LogicExecutor {
    private final List<FieldDocument> list;
    private FieldDocument baseField;

    public SectionOfSectionContainersCacheMatchable(final List<FieldDocument> sectionOfSectionContainers) {
        this.list = sectionOfSectionContainers;
    }

    @Override
    public FieldDocument execute(final FieldDocument field) {

        if (this.baseField.getFields() != null &&
                this.baseField.getFields().get(0).getMetadata() != null &&
                Objects.equals(this.baseField.getFields().get(0).getMetadata().get("type"), "section_container")) {
            this.list.add(this.baseField);
        }

        return field;
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
