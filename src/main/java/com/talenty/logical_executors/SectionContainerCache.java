package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.executor.BaseSource;

import java.util.List;
import java.util.Objects;

public class SectionContainerCache implements LogicExecutor {

    private final List<FieldDocument> list;
    private FieldDocument baseField;
    private final BaseSource baseSource;

    public SectionContainerCache(final List<FieldDocument> sections, final BaseSource source) {
        this.list = sections;
        this.baseSource = source;
    }

    @Override
    public void execute(final FieldDocument field) {
        final FieldDocument iterable;
        if (baseSource.equals(BaseSource.ITERABLE)) {
            iterable = this.baseField;
        } else iterable = field;

        if (iterable.getMetadata() != null &&
                iterable.getMetadata().containsKey("type") &&
                Objects.equals(iterable.getMetadata().get("type"), "section_container")) {
            this.list.add(iterable);
        }
    }

    @Override
    public void setCurrentBaseSourceField(final FieldDocument field) {
        this.baseField = field;
    }

    @Override
    public boolean needMatchableField() {
        return true;
    }

}
