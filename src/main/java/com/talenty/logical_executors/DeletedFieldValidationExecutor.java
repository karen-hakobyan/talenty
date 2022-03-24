package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.validation.ValidationChecker;

import java.util.Map;
import java.util.Objects;

public class DeletedFieldValidationExecutor implements LogicExecutor {

    private final ExecutorWithParent executorWithParent;

    public DeletedFieldValidationExecutor(final ExecutorWithParent executorWithParent) {
        this.executorWithParent = executorWithParent;
    }

    @Override
    public void execute(final FieldDocument field) {
//        final Map<String, Object> metadata = field.getMetadata();
//        if (metadata.containsKey("status") && Objects.equals(metadata.get("status"), "DELETED")) {
//            ValidationChecker.assertDeletedFieldIsValid(field, executorWithParent.getCurrentNode());
////            final int deletedFieldIndex = executorWithParent.getCurrentIndex();
//        }

    }

}
