package com.talenty.service;

import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.mongo.SubmittedCVTemplateDocument;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.logical_executors.Executor;
import com.talenty.logical_executors.FieldsIdValidationExecutor;
import com.talenty.logical_executors.RequiredFieldValidationExecutor;
import com.talenty.logical_executors.SubmittedFieldValueValidationExecutor;
import com.talenty.mapper.CVTemplateMapper;
import com.talenty.repository.SubmittedCvTemplateRepository;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class SubmittedCvTemplateService {

    private final SubmittedCvTemplateRepository submittedCvTemplateRepository;
    private final CVTemplateService cvTemplateService;
    private final ApplicationContext applicationContext;

    public SubmittedCvTemplateService(final SubmittedCvTemplateRepository submittedCvTemplateRepository,
                                      final CVTemplateService cvTemplateService,
                                      final ApplicationContext applicationContext) {
        this.submittedCvTemplateRepository = submittedCvTemplateRepository;
        this.cvTemplateService = cvTemplateService;
        this.applicationContext = applicationContext;
    }

    public SubmittedCVTemplateDocument saveSubmittedCvTemplate(final CVTemplate cvTemplate) {
        final CVTemplateDocument parentTemplate = cvTemplateService.getCvTemplateById(cvTemplate.getId());

        final CVTemplateDocument submittedTemplate = CVTemplateMapper.instance.dtoToTemplate(cvTemplate);

        Executor.cleanUpSubmittedFields(
                parentTemplate.getFields(),
                submittedTemplate.getFields(),
                true,
                applicationContext.getBean(FieldsIdValidationExecutor.class),
                applicationContext.getBean(RequiredFieldValidationExecutor.class),
                applicationContext.getBean(SubmittedFieldValueValidationExecutor.class)
        );

        final SubmittedCVTemplateDocument cleanedUpSubmittedCvTemplate = CVTemplateMapper.instance.cvTemplateToSubmittedTemplate(submittedTemplate);
        cleanedUpSubmittedCvTemplate.setId(null);
        cleanedUpSubmittedCvTemplate.setParentId(parentTemplate.getId());

        return submittedCvTemplateRepository.save(cleanedUpSubmittedCvTemplate);
    }

}
