package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

import java.util.List;
import java.util.Objects;

public class MergeSectionContainers implements LogicExecutor {

    @Override
    public FieldDocument execute(final FieldDocument field) {

        return field;
    }

    @Override
    public boolean needMatchableField() {
        return false;
    }

    @Override
    public void setCurrentBaseSourceField(FieldDocument field) {

    }
}
