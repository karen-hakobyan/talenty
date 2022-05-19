package com.talenty.service;

import com.talenty.domain.dto.SubmittedCVTemplate;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.domain.mongo.JobSeekerDocument;
import com.talenty.domain.mongo.SubmittedCVTemplateDocument;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.executor.BaseSource;
import com.talenty.logical_executors.*;
import com.talenty.executor.Executor;
import com.talenty.mapper.CVTemplateMapper;
import com.talenty.repository.SubmittedCvTemplateRepository;
import org.springframework.stereotype.Service;

import java.util.*;

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

        final List<FieldDocument> submittedCvSections = new ArrayList<>();
        final List<FieldDocument> parentCvSections = new ArrayList<>();
        Executor.getInstance()
                .setIterableFields(parentTemplate.getFields())
                .setMatchableFields(submittedTemplate.getFields())
                .setSourceParent(BaseSource.ITERABLE)
                .executeLogic(
                        new FieldsIdValidationExecutor(),
                        new RequiredFieldValidationExecutor(),
                        new SubmittedFieldValueValidationExecutor(),
                        new SectionContainerCache(submittedCvSections, BaseSource.MATCHABLE),
                        new SectionContainerCache(parentCvSections, BaseSource.ITERABLE)
                )
                .after()
                .setIterableFields(submittedTemplate.getFields())
                .executeLogic(
                );

        final JobSeekerDocument currentJobSeeker = jobSeekerService.getCurrentJobSeeker();
        submittedTemplate.setId(null);
        submittedTemplate.setParentId(parentTemplate.getId());
        submittedTemplate.setOwnerId(currentJobSeeker.getId());
        final SubmittedCVTemplateDocument saved = submittedCvTemplateRepository.save(submittedTemplate);
        cvTemplateService.updateCountIfNeeded(parentTemplate);

        return CVTemplateMapper.instance.documentToDto(saved);
    }

    public SubmittedCVTemplateDocument getCvTemplateById(final String id, final boolean withMetadata) {
        Optional<SubmittedCVTemplateDocument> cvTemplateDocumentOptional = submittedCvTemplateRepository.findById(id);
        if (cvTemplateDocumentOptional.isEmpty()) {
            System.out.printf("Template with id '%s' is not found\n", id);
            throw new NoSuchTemplateException();
        }
        final SubmittedCVTemplateDocument submittedCVTemplateDocument = cvTemplateDocumentOptional.get();

        final CVTemplateDocument parentTemplate = cvTemplateService.getCvTemplateById(submittedCVTemplateDocument.getParentId(), true);
        Executor.getInstance()
                .setIterableFields(parentTemplate.getFields())
                .setMatchableFields(submittedCVTemplateDocument.getFields())
                .setSourceParent(BaseSource.ITERABLE)
                .executeLogic(
                        new MergeFieldsExecutor()
                );

        return submittedCVTemplateDocument;
    }

    public SubmittedCVTemplate edit(final SubmittedCVTemplate cvTemplate) {
        final CVTemplateDocument parentTemplate = cvTemplateService.getCvTemplateById(cvTemplate.getParentId(), true);

        final SubmittedCVTemplateDocument submittedTemplate = CVTemplateMapper.instance.dtoToDocument(cvTemplate);

        final List<FieldDocument> sections = new ArrayList<>();
        Executor.getInstance()
                .setIterableFields(parentTemplate.getFields())
                .setMatchableFields(submittedTemplate.getFields())
                .setSourceParent(BaseSource.ITERABLE)
                .executeLogic(
                        new FieldsIdValidationExecutor(),
                        new RequiredFieldValidationExecutor(),
                        new SubmittedFieldValueValidationExecutor()
                )
                .after()
                .setIterableFields(submittedTemplate.getFields())
                .executeLogic(
//                        new SectionContainerValidation(sections)
                );

        return CVTemplateMapper.instance.documentToDto(submittedCvTemplateRepository.save(submittedTemplate));
    }

    private void handleEditedTemplateParentStatus(final CVTemplateDocument parent, final CVTemplateDocument child) {
        if (!Objects.equals(parent.getName(), child.getName())) return;
        parent.getMetadata().put("status", "DELETED");
    }

}
