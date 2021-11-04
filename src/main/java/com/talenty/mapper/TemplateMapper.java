package com.talenty.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TemplateMapper {

    TemplateMapper instance = Mappers.getMapper(TemplateMapper.class);

}
