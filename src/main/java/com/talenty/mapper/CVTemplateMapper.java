package com.talenty.mapper;

import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.dto.SubmittedCVTemplate;
import com.talenty.domain.mongo.SubmittedCVTemplateDocument;
import com.talenty.domain.mongo.CVTemplateDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CVTemplateMapper {

    CVTemplateMapper instance = Mappers.getMapper(CVTemplateMapper.class);

    CVTemplateDocument dtoToDocument(CVTemplate dto);

    CVTemplate documentToDto(CVTemplateDocument document);

    SubmittedCVTemplateDocument dtoToDocument(SubmittedCVTemplate dto);

    SubmittedCVTemplate documentToDto(SubmittedCVTemplateDocument document);

    SubmittedCVTemplateDocument cvTemplateDocumentToSubmittedDocument(CVTemplateDocument document);

}