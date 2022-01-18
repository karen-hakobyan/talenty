package com.talenty.mapper;

import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.TypeValuesDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TypeValuesMapper {

    TypeValuesMapper instance = Mappers.getMapper(TypeValuesMapper.class);

    TypeValues documentToDto(TypeValuesDocument typeValuesDocument);

    TypeValuesDocument dtoToDocument(TypeValues typeValues);
}
