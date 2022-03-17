package com.talenty.mapper;

import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.mongo.SubmittedTemplateDocument;
import com.talenty.domain.mongo.CVTemplateDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TemplateMapper {

    TemplateMapper instance = Mappers.getMapper(TemplateMapper.class);

    CVTemplate documentToDto(CVTemplateDocument document);

    CVTemplateDocument dtoToTemplate(CVTemplate cvTemplate);

    SubmittedTemplateDocument templateTopSubmittedTemplate(CVTemplateDocument template);

}
