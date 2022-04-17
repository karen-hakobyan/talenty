package com.talenty.logical_executors.executor;

import com.talenty.domain.dto.user.AuthenticatedUser;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.UserNotFoundException;
import com.talenty.logical_executors.*;
import com.talenty.service.AuthenticatedUserService;
import com.talenty.validation.ValidationChecker;
import org.bson.types.ObjectId;

import java.util.*;

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
        final Optional<AuthenticatedUser> currentUserOptional = AuthenticatedUserService.getCurrentUser();
        if (currentUserOptional.isEmpty()) {
            System.out.println("Empty user can't execute logic on fields");
            throw new UserNotFoundException();
        }
        if (childFields == null) {
            System.out.println("Child template is required");
            return;
        }
        if (parentFields == null) executeLogicOnFields(childFields, logicExecutors);
        else executeLogicOnFields(childFields, parentFields, currentUserOptional.get().getRole(), logicExecutors);
    }

    private void executeLogicOnFields(final List<FieldDocument> childFields,
                                      final List<FieldDocument> parentFields,
                                      final String role,
                                      final LogicExecutor... logicExecutors) {
        int parentFieldIndex = 0;
        for (int i = 0; i < childFields.size(); ++i) {
            final FieldDocument tempChildField = childFields.get(i);

            final Map<String, Object> childMetadata = tempChildField.getMetadata();
            final boolean isNew = Objects.equals(childMetadata.get("status"), "NEW");
            if (Objects.equals(role, "ROLE_HR_ADMIN")) {
                if (isNew) {
                    ValidationChecker.assertNewFieldIsValid(tempChildField);
                    tempChildField.setId(String.valueOf(new ObjectId()));
                    childMetadata.remove("status");
                    final List<FieldDocument> tempChildFieldFields = tempChildField.getFields();
                    if (tempChildFieldFields != null)
                        executeLogicOnFields(tempChildFieldFields, null, role, logicExecutors);
                    continue;
                }
            } else if (Objects.equals(role, "ROLE_JOB_SEEKER")) {
                final boolean isSectionContainer = Objects.equals(childMetadata.get("type"), "section_container");
                final boolean isSectionContainerFieldNew = Objects.equals(childMetadata.get("status"), "NEW_SECTION_CONTAINER_FIELD");
                boolean isSectionContainerField = false;
                if (childMetadata.containsKey("inside_container")) {
                    isSectionContainerField = Boolean.parseBoolean(childMetadata.get("inside_container").toString());
                }

                if ((isSectionContainer && isNew) || (isSectionContainerField && isSectionContainerFieldNew)) {
                    tempChildField.setId(String.valueOf(new ObjectId()));
                    childMetadata.remove("status");
                    final List<FieldDocument> tempChildFieldFields = tempChildField.getFields();
                    if (tempChildFieldFields != null)
                        executeLogicOnFields(tempChildFieldFields, parentFields.get(0).getFields(), role, logicExecutors);
                    continue;
                }

                if (isSectionContainer) {
                    final MergeFieldsExecutor mergeFieldsExecutor = new MergeFieldsExecutor();
                    mergeFieldsExecutor.setCurrentParentField(parentFields.get(0));
                    mergeFieldsExecutor.execute(tempChildField);
                    Executor.getInstance()
                            .setParentFields(parentFields.get(0).getFields())
                            .setChildFields(tempChildField.getFields())
                            .executeLogic(
                                    new MergeFieldsExecutor()
                            );
                    continue;
                }

                if (isSectionContainerField) {
                    final MergeFieldsExecutor mergeFieldsExecutor = new MergeFieldsExecutor();
                    mergeFieldsExecutor.setCurrentParentField(parentFields.get(0));
                    mergeFieldsExecutor.execute(tempChildField);
                    continue;
                }

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
                executeLogicOnFields(tempChildFieldFields, tempParentFieldFields, role, logicExecutors);

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
