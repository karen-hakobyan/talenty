package com.talenty.service;

import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.mongo.SubmittedTemplateDocument;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.logical_executors.Executor;
import com.talenty.logical_executors.FieldsIdValidationExecutor;
import com.talenty.logical_executors.RequiredFieldValidationExecutor;
import com.talenty.logical_executors.SubmittedFieldValueValidationExecutor;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.SubmittedTemplateRepository;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

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

    public SubmittedTemplateDocument saveSubmittedTemplate(final CVTemplate cvTemplate) {
        final CVTemplateDocument parentTemplate = templateService.getTemplateById(cvTemplate.getId());

        final CVTemplateDocument submittedTemplate = TemplateMapper.instance.dtoToTemplate(cvTemplate);

        Executor.cleanUpSubmittedFields(
                parentTemplate.getFields(),
                submittedTemplate.getFields(),
                true,
                applicationContext.getBean(FieldsIdValidationExecutor.class),
                applicationContext.getBean(RequiredFieldValidationExecutor.class),
                applicationContext.getBean(SubmittedFieldValueValidationExecutor.class)
        );

        final SubmittedTemplateDocument cleanedUpSubmittedTemplate = TemplateMapper.instance.templateTopSubmittedTemplate(submittedTemplate);
        cleanedUpSubmittedTemplate.setId(null);
        cleanedUpSubmittedTemplate.setParentId(parentTemplate.getId());

        return submittedTemplateRepository.save(cleanedUpSubmittedTemplate);
    }

}
