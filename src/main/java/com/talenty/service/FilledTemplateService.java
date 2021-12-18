package com.talenty.service;

import com.talenty.domain.mongo.FieldDocument;
import com.talenty.domain.mongo.FilledFieldDocument;
import com.talenty.domain.mongo.FilledTemplateDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.repository.FilledTemplateRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FilledTemplateService {

    private final FilledTemplateRepository filledTemplateRepository;

    public FilledTemplateService(FilledTemplateRepository filledTemplateRepository) {
        this.filledTemplateRepository = filledTemplateRepository;
    }

    public FilledTemplateDocument save(final FilledTemplateDocument filledTemplateDocument) {
        return filledTemplateRepository.save(filledTemplateDocument);
    }

    public FilledTemplateDocument build(final TemplateDocument filledTemplate, final TemplateDocument parentTemplate) {
        final FilledTemplateDocument result = new FilledTemplateDocument();
        result.setParentId(parentTemplate.getId());


        final List<FieldDocument> parentTemplateFields = parentTemplate.getFields();
        final List<FieldDocument> filledTemplateFields = filledTemplate.getFields();

        final List<FilledFieldDocument> filledFields = test(parentTemplateFields, filledTemplateFields);

        result.setFields(filledFields);
        return result;
    }

    private List<FilledFieldDocument> test(List<FieldDocument> parentTemplateFields, List<FieldDocument> filledTemplateFields) {
        final List<FilledFieldDocument> result = new ArrayList<>();

        for (int i = 0; i < parentTemplateFields.size(); i++) {

            final FieldDocument tempParentField = parentTemplateFields.get(i);
            final FieldDocument tempFilledField = filledTemplateFields.get(i);

            if(!tempParentField.equals(tempFilledField)) {
                throw new IllegalArgumentException("fields miss match");
            }

            if(!isFieldValueValid(tempParentField)) {
                throw new IllegalArgumentException("fields miss match");
            }

            final FilledFieldDocument filledFieldDocument = new FilledFieldDocument();
            filledFieldDocument.setId(tempFilledField.getId());

            if(!(filledTemplateFields.get(i).getMetadata().get("type")).equals("section")) {
                filledFieldDocument.setValue((String) filledTemplateFields.get(i).getMetadata().get("value"));
            }

            result.add(filledFieldDocument);

            if(tempParentField.getFields() != null && tempFilledField.getFields() != null) {
                final List<FieldDocument> nextParentFields = tempParentField.getFields();
                final List<FieldDocument> nextFilledFields = tempFilledField.getFields();

                final List<FilledFieldDocument> test = test(nextParentFields, nextFilledFields);
                filledFieldDocument.setFields(test);
            }

            if(tempParentField.getFields() == null && tempFilledField.getFields() == null) {
                continue;
            }

            throw new IllegalArgumentException("fields miss match");
        }

        return result;
    }

    private boolean isFieldValueValid(final FieldDocument fieldDocument) {
        Map<String, Object> metadata = fieldDocument.getMetadata();
        Object value = metadata.get("value");
        System.out.println(value);
        //TODO check of required (namely checking value based on metadata)
        //TODO also check regex
        //TODO ...
        return true;
    }

}
