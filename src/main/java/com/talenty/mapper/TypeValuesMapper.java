package com.talenty.mapper;

import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.TypeValuesDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface TypeValuesMapper {

    TypeValuesMapper instance = Mappers.getMapper(TypeValuesMapper.class);

    TypeValues documentToDto(TypeValuesDocument typeValuesDocument);

    List<TypeValues> documentListToDtoList(List<TypeValuesDocument> typeValuesDocumentList);

    TypeValuesDocument dtoToDocument(TypeValues typeValues);
}
