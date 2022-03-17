package com.talenty.mapper;

import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.mongo.SubmittedCVTemplateDocument;
import com.talenty.domain.mongo.CVTemplateDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CVTemplateMapper {

    CVTemplateMapper instance = Mappers.getMapper(CVTemplateMapper.class);

    CVTemplate documentToDto(CVTemplateDocument document);

    CVTemplateDocument dtoToTemplate(CVTemplate cvTemplate);

    SubmittedCVTemplateDocument cvTemplateToSubmittedTemplate(CVTemplateDocument cvTemplate);

}
