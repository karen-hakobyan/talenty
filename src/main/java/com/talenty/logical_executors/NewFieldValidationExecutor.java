package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.validation.ValidationChecker;

import java.util.Map;
import java.util.Objects;

public class NewFieldValidationExecutor implements LogicExecutor {

    @Override
    public void execute(final FieldDocument field) {
        final Map<String, Object> metadata = field.getMetadata();
        if (metadata.containsKey("status") && Objects.equals(metadata.get("status"), "NEW"))
            ValidationChecker.assertNewFieldIsValid(field);
    }

}
