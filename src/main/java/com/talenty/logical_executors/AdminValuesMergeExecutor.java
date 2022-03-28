package com.talenty.logical_executors;

import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.service.TypeValuesService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

@Component
@Scope("prototype")
public class AdminValuesMergeExecutor implements LogicExecutor {

    private List<TypeValues> adminDefinedTypeValues = null;
    private final TypeValuesService typeValuesService;

    public AdminValuesMergeExecutor(final TypeValuesService typeValuesService) {
        this.typeValuesService = typeValuesService;
    }

    @Override
    public FieldDocument execute(final FieldDocument field) {
        if (field.getFields() != null) return field;
        if (adminDefinedTypeValues == null) getTypeValues();

        final Map<String, Object> metadata = field.getMetadata();
        for (final TypeValues typeValue : adminDefinedTypeValues) {
            if (typeValue.getType().equals(metadata.get("type"))) {
                metadata.put("values", typeValue.getValues());
            }
        }
        return field;
    }

    @Override
    public boolean needParentField() {
        return false;
    }

    @Override
    public void setCurrentParentField(final FieldDocument field) {
    }

    @PostConstruct
    private void getTypeValues() {
        try {
            adminDefinedTypeValues = typeValuesService.getTypesWithValues();
        } catch (final Exception e) {
            System.out.println("Could not get admin data");
        }
    }

}
