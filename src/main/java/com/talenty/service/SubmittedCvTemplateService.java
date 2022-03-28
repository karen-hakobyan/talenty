package com.talenty.service;

import com.talenty.domain.dto.SubmittedCVTemplate;
import com.talenty.domain.mongo.SubmittedCVTemplateDocument;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.logical_executors.FieldsIdValidationExecutor;
import com.talenty.logical_executors.RequiredFieldValidationExecutor;
import com.talenty.logical_executors.SubmittedFieldValueValidationExecutor;
import com.talenty.logical_executors.executor.Executor;
import com.talenty.mapper.CVTemplateMapper;
import com.talenty.repository.SubmittedCvTemplateRepository;
import org.springframework.stereotype.Service;

@Service
public class SubmittedCvTemplateService {

    private final SubmittedCvTemplateRepository submittedCvTemplateRepository;
    private final CVTemplateService cvTemplateService;

    public SubmittedCvTemplateService(final SubmittedCvTemplateRepository submittedCvTemplateRepository,
                                      final CVTemplateService cvTemplateService) {
        this.submittedCvTemplateRepository = submittedCvTemplateRepository;
        this.cvTemplateService = cvTemplateService;
    }

    public SubmittedCVTemplateDocument saveSubmittedCvTemplate(final SubmittedCVTemplate submittedCVTemplate) {
        final CVTemplateDocument parentTemplate = cvTemplateService.getCvTemplateById(submittedCVTemplate.getId(), true);

        final SubmittedCVTemplateDocument submittedTemplate = CVTemplateMapper.instance.dtoToDocument(submittedCVTemplate);
        Executor.getInstance()
                .setChildFields(submittedTemplate.getFields())
                .setParentFields(parentTemplate.getFields())
                .executeLogic(
                        new FieldsIdValidationExecutor(),
                        new RequiredFieldValidationExecutor(),
                        new SubmittedFieldValueValidationExecutor()
                );
        submittedTemplate.setId(null);
        submittedTemplate.setParentId(parentTemplate.getId());
        return submittedCvTemplateRepository.save(submittedTemplate);
    }

}
