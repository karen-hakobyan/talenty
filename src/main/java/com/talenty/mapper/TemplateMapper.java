package com.talenty.mapper;

import com.talenty.domain.dto.Template;
import com.talenty.domain.mongo.SubmittedTemplateDocument;
import com.talenty.domain.mongo.TemplateDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TemplateMapper {

    TemplateMapper instance = Mappers.getMapper(TemplateMapper.class);

    Template documentToDto(TemplateDocument document);

    TemplateDocument dtoToTemplate(Template template);

    SubmittedTemplateDocument templateTopSubmittedTemplate(TemplateDocument template);

}
