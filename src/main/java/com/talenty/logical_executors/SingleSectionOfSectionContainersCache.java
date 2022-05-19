package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.executor.BaseSource;

import java.util.List;
import java.util.Objects;

public class SingleSectionOfSectionContainersCache implements LogicExecutor {
    private final List<FieldDocument> list;

    public SingleSectionOfSectionContainersCache(final List<FieldDocument> sectionOfSectionContainers) {
        this.list = sectionOfSectionContainers;
    }

    @Override
    public void execute(final FieldDocument field) {
        if (field.getFields() != null &&
                field.getFields().get(0).getMetadata() != null &&
                Objects.equals(field.getFields().get(0).getMetadata().get("type"), "section_container")) {
            this.list.add(field);
        }
    }

    @Override
    public boolean needMatchableField() {
        return false;
    }

    @Override
    public void setCurrentBaseSourceField(FieldDocument field) {
    }
}
