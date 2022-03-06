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
//        cleanUpSubmittedTemplateFields(submittedTemplate.getFields(), parentTemplate.getFields(), true);

        cleanUpSubmittedTemplateFieldsUltimate(
                parentTemplate.getFields(),
                submittedTemplate.getFields(),
                true,
                applicationContext.getBean(FieldsIdValidationExecutor.class),
                applicationContext.getBean(SubmittedSectionsValidationExecutor.class)
        );

        final SubmittedTemplateDocument cleanedUpSubmittedTemplate = TemplateMapper.instance.templateTopSubmittedTemplate(submittedTemplate);
        cleanedUpSubmittedTemplate.setId(null);
        cleanedUpSubmittedTemplate.setParentId(parentTemplate.getId());

        return submittedTemplateRepository.save(cleanedUpSubmittedTemplate);
    }

    private void cleanUpSubmittedTemplateFieldsUltimate(final List<FieldDocument> parentFields,
                                                        final List<FieldDocument> submittedFields,
                                                        final boolean firstTimeRequested,
                                                        final LogicExecutor... logicExecutors) {
        if (firstTimeRequested && submittedFields.size() != parentFields.size()) throw new NoSuchTemplateException();
        final int[] index = {0};
        parentFields.forEach(tempParentField -> {
            final FieldDocument tempSubmittedField = submittedFields.get(index[0]++);
            Arrays.stream(logicExecutors).forEach(logicExecutor -> logicExecutor.execute(tempParentField, tempSubmittedField));
            if (tempParentField.getFields() != null)
                cleanUpSubmittedTemplateFieldsUltimate(tempParentField.getFields(), tempSubmittedField.getFields(), false);
        });
    }

}
