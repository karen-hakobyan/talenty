package com.talenty.service;

import com.mongodb.BasicDBObject;
import com.talenty.domain.dto.Template;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.logical_executors.AdminValuesMergeExecutor;
import com.talenty.logical_executors.CleanUpMetadataExecutor;
import com.talenty.logical_executors.Executor;
import com.talenty.logical_executors.FieldsAutoCompleteExecutor;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.TemplateRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;
    private final ApplicationContext applicationContext;
    private final HrService hrService;

    public TemplateService(final TemplateRepository templateRepository,
                           final ApplicationContext applicationContext,
                           final HrService hrService) {
        this.templateRepository = templateRepository;
        this.applicationContext = applicationContext;
        this.hrService = hrService;
    }

    public Template getSystemTemplate() {
        return TemplateMapper.instance.documentToDto(getTemplateById(getSystemTemplateId()));
    }

    public String getSystemTemplateId() {
        return templateRepository.findSystemTemplateInfo().getId();
    }

    public TemplateDocument getTemplateById(final String id) {
        final Optional<TemplateDocument> templateDocumentOptional = templateRepository.findById(id);
        if (templateDocumentOptional.isEmpty()) {
            System.out.printf("Template with id '%s' is not found\n", id);
            throw new NoSuchTemplateException();
        }
        final TemplateDocument templateDocument = templateDocumentOptional.get();

        Executor.executeLogicOnFields(
                templateDocument.getFields(),
                applicationContext.getBean(FieldsAutoCompleteExecutor.class),
                applicationContext.getBean(AdminValuesMergeExecutor.class),
                applicationContext.getBean(CleanUpMetadataExecutor.class)
        );

        return templateDocument;
    }

    public Template createNewTemplate(final Template template) {
        final TemplateDocument parentTemplate = getTemplateById(template.getId());
        final TemplateDocument newTemplate = TemplateMapper.instance.dtoToTemplate(template);

        ValidationChecker.assertTemplateSectionsNamesAreUnique(newTemplate);
        // TODO change method with logical executor
        ValidationChecker.assertTemplateIsValid(newTemplate.getFields(), parentTemplate);

        Executor.executeLogicOnFields(
                newTemplate.getFields()
        );


        newTemplate.setId(null);
        final TemplateDocument savedNewTemplate = templateRepository.save(newTemplate);

        final HrDocument currentHr = hrService.getCurrentHr();
        currentHr.addTemplate(savedNewTemplate.getId(), template.getName());
        hrService.save(currentHr);

        return TemplateMapper.instance.documentToDto(savedNewTemplate);
    }

    public BasicDBObject getAllTemplates() {
        return hrService.getCurrentHr().getTemplates();
    }

}
