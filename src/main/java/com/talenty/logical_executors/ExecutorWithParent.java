package com.talenty.logical_executors;

import com.talenty.domain.mongo.BaseTemplateDocument;
import com.talenty.domain.mongo.FieldDocument;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExecutorWithParent {

    private final BaseTemplateDocument parentTemplate;
    private final BaseTemplateDocument childTemplate;
    private final List<FieldDocument> parentTemplateFields;
    private final List<FieldDocument> childTemplateFields;
    private final Map<Integer, Node> chain;
    private final int baseIndex;

    public ExecutorWithParent(final BaseTemplateDocument parentTemplate, final BaseTemplateDocument childTemplate) {
        this.parentTemplate = parentTemplate;
        this.childTemplate = childTemplate;
        if (parentTemplate == null || childTemplate == null) {
            throw new IllegalArgumentException("Templates cant be null while creating ExecutorWithParent");
        }
        parentTemplateFields = parentTemplate.getFields();
        childTemplateFields = childTemplate.getFields();
        chain = new HashMap<>();
        baseIndex = 0;
        final Node node = new Node();
        node.setList(parentTemplateFields);
        node.setIndex(0);
        chain.put(baseIndex, node);
    }

    protected FieldDocument getCurrentParentField() {
        final FieldDocument currentField = chain.get(baseIndex).getField();

//        if () {
//
//        }

        return currentField;
    }

    @Getter
    @Setter
    private static class Node {
        private List<FieldDocument> list;
        private int index = 0;

        public FieldDocument getField() {
            return list.get(index);
        }

    }

}
