package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.NoSuchTemplateException;

import java.util.Arrays;
import java.util.List;

public class Executor {

    public static void executeLogicOnFields(final List<FieldDocument> fields, final LogicExecutor... logicExecutors) {
        fields.forEach(field -> {
            Arrays.stream(logicExecutors).forEach(logicExecutor -> logicExecutor.execute(field));
            final List<FieldDocument> fieldFields = field.getFields();
            if (fieldFields != null) executeLogicOnFields(fieldFields, logicExecutors);
        });
    }

    public static void cleanUpSubmittedFields(final List<FieldDocument> parentFields,
                                              final List<FieldDocument> submittedFields,
                                              final boolean firstTimeRequested,
                                              final LogicExecutor... logicExecutors) {
        if (firstTimeRequested && submittedFields.size() != parentFields.size()) throw new NoSuchTemplateException();
        final int[] index = {0};
        parentFields.forEach(tempParentField -> {
            final FieldDocument tempSubmittedField = submittedFields.get(index[0]++);
            Arrays.stream(logicExecutors).forEach(logicExecutor -> logicExecutor.execute(tempSubmittedField));
            final List<FieldDocument> tempParentFieldFields = tempParentField.getFields();
            if (tempParentFieldFields != null)
                cleanUpSubmittedFields(tempParentFieldFields, tempSubmittedField.getFields(), false, logicExecutors);
        });
    }

}
