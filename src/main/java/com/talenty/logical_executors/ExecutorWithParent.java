package com.talenty.logical_executors;

import com.talenty.domain.mongo.BaseTemplateDocument;
import com.talenty.domain.mongo.FieldDocument;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Stack;

public class ExecutorWithParent {

    private final BaseTemplateDocument parentTemplate;
    private final BaseTemplateDocument childTemplate;
    private Stack<Node> chain;

    public ExecutorWithParent(final BaseTemplateDocument parentTemplate, final BaseTemplateDocument childTemplate) {
        this.parentTemplate = parentTemplate;
        this.childTemplate = childTemplate;
        if (parentTemplate == null || childTemplate == null) {
            throw new IllegalArgumentException("Templates cant be null while creating ExecutorWithParent");
        }
        initializeChain();
    }

    protected Node getCurrentNode() {
        return chain.peek();
    }

    private void initializeChain() {
        chain = new Stack<>();
        final Node initialNode = new Node(
                parentTemplate.getFields(),
                childTemplate.getFields(),
                0
        );
        chain.push(initialNode);
    }

    public void moveIndicator() {
        final Node currentNode = getCurrentNode();

        final List<FieldDocument> currentParentList = currentNode.parentList;

        final FieldDocument currentParentField = currentNode.getCurrentParentField();
        final FieldDocument currentChildField = currentNode.getCurrentChildField();

        if (currentParentField.getFields() != null) {
            final Node nextNode = new Node(
                    currentParentField.getFields(),
                    currentChildField.getFields(),
                    0
            );
            currentNode.incrementIndex();
            if (currentParentList.size() == chain.peek().lastIndex) {
                chain.pop();
            }
            chain.push(nextNode);
        } else {
            currentNode.incrementIndex();

            if (currentParentList.size() == chain.peek().lastIndex) {
                chain.pop();
            }
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Node {
        private List<FieldDocument> parentList;
        private List<FieldDocument> childList;
        private int lastIndex = 0;

        public void incrementIndex() {
            this.lastIndex++;
        }

        public FieldDocument getCurrentParentField() {
            return parentList.get(lastIndex);
        }

        public FieldDocument getCurrentChildField() {
            return childList.get(lastIndex);
        }

    }

}
