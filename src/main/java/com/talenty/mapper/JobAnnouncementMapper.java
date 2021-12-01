package com.talenty.mapper;

import com.talenty.domain.dto.JobAnnouncement;
import com.talenty.domain.mongo.JobAnnouncementDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface JobAnnouncementMapper {

    JobAnnouncementMapper instance = Mappers.getMapper(JobAnnouncementMapper.class)

    JobAnnouncement documentToDto(JobAnnouncementDocument document);

}
