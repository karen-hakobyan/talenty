package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.executor.BaseSource;

import java.util.List;
import java.util.Objects;

public class SectionOfSectionContainersCache implements LogicExecutor {
    private final List<FieldDocument> list;
    private FieldDocument baseField;

    public SectionOfSectionContainersCache(final List<FieldDocument> sectionOfSectionContainers) {
        this.list = sectionOfSectionContainers;
    }

    @Override
    public void execute(final FieldDocument field) {
        if (field.getFields() != null &&
                field.getFields().get(0).getMetadata() != null &&
                Objects.equals(field.getFields().get(0).getMetadata().get("type"), "section_container")) {
            this.list.add(this.baseField);
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
