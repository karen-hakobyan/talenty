package com.talenty.executor;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.WrongIterationFieldsSelectionException;
import com.talenty.logical_executors.*;

import java.util.*;

public class Executor {

    private List<FieldDocument> matchableFields;
    private List<FieldDocument> iterableFields;
    private BaseSource baseSource = BaseSource.ITERABLE;

    public Executor setSourceParent(final BaseSource baseSource) {
        this.baseSource = baseSource;
        return this;
    }

    public static Executor getInstance() {
        return new Executor();
    }

    public Executor setMatchableFields(final List<FieldDocument> parentFields) {
        this.matchableFields = parentFields;
        return this;
    }

    public Executor setIterableFields(final List<FieldDocument> childFields) {
        this.iterableFields = childFields;
        return this;
    }

    public Executor executeLogic(final LogicExecutor... logicExecutors) {
        // Child fields can not be null
        if (iterableFields == null) {
            System.out.println("Iterable template is required!!!");
            throw new WrongIterationFieldsSelectionException();
        }

        // If no parent specified, then just iterate on
        if (matchableFields == null) {
            executeLogicOnFields(iterableFields, logicExecutors);
            return this;
        }

        // Decide iterating on fields, default is child
        executeLogicOnFields(iterableFields, matchableFields, logicExecutors);
        return this;
    }

    private void executeLogicOnFields(final List<FieldDocument> iterableFields,
                                      final List<FieldDocument> matchableFields,
                                      final LogicExecutor... logicExecutors) {
        int tempIndex = 0;
        for (final FieldDocument tempIterableField : iterableFields) {
            final FieldDocument tempMatchableField = matchableFields.get(tempIndex++);

            for (final LogicExecutor logicExecutor : logicExecutors) {
                if (logicExecutor != null) {
                    if (this.baseSource == BaseSource.MATCHABLE) {
                        if (logicExecutor.needMatchableField()) {
                            logicExecutor.setCurrentBaseSourceField(tempMatchableField);
                        }
                        logicExecutor.execute(tempIterableField);
                    } else {
                        if (logicExecutor.needMatchableField()) {
                            logicExecutor.setCurrentBaseSourceField(tempIterableField);
                        }
                        logicExecutor.execute(tempMatchableField);
                    }
                }
            }

            final List<FieldDocument> tempIterableFieldFields = tempIterableField.getFields();
            final List<FieldDocument> tempMatchableFieldFields = tempMatchableField.getFields();
            if ((tempIterableFieldFields != null && !tempIterableFieldFields.isEmpty()) && (tempMatchableFieldFields != null && !tempMatchableFieldFields.isEmpty()))
                executeLogicOnFields(tempIterableFieldFields, tempMatchableFieldFields, logicExecutors);
        }

    }

    private void executeLogicOnFields(final List<FieldDocument> fields,
                                      final LogicExecutor... logicExecutors) {
        for (final FieldDocument field : fields) {
            for (final LogicExecutor logicExecutor : logicExecutors) {
                if (logicExecutor != null) {
                    if (!logicExecutor.needMatchableField()) {
                        logicExecutor.execute(field);
                    } else
                        System.out.println("You used logical executor which need parent field, in single iteration, logicalExecutor: " + logicExecutor.getClass().getSimpleName());
                }
            }

            final List<FieldDocument> fieldFields = field.getFields();
            if (fieldFields != null && !fieldFields.isEmpty()) executeLogicOnFields(fieldFields, logicExecutors);
        }
    }

    public Executor after() {
        return getInstance();
    }

}
