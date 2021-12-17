package com.talenty.service;

import com.talenty.domain.dto.Template;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.TemplateRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;

    public TemplateService(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public Template getSystemTemplate() {
        System.out.println("2");
        return TemplateMapper.instance.documentToDto(templateRepository.findSystemTemplate());
    }

    public void saveFilledTemplate(final Template template) {
        final Optional<TemplateDocument> templateOptional = templateRepository.findById(template.getId());
        if(templateOptional.isEmpty()) {
            //TODO exception
        }
        //TODO logic
    }

}
