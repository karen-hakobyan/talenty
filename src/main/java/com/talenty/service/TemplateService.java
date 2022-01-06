package com.talenty.service;

import com.talenty.domain.dto.Template;
import com.talenty.domain.mongo.SubmittedTemplateDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.TemplateRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;

    public TemplateService(final TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public Template getSystemTemplate() {
        return TemplateMapper.instance.documentToDto(templateRepository.findSystemTemplate());
    }

}
