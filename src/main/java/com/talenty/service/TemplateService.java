package com.talenty.service;

import com.talenty.domain.dto.Template;
import com.talenty.domain.entity.TemplateEntity;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.TemplateRepository;
import org.springframework.stereotype.Service;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;

    public TemplateService(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public Template getTemplateById(int id) {
        TemplateEntity templateEntity = templateRepository
                .findById(id)
                .orElseThrow(IllegalArgumentException::new);

        return TemplateMapper.instance.templateEntityToDto(templateEntity);
    }

}
