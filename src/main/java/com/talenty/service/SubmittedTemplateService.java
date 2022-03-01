package com.talenty.service;

import com.talenty.domain.dto.Template;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.domain.mongo.SubmittedTemplateDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.logical_executors.FieldsIdValidationExecutor;
import com.talenty.logical_executors.LogicExecutor;
import com.talenty.logical_executors.SubmittedSectionsValidationExecutor;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.SubmittedTemplateRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class SubmittedTemplateService {

    private final SubmittedTemplateRepository submittedTemplateRepository;
    private final TemplateService templateService;
    private final ApplicationContext applicationContext;

    public SubmittedTemplateService(final SubmittedTemplateRepository submittedTemplateRepository, final TemplateService templateService, final ApplicationContext applicationContext) {
        this.submittedTemplateRepository = submittedTemplateRepository;
        this.templateService = templateService;
        this.applicationContext = applicationContext;
    }

    public SubmittedTemplateDocument saveSubmittedTemplate(final Template template) {
        final TemplateDocument parentTemplate = templateService.getTemplateById(template.getId());

        final TemplateDocument submittedTemplate = TemplateMapper.instance.dtoToTemplate(template);
        cleanUpSubmittedTemplateFields(submittedTemplate.getFields(), parentTemplate.getFields());

//        cleanUpSubmittedTemplateFieldsUltimate(
//                parentTemplate.getFields(),
//                submittedTemplate.getFields(),
//                applicationContext.getBean(FieldsIdValidationExecutor.class),
//                applicationContext.getBean(SubmittedSectionValidationExecutor.class)
//        );

        final SubmittedTemplateDocument cleanedUpSubmittedTemplate = TemplateMapper.instance.templateTopSubmittedTemplate(submittedTemplate);
        cleanedUpSubmittedTemplate.setId(null);
        cleanedUpSubmittedTemplate.setParentId(parentTemplate.getId());

        return submittedTemplateRepository.save(cleanedUpSubmittedTemplate);
    }

    private void cleanUpSubmittedTemplateFieldsUltimate(final List<FieldDocument> submittedFields, final List<FieldDocument> parentFields, final LogicExecutor... logicExecutors) {
        if (submittedFields.size() != parentFields.size())
            throw new NoSuchTemplateException();

        final int[] index = {0};
        parentFields.forEach(tempParentField -> {
            final FieldDocument tempSubmittedField = submittedFields.get(index[0]++);
            Arrays.stream(logicExecutors).forEach(logicExecutor -> logicExecutor.execute(tempParentField, tempSubmittedField));
            if (tempParentField.getFields() != null)
                cleanUpSubmittedTemplateFields(tempSubmittedField.getFields(), tempParentField.getFields());
        });
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
                cleanUpSubmittedTemplateFields(tempSubmittedField.getFields(), tempParentField.getFields());
            }

        }
    }

}
