package com.talenty.mapper;

import com.talenty.domain.dto.NavigationBar;
import com.talenty.domain.mongo.NavigationBarDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NavigationBarMapper {

    NavigationBarMapper instance = Mappers.getMapper(NavigationBarMapper.class);

    NavigationBar documentToDto(NavigationBarDocument navigationBarDocument);

    NavigationBarDocument dtoToDocument(NavigationBar navigationBar);

}
