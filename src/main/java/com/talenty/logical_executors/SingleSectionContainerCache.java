package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

import java.util.List;
import java.util.Objects;

public class SingleSectionContainerCache implements LogicExecutor {
    private final List<FieldDocument> list;

    public SingleSectionContainerCache(final List<FieldDocument> sectionsIds) {
        this.list = sectionsIds;
    }

    @Override
    public FieldDocument execute(final FieldDocument field) {
        if (field.getMetadata() != null &&
                field.getMetadata().containsKey("type") &&
                Objects.equals(field.getMetadata().get("type"), "section_container")) {
            this.list.add(field);
        }
        return field;
    }

    @Override
    public void setCurrentBaseSourceField(final FieldDocument field) {
    }

    @Override
    public boolean needMatchableField() {
        return false;
    }


}
