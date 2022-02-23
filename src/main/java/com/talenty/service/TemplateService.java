package com.talenty.service;

import com.talenty.domain.dto.Template;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.logical_executors.FieldsAutoCompleteExecutor;
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
        return TemplateMapper.instance.documentToDto(getTemplateById(getSystemTemplateId()));
    }

    public String getSystemTemplateId() {
        return templateRepository.findSystemTemplateId().getId();
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
        ValidationChecker.assertTemplateIsValid(newTemplate.getFields(), parentTemplate);

        newTemplate.setId(null);
        final TemplateDocument savedNewTemplate = templateRepository.save(newTemplate);
        return TemplateMapper.instance.documentToDto(savedNewTemplate);
    }

    private void executeLogicOnTemplate(final List<FieldDocument> fields, final LogicExecutor... logicExecutors) {
        fields.forEach(field -> {
            final List<FieldDocument> fieldFields = field.getFields();
            Arrays.stream(logicExecutors).forEach(logicExecutor -> logicExecutor.execute(field));
            if (fieldFields != null) executeLogicOnTemplate(fieldFields, logicExecutors);
        });
    }

}
