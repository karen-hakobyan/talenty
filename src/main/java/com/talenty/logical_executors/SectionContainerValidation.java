package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

import java.util.List;

public class SectionContainerValidation implements LogicExecutor {

    private final List<FieldDocument> list;

    public SectionContainerValidation(final List<FieldDocument> sections) {
        // TODO make validation here,
        // TODO if it is section container then check here and return
        // TODO if it is inside container then return, because you have already checked with iteration
        this.list = sections;
    }

    @Override
    public void execute(final FieldDocument field) {
    }

    @Override
    public boolean needMatchableField() {
        return false;
    }

    @Override
    public void setCurrentBaseSourceField(FieldDocument field) {

    }
}
