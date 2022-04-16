package com.talenty.logical_executors.executor;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.logical_executors.LogicExecutor;
import com.talenty.validation.ValidationChecker;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class Executor {

    private List<FieldDocument> parentFields;
    private List<FieldDocument> childFields;

    public static Executor getInstance() {
        return new Executor();
    }

    public Executor setParentFields(final List<FieldDocument> parentFields) {
        this.parentFields = parentFields;
        return this;
    }

    public Executor setChildFields(final List<FieldDocument> childFields) {
        this.childFields = childFields;
        return this;
    }

    public void executeLogic(final LogicExecutor... logicExecutors) {
        if (childFields == null) {
            System.out.println("Child template is required");
            return;
        }
        if (parentFields == null) executeLogicOnFields(childFields, logicExecutors);
        else executeLogicOnFields(childFields, parentFields, logicExecutors);
    }

    private void executeLogicOnFields(final List<FieldDocument> childFields,
                                      final List<FieldDocument> parentFields,
                                      final LogicExecutor... logicExecutors) {
        int parentFieldIndex = 0;
        for (int i = 0; i < childFields.size(); ++i) {
            final FieldDocument tempChildField = childFields.get(i);
            boolean isSectionContainer = false;
            boolean isNew = false;

            final Map<String, Object> childMetadata = tempChildField.getMetadata();
            if (childMetadata.containsKey("type") && Objects.equals(childMetadata.get("type"), "section_container")) {
                isSectionContainer = true;
            }

            if (childMetadata.containsKey("status") && Objects.equals(childMetadata.get("status"), "NEW")) {
                isNew = true;
            }

            if (isSectionContainer) {
                ValidationChecker.assertSectionContainerIsValid(tempChildField, parentFields.get(parentFields.size() - 1));
                return;
            }

            if (isNew) {
                ValidationChecker.assertNewFieldIsValid(tempChildField);
                return;
            }

            final FieldDocument tempParentField = parentFields.get(parentFieldIndex++);

            for (final LogicExecutor logicExecutor : logicExecutors) {
                if (logicExecutor == null) continue;
                if (logicExecutor.needParentField()) logicExecutor.setCurrentParentField(tempParentField);
                final FieldDocument executedField = logicExecutor.execute(tempChildField);
                childFields.set(i, executedField);
            }

            final List<FieldDocument> tempChildFieldFields = tempChildField.getFields();
            final List<FieldDocument> tempParentFieldFields = tempParentField.getFields();
            if (tempChildFieldFields != null && tempParentFieldFields != null)
                executeLogicOnFields(tempChildFieldFields, tempParentFieldFields, logicExecutors);

        }
    }

    private void executeLogicOnFields(final List<FieldDocument> fields,
                                      final LogicExecutor... logicExecutors) {
        fields.forEach(field -> {
            Arrays.stream(logicExecutors).forEach(logicExecutor -> {
                if (logicExecutor != null) logicExecutor.execute(field);
            });
            if (field != null) {
                final List<FieldDocument> fieldFields = field.getFields();
                if (fieldFields != null) executeLogicOnFields(fieldFields, logicExecutors);
            }
        });
    }

}
