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
            System.out.println("Child template is required!!!");
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

//    private void executeLogicOnFieldsAnotherSolution(final List<FieldDocument> childFields,
//                                                     final List<FieldDocument> parentFields,
//                                                     final String role,
//                                                     final LogicExecutor... logicExecutors) {
//        int parentFieldIndex = 0;
//        for (int i = 0; i < childFields.size(); ++i) {
//            final FieldDocument tempChildField = childFields.get(i);
//            if (tempChildField == null) {
//                parentFieldIndex++;
//                continue;
//            }
//
//            if (handelNewField(parentFields, tempChildField, role, logicExecutors)) continue;
//
//            final FieldDocument tempParentField = parentFields.get(parentFieldIndex++);
//
//            for (final LogicExecutor logicExecutor : logicExecutors) {
//                if (logicExecutor == null) continue;
//                if (logicExecutor.needParentField()) logicExecutor.setCurrentParentField(tempParentField);
//                final FieldDocument executedField = logicExecutor.execute(tempChildField);
//                childFields.set(i, executedField);
//            }
//
//            final List<FieldDocument> tempChildFieldFields = tempChildField.getFields();
//            final List<FieldDocument> tempParentFieldFields = tempParentField.getFields();
//            if (tempChildFieldFields != null && tempParentFieldFields != null)
//                executeLogicOnFieldsAnotherSolution(tempChildFieldFields, tempParentFieldFields, role, logicExecutors);
//
//        }
//    }

//    private void executeLogicOnFields(final List<FieldDocument> childFields,
//                                      final List<FieldDocument> parentFields,
//                                      final String role,
//                                      final LogicExecutor... logicExecutors) {
//        int parentFieldIndex = 0;
//        for (int i = 0; i < childFields.size(); ++i) {
//            final FieldDocument tempChildField = childFields.get(i);
//            if (tempChildField == null) {
//                parentFieldIndex++;
//                continue;
//            }
//
//            final FieldDocument tempParentField = parentFields.get(parentFieldIndex++);
//
//            for (final LogicExecutor logicExecutor : logicExecutors) {
//                if (logicExecutor == null) continue;
//                if (tempParentField != null && logicExecutor.needParentField()) {
//                    logicExecutor.setCurrentParentField(tempParentField);
//                    final FieldDocument executedField = logicExecutor.execute(tempChildField);
//                    childFields.set(i, executedField);
//                } else if (!logicExecutor.needParentField()) {
//                    final FieldDocument executedField = logicExecutor.execute(tempChildField);
//                    childFields.set(i, executedField);
//                }
//            }
//
//            final List<FieldDocument> tempChildFieldFields = tempChildField.getFields();
//            final List<FieldDocument> tempParentFieldFields = tempParentField.getFields();
//            if (tempChildFieldFields != null && tempParentFieldFields != null)
//                executeLogicOnFields(tempChildFieldFields, tempParentFieldFields, role, logicExecutors);
//
//        }
//    }

//    private boolean handelNewField(final List<FieldDocument> parentFields,
//                                   final FieldDocument tempChildField,
//                                   final String role,
//                                   final LogicExecutor[] logicExecutors) {
//        final Map<String, Object> childMetadata = tempChildField.getMetadata();
//
//        final boolean isNew = Objects.equals(childMetadata.get("status"), "NEW");
//        boolean isSectionContainer = false;
//        if (parentFields != null && parentFields.get(0) != null) {
//            isSectionContainer = Objects.equals(parentFields.get(0).getMetadata().get("type"), "section_container");
//        }
//        boolean isSectionContainerField = false;
//        if (childMetadata.containsKey("inside_container")) {
//            isSectionContainerField = Boolean.parseBoolean(String.valueOf(childMetadata.get("inside_container")));
//        }
//
//        if (Objects.equals(role, "ROLE_HR_ADMIN")) {
//            if (isSectionContainer || isSectionContainerField) {
//                return true;
//            } else {
//                if (isNew) {
//                    ValidationChecker.assertNewFieldIsValid(tempChildField);
//                    tempChildField.setId(String.valueOf(new ObjectId()));
//                    childMetadata.remove("status");
//                    final List<FieldDocument> tempChildFieldFields = tempChildField.getFields();
//                    if (tempChildFieldFields != null)
//                        executeLogicOnFields(tempChildFieldFields, null, role, logicExecutors);
//                    return true;
//                }
//            }
//        } else if (Objects.equals(role, "ROLE_JOB_SEEKER")) {
//            if ((isSectionContainer && isNew) || (isSectionContainerField && isNew)) {
//                tempChildField.setId(String.valueOf(new ObjectId()));
//                childMetadata.remove("status");
//                final List<FieldDocument> tempChildFieldFields = tempChildField.getFields();
//                if (tempChildFieldFields != null)
//                    executeLogicOnFields(tempChildFieldFields, parentFields.get(0).getFields(), role, logicExecutors);
//                return true;
//            }
//
//            if (isSectionContainer) {
//                final MergeFieldsExecutor mergeFieldsExecutor = new MergeFieldsExecutor();
//                mergeFieldsExecutor.setCurrentParentField(parentFields.get(0));
//                mergeFieldsExecutor.execute(tempChildField);
//                final List<FieldDocument> tempChildFieldFields = tempChildField.getFields();
//                if (tempChildFieldFields != null)
//                    executeLogicOnFields(tempChildFieldFields, parentFields.get(0).getFields(), role, new MergeFieldsExecutor());
//                return true;
//            }
//
//        }
//        return false;
//    }

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
