package com.talenty.service;

import com.talenty.domain.dto.Template;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.TemplateRepository;
import com.talenty.logical_executors.AdminValuesMergeExecutor;
import com.talenty.logical_executors.CleanUpMetadataExecutor;
import com.talenty.logical_executors.LogicExecutor;
import com.talenty.validation.ValidationChecker;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;
    private final ApplicationContext applicationContext;

    public TemplateService(final TemplateRepository templateRepository, final ApplicationContext applicationContext) {
        this.templateRepository = templateRepository;
        this.applicationContext = applicationContext;
    }

    public Template getSystemTemplate() {
        final TemplateDocument systemTemplate = templateRepository.findSystemTemplateId();
        return TemplateMapper.instance.documentToDto(getTemplateById(systemTemplate.getId()));
    }

    public TemplateDocument getTemplateById(final String id) {
        final Optional<TemplateDocument> templateDocumentOptional = templateRepository.findById(id);
        if (templateDocumentOptional.isEmpty()) {
            System.out.printf("Template with id: %s is not found\n", id);
            throw new NoSuchTemplateException();
        }
        final TemplateDocument templateDocument = templateDocumentOptional.get();

        executeLogicOnTemplate(
                templateDocument.getFields(),
                applicationContext.getBean(AdminValuesMergeExecutor.class),
                applicationContext.getBean(CleanUpMetadataExecutor.class)
        );

        return templateDocument;
    }


    public Template createNewTemplate(final Template template) {
        final TemplateDocument parentTemplate = getTemplateById(template.getId());
        final TemplateDocument newTemplate = TemplateMapper.instance.dtoToTemplate(template);
        assertNewTemplateIsValid(newTemplate, parentTemplate);
        return null;
    }

    private void assertNewTemplateIsValid(final TemplateDocument newTemplate, final TemplateDocument parentTemplate) {
        ValidationChecker.asserTemplateSectionsNamesAreUnique(newTemplate);
        for (final FieldDocument section : newTemplate.getFields()) {
            ValidationChecker.assertTemplateSectionIsValid(section, parentTemplate);
        }
    }

    private void executeLogicOnTemplate(final List<FieldDocument> fields, final LogicExecutor... logicExecutors) {
        fields.forEach(field -> {
            final List<FieldDocument> fieldFields = field.getFields();
            Arrays.stream(logicExecutors).forEach(logicExecutor -> logicExecutor.execute(field));
            if (fieldFields != null) executeLogicOnTemplate(fieldFields, logicExecutors);
        });
    }

}
