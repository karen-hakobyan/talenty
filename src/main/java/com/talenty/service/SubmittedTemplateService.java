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
        final Optional<TemplateDocument> parentTemplateOptional = templateService.getTemplateById(template.getId());

        if (parentTemplateOptional.isEmpty()) {
            final String cause = String.format("Cause: No template with ID: %s", template.getId());
            System.out.println(cause);
            throw new NoSuchTemplateException(cause);
        }

        final TemplateDocument submittedTemplate = TemplateMapper.instance.dtoToTemplate(template);
        final TemplateDocument parentTemplate = parentTemplateOptional.get();
        cleanUpSubmittedTemplateFields(submittedTemplate.getFields(), parentTemplate.getFields());

        final SubmittedTemplateDocument cleanedUpSubmittedTemplate = TemplateMapper.instance.templateTopSubmittedTemplate(submittedTemplate);
        cleanedUpSubmittedTemplate.setId(null);
        cleanedUpSubmittedTemplate.setParentId(parentTemplate.getId());

        return submittedTemplateRepository.save(cleanedUpSubmittedTemplate);
    }

    private void cleanUpSubmittedTemplateFields(final List<FieldDocument> submittedFields, final List<FieldDocument> parentFields) {
        if (submittedFields.size() != parentFields.size()) {
            throw new NoSuchTemplateException("Cause: Section size miss match!");
        }
        for (int i = 0; i < parentFields.size(); i++) {
            final FieldDocument tempSubmittedField = submittedFields.get(i);
            final FieldDocument tempParentField = parentFields.get(i);

            if (!tempParentField.getId().equals(tempSubmittedField.getId())) {
                final String cause = String.format(
                        "Cause: Field ID miss match. Current Field: %s, Current Parent's Field: %s",
                        tempSubmittedField,
                        tempParentField
                );
                System.out.println(cause);
                throw new NoSuchTemplateException(cause);
            }

            if (tempSubmittedField.getFields() == null && tempParentField.getFields() == null) {
                final Map<String, Object> tempParentFieldMetadata = tempParentField.getMetadata();
                final Map<String, Object> tempSubmittedFieldMetadata = tempSubmittedField.getMetadata();

                if (tempParentFieldMetadata.containsKey("required")) {
                    if ((boolean) tempParentFieldMetadata.get("required")
                            && !tempSubmittedFieldMetadata.containsKey("submitted_value")) {
                        final String cause = String.format(
                                "Cause: Required field doesn't submitted! Field: %s ",
                                tempSubmittedField
                        );
                        System.out.println(cause);
                        throw new NoSuchTemplateException(cause);
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
        //TODO other logical validations like (country, city)
    }

}
