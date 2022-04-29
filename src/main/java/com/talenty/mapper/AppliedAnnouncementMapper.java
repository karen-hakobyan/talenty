package com.talenty.mapper;

import com.talenty.domain.dto.AppliedAnnouncement;
import com.talenty.domain.mongo.AppliedAnnouncemetDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AppliedAnnouncementMapper {

    AppliedAnnouncementMapper instance = Mappers.getMapper(AppliedAnnouncementMapper.class);

    AppliedAnnouncemetDocument dtoToDocument(AppliedAnnouncement dto);

    AppliedAnnouncement documentToDto(AppliedAnnouncemetDocument document);

}
