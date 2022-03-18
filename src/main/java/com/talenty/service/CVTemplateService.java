package com.talenty.service;

import com.mongodb.BasicDBObject;
import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.logical_executors.AdminValuesMergeExecutor;
import com.talenty.logical_executors.CleanUpMetadataExecutor;
import com.talenty.logical_executors.Executor;
import com.talenty.logical_executors.FieldsAutoCompleteExecutor;
import com.talenty.mapper.CVTemplateMapper;
import com.talenty.repository.CVTemplateRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CVTemplateService {

    private final CVTemplateRepository cvTemplateRepository;
    private final ApplicationContext applicationContext;
    private final HrService hrService;

    public CVTemplateService(final CVTemplateRepository cvTemplateRepository,
                             final ApplicationContext applicationContext,
                             final HrService hrService) {
        this.cvTemplateRepository = cvTemplateRepository;
        this.applicationContext = applicationContext;
        this.hrService = hrService;
    }

    public CVTemplate getSystemCvTemplate() {
        return CVTemplateMapper.instance.documentToDto(getCvTemplateById(getSystemCvTemplateId()));
    }

    public String getSystemCvTemplateId() {
        return cvTemplateRepository.findSystemTemplateInfo().getId();
    }

    public CVTemplateDocument getCvTemplateById(final String id) {
        final Optional<CVTemplateDocument> cvTemplateDocumentOptional = cvTemplateRepository.findById(id);
        if (cvTemplateDocumentOptional.isEmpty()) {
            System.out.printf("Template with id '%s' is not found\n", id);
            throw new NoSuchTemplateException();
        }
        final CVTemplateDocument cvTemplateDocument = cvTemplateDocumentOptional.get();

        Executor.executeLogicOnFields(
                cvTemplateDocument.getFields(),
                applicationContext.getBean(FieldsAutoCompleteExecutor.class),
                applicationContext.getBean(AdminValuesMergeExecutor.class),
                applicationContext.getBean(CleanUpMetadataExecutor.class)
        );

        return cvTemplateDocument;
    }

    public CVTemplate createNewCvTemplate(final CVTemplate cvTemplate) {
        final CVTemplateDocument parentTemplate = getCvTemplateById(cvTemplate.getId());
        final CVTemplateDocument newTemplate = CVTemplateMapper.instance.dtoToTemplate(cvTemplate);

        ValidationChecker.assertCvTemplateSectionsNamesAreUnique(newTemplate);
        // TODO change method with logical executor
        ValidationChecker.assertCvTemplateIsValid(newTemplate.getFields(), parentTemplate);

        Executor.executeLogicOnFields(
                newTemplate.getFields()
        );


        newTemplate.setId(null);
        final CVTemplateDocument savedNewTemplate = cvTemplateRepository.save(newTemplate);

        final HrDocument currentHr = hrService.getCurrentHr();
        currentHr.addCvTemplate(savedNewTemplate.getId(), cvTemplate.getName());
        hrService.save(currentHr);

        return CVTemplateMapper.instance.documentToDto(savedNewTemplate);
    }

    public BasicDBObject getAllCvTemplates() {
        return hrService.getCurrentHr().getCvTemplates();
    }

}
