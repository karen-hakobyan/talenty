package com.talenty.service;

import com.talenty.domain.dto.Template;
import com.talenty.domain.dto.user.AuthenticatedUser;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.exceptions.UserNotFoundException;
import com.talenty.logical_executors.AdminValuesMergeExecutor;
import com.talenty.logical_executors.CleanUpMetadataExecutor;
import com.talenty.logical_executors.FieldsAutoCompleteExecutor;
import com.talenty.logical_executors.LogicExecutor;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.HrRepository;
import com.talenty.repository.TemplateRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;
    private final ApplicationContext applicationContext;
    private final HrRepository hrRepository;

    public TemplateService(final TemplateRepository templateRepository,
                           final ApplicationContext applicationContext,
                           final HrRepository hrRepository) {
        this.templateRepository = templateRepository;
        this.applicationContext = applicationContext;
        this.hrRepository = hrRepository;
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
            System.out.printf("Template with id '%s' is not found\n", id);
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

        final HrDocument currentHr = getCurrentHr();
        currentHr.addTemplate(savedNewTemplate.getId());
        hrRepository.save(currentHr);

        return TemplateMapper.instance.documentToDto(savedNewTemplate);
    }

    public List<String> getAllTemplatesIds() {
        return getCurrentHr().getTemplatesList();
    }

    private void executeLogicOnTemplate(final List<FieldDocument> fields, final LogicExecutor... logicExecutors) {
        fields.forEach(field -> {
            final List<FieldDocument> fieldFields = field.getFields();
            Arrays.stream(logicExecutors).forEach(logicExecutor -> logicExecutor.execute(field));
            if (fieldFields != null) executeLogicOnTemplate(fieldFields, logicExecutors);
        });
    }

    private HrDocument getCurrentHr() {
        final AuthenticatedUser authenticatedUser = (AuthenticatedUser) SecurityContextHolder.getContext().getAuthentication().getCredentials();

        final String currentHrId = authenticatedUser.getId();
        final Optional<HrDocument> currentHr = hrRepository.findById(currentHrId);

        if (currentHr.isEmpty())
            throw new UserNotFoundException();

        return currentHr.get();
    }

}
