package com.talenty.service;

import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.dto.SubmittedCVTemplate;
import com.talenty.domain.mongo.JobSeekerDocument;
import com.talenty.domain.mongo.SubmittedCVTemplateDocument;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.logical_executors.*;
import com.talenty.logical_executors.executor.Executor;
import com.talenty.mapper.CVTemplateMapper;
import com.talenty.repository.SubmittedCvTemplateRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class SubmittedCvTemplateService {

    private final SubmittedCvTemplateRepository submittedCvTemplateRepository;
    private final CVTemplateService cvTemplateService;
    private final JobSeekerService jobSeekerService;

    public SubmittedCvTemplateService(final SubmittedCvTemplateRepository submittedCvTemplateRepository,
                                      final CVTemplateService cvTemplateService,
                                      final JobSeekerService jobSeekerService) {
        this.submittedCvTemplateRepository = submittedCvTemplateRepository;
        this.cvTemplateService = cvTemplateService;
        this.jobSeekerService = jobSeekerService;
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
        final JobSeekerDocument currentJobSeeker = jobSeekerService.getCurrentJobSeeker();
        submittedTemplate.setId(null);
        submittedTemplate.setParentId(parentTemplate.getId());
        submittedTemplate.setOwnerId(currentJobSeeker.getId());
        final SubmittedCVTemplateDocument saved = submittedCvTemplateRepository.save(submittedTemplate);
        cvTemplateService.updateCountIfNeeded(parentTemplate);
        return CVTemplateMapper.instance.documentToDto(saved);
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

    public CVTemplate edit(final CVTemplate editedCvTemplate) {
        final CVTemplateDocument parentTemplate = cvTemplateService.getCvTemplateById(editedCvTemplate.getId(), true);

        final Map<String, Object> parentMetadata = parentTemplate.getMetadata();

        final CVTemplateDocument cvTemplate = CVTemplateMapper.instance.dtoToDocument(editedCvTemplate);
        if (parentMetadata != null && parentMetadata.containsKey("count")) {
            final Object countInString = parentMetadata.get("count");
            if (countInString != null) {
                double count = Double.parseDouble(countInString.toString());
                if (count > 0) {
                    cvTemplate.setId(null);
                }
                Executor.getInstance()
                        .setChildFields(cvTemplate.getFields())
                        .setParentFields(parentTemplate.getFields())
                        .executeLogic(
                                new FieldsIdValidationExecutor(),
                                new DeletedFieldValidationExecutor()
                        );
                cvTemplate.setOwnerId(parentTemplate.getOwnerId());
                cvTemplate.setCompanyId(parentTemplate.getCompanyId());
                cvTemplate.setMetadata(Map.of("editable", true, "count", 0));
                return CVTemplateMapper.instance.documentToDto(cvTemplateService.save(cvTemplate));
            }
        }
        return null;
    }


}
