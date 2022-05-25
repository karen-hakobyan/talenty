package com.talenty.executor;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.logical_executors.LogicExecutor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class RemoveFieldFromTemplateByNameExecutor implements LogicExecutor {

    private final List<String> names;

    public RemoveFieldFromTemplateByNameExecutor(final String... names) {
        this.names = new ArrayList<>();
        this.names.addAll(List.of(names));
    }

    @Override
    public void execute(final FieldDocument field) {
        if (names.isEmpty()) return;
        final List<FieldDocument> removableFields = new ArrayList<>();
        final List<String> namesToDelete = new ArrayList<>();
        if (field.getFields() != null) {
            final List<FieldDocument> fields = field.getFields();
            for (final String name : names) {
                for (final FieldDocument tempField : fields) {
                    if (Objects.equals(tempField.getName(), name)) {
                        removableFields.add(tempField);
                        namesToDelete.add(name);
                    }
                }
            }
            removableFields.forEach(fields::remove);
            namesToDelete.forEach(names::remove);
        }
    }

    @Override
    public boolean needMatchableField() {
        return false;
    }

    @Override
    public void setCurrentBaseSourceField(FieldDocument field) {
    }

}
