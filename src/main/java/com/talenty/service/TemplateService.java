package com.talenty.service;

import com.talenty.domain.dto.Template;
import com.talenty.domain.mongo.FilledTemplateDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.TemplateRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TemplateService {

    private final FilledTemplateService filledTemplateService;
    private final TemplateRepository templateRepository;

    public TemplateService(final FilledTemplateService filledTemplateService, final TemplateRepository templateRepository) {
        this.filledTemplateService = filledTemplateService;
        this.templateRepository = templateRepository;
    }

    public Template getSystemTemplate() {
        return TemplateMapper.instance.documentToDto(templateRepository.findSystemTemplate());
    }

    public void saveFilledTemplate(final Template template) {
        final Optional<TemplateDocument> parentTemplateOptional = templateRepository.findById(template.getId());
        final TemplateDocument filledTemplate = TemplateMapper.instance.dtoToTemplate(template);

        if (parentTemplateOptional.isEmpty()) {
            //TODO exception
            return;
        }
        //TODO logic

        final FilledTemplateDocument newFilledTemplate = filledTemplateService.build(filledTemplate, parentTemplateOptional.get());
//        filledTemplateService.save(newFilledTemplate);
    }


}
