package com.talenty.service;

import com.talenty.domain.dto.SubmittedCVTemplate;
import com.talenty.domain.mongo.SubmittedCVTemplateDocument;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.logical_executors.CleanUpMetadataExecutor;
import com.talenty.logical_executors.FieldsIdValidationExecutor;
import com.talenty.logical_executors.MergeFieldsExecutor;
import com.talenty.logical_executors.RequiredFieldValidationExecutor;
import com.talenty.logical_executors.SubmittedFieldValueValidationExecutor;
import com.talenty.logical_executors.executor.Executor;
import com.talenty.mapper.CVTemplateMapper;
import com.talenty.repository.SubmittedCvTemplateRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubmittedCvTemplateService {

    private final SubmittedCvTemplateRepository submittedCvTemplateRepository;
    private final CVTemplateService cvTemplateService;

    public SubmittedCvTemplateService(final SubmittedCvTemplateRepository submittedCvTemplateRepository,
                                      final CVTemplateService cvTemplateService) {
        this.submittedCvTemplateRepository = submittedCvTemplateRepository;
        this.cvTemplateService = cvTemplateService;
    }

    public SubmittedCVTemplate saveSubmittedCvTemplate(final SubmittedCVTemplate submittedCVTemplate) {
        final CVTemplateDocument parentTemplate = cvTemplateService.getCvTemplateById(submittedCVTemplate.getId(), true);

        final SubmittedCVTemplateDocument submittedTemplate = CVTemplateMapper.instance.dtoToDocument(submittedCVTemplate);
        Executor.getInstance()
                .setChildFields(submittedTemplate.getFields())
                .setParentFields(parentTemplate.getFields())
                .executeLogic(
                        new FieldsIdValidationExecutor(),
                        new RequiredFieldValidationExecutor(),
                        new SubmittedFieldValueValidationExecutor(),
                        new CleanUpMetadataExecutor(true, "submitted_value")
                );
        submittedTemplate.setId(null);
        submittedTemplate.setParentId(parentTemplate.getId());
        return CVTemplateMapper.instance.documentToDto(submittedCvTemplateRepository.save(submittedTemplate));
    }

    public SubmittedCVTemplate getCvTemplateById(final String id, final boolean withMetadata) {
        Optional<SubmittedCVTemplateDocument> cvTemplateDocumentOptional = submittedCvTemplateRepository.findById(id);
        if (cvTemplateDocumentOptional.isEmpty()) {
            System.out.printf("Template with id '%s' is not found\n", id);
            throw new NoSuchTemplateException();
        }
        final SubmittedCVTemplateDocument submittedCVTemplateDocument = cvTemplateDocumentOptional.get();

        final CVTemplateDocument parentTemplate = cvTemplateService.getCvTemplateById(submittedCVTemplateDocument.getParentId(), true);
        Executor.getInstance()
                .setParentFields(parentTemplate.getFields())
                .setChildFields(submittedCVTemplateDocument.getFields())
                .executeLogic(
                        new MergeFieldsExecutor()
//                        !withMetadata ? new CleanUpMetadataExecutor(false, "editable", "deletable", "required", "required_editable") : null
                );

        return CVTemplateMapper.instance.documentToDto(submittedCVTemplateDocument);
    }

    public SubmittedCVTemplate edit(final SubmittedCVTemplate cvTemplate) {
        final CVTemplateDocument parentTemplate = cvTemplateService.getCvTemplateById(cvTemplate.getParentId(), true);

        final SubmittedCVTemplateDocument submittedTemplate = CVTemplateMapper.instance.dtoToDocument(cvTemplate);
        Executor.getInstance()
                .setChildFields(submittedTemplate.getFields())
                .setParentFields(parentTemplate.getFields())
                .executeLogic(
                        new FieldsIdValidationExecutor(),
                        new RequiredFieldValidationExecutor(),
                        new SubmittedFieldValueValidationExecutor()
                );
        return CVTemplateMapper.instance.documentToDto(submittedCvTemplateRepository.save(submittedTemplate));
    }
}
