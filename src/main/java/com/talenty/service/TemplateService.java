package com.talenty.service;

import com.talenty.domain.dto.Template;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.TemplateRepository;
import org.springframework.stereotype.Service;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;

    public TemplateService(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public Template getSystemTemplate() {
        return TemplateMapper.instance.documentToDto(templateRepository.findSystemTemplate());
    }
}
