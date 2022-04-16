package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CleanUpMetadataExecutor implements LogicExecutor {

    private final List<String> fields;
    private final boolean deleteExcept;

    public CleanUpMetadataExecutor(final boolean deleteExcept, final String... args) {
        this.fields = List.of(args);
        this.deleteExcept = deleteExcept;
    }

    @Override
    public FieldDocument execute(final FieldDocument field) {
        final Map<String, Object> metadata = field.getMetadata();
        if (!deleteExcept) {
            for (final String s : fields) metadata.remove(s);
            return field;
        }

        final List<String> anotherFields = new ArrayList<>();
        for (final Map.Entry<String, Object> entry : metadata.entrySet()) {
            final String key = entry.getKey();
            if (!fields.contains(key)) anotherFields.add(key);
        }
        for (final String s : anotherFields) metadata.remove(s);

        return field;
    }

    @Override
    public boolean needParentField() {
        return false;
    }

    @Override
    public void setCurrentParentField(final FieldDocument field) {
    }

}
