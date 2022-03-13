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
    public void execute(final FieldDocument... fields) {
        final FieldDocument field = fields[0];
        if (field.getFields() != null) return;

        if (adminDefinedTypeValues == null) {
            try {
                adminDefinedTypeValues = typeValuesService.getTypesWithValues();
            } catch (final Exception e) {
                System.out.println("Could not get admin data");
                return;
            }
        }
        final Map<String, Object> metadata = field.getMetadata();

        for (final TypeValues typeValue : adminDefinedTypeValues) {
            if (typeValue.getType().equals(metadata.get("type"))) {
                metadata.put("values", typeValue.getValues());
            }
        }
    }

    @PostConstruct
    private void init() {
        try {
            adminDefinedTypeValues = typeValuesService.getTypesWithValues();
        } catch (final Exception e) {
            System.out.println("Could not get admin data");
        }
    }

}
