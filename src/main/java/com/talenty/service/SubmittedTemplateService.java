package com.talenty.service;

import com.talenty.domain.dto.Template;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.domain.mongo.SubmittedTemplateDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.SubmittedTemplateRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SubmittedTemplateService {

    private final SubmittedTemplateRepository submittedTemplateRepository;
    private final TemplateService templateService;

    public SubmittedTemplateService(final SubmittedTemplateRepository submittedTemplateRepository, final TemplateService templateService) {
        this.submittedTemplateRepository = submittedTemplateRepository;
        this.templateService = templateService;
    }

    public SubmittedTemplateDocument saveSubmittedTemplate(final Template template) {
        final TemplateDocument parentTemplate = templateService.getTemplateById(template.getId());

        final TemplateDocument submittedTemplate = TemplateMapper.instance.dtoToTemplate(template);
        cleanUpSubmittedTemplateFields(submittedTemplate.getFields(), parentTemplate.getFields());

        final SubmittedTemplateDocument cleanedUpSubmittedTemplate = TemplateMapper.instance.templateTopSubmittedTemplate(submittedTemplate);
        cleanedUpSubmittedTemplate.setId(null);
        cleanedUpSubmittedTemplate.setParentId(parentTemplate.getId());

        return submittedTemplateRepository.save(cleanedUpSubmittedTemplate);
    }

    private void cleanUpSubmittedTemplateFields(final List<FieldDocument> submittedFields, final List<FieldDocument> parentFields) {
        if (submittedFields.size() != parentFields.size()) {
            throw new NoSuchTemplateException();
        }
        for (int i = 0; i < parentFields.size(); i++) {
            final FieldDocument tempSubmittedField = submittedFields.get(i);
            final FieldDocument tempParentField = parentFields.get(i);

            if (!tempParentField.getId().equals(tempSubmittedField.getId())) {
                System.out.printf(
                        "Cause: Field ID miss match. Current Field: %s, Current Parent's Field: %s",
                        tempSubmittedField,
                        tempParentField
                );
                throw new NoSuchTemplateException();
            }

            if (tempSubmittedField.getFields() == null && tempParentField.getFields() == null) {
                final Map<String, Object> tempParentFieldMetadata = tempParentField.getMetadata();
                final Map<String, Object> tempSubmittedFieldMetadata = tempSubmittedField.getMetadata();

                if (tempParentFieldMetadata.containsKey("required")) {
                    if ((boolean) tempParentFieldMetadata.get("required")
                            && !tempSubmittedFieldMetadata.containsKey("submitted_value")) {
                        System.out.printf(
                                "Cause: Required field doesn't submitted! Field: %s ",
                                tempSubmittedField
                        );
                        throw new NoSuchTemplateException();
                    }
                }

                if (tempSubmittedFieldMetadata.containsKey("submitted_value")) {
                    ValidationChecker.assertSubmittedFieldIsValid(tempSubmittedField, tempParentField);
                }

            } else if (tempSubmittedField.getFields() != null && tempParentField.getFields() != null) {
                ValidationChecker.assertSectionIsValid(tempSubmittedField);
                cleanUpSubmittedTemplateFields(tempSubmittedField.getFields(), tempParentField.getFields());
            }
        }
    }

}
