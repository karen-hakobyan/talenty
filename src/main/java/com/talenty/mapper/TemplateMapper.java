package com.talenty.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.talenty.domain.dto.Field;
import com.talenty.domain.dto.Template;
import com.talenty.domain.entity.FieldEntity;
import com.talenty.domain.entity.TemplateEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.HashMap;
import java.util.Map;

@Mapper
public interface TemplateMapper {

    TemplateMapper instance = Mappers.getMapper(TemplateMapper.class);
    ObjectMapper objectMapper = new ObjectMapper();

    @Named("fieldDetailsToMap")
    static Map<String, Object> fieldDetailsToMap(String field) throws JsonProcessingException {
        TypeReference<HashMap<String, Object>> typeRef = new TypeReference<>() {
        };
        return objectMapper.readValue(field, typeRef);
    }

    Template templateEntityToDto(TemplateEntity entity);

    @Mapping(source = "details", target = "details", qualifiedByName = "fieldDetailsToMap")
    Field fieldEntityToDto(FieldEntity entity);
}
