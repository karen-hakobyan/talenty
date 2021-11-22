package com.talenty.mapper;

import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterResponseDetails;
import com.talenty.domain.mongo.JobSeekerDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface JobSeekerMapper {

    JobSeekerMapper instance = Mappers.getMapper(JobSeekerMapper.class);

    JobSeekerDocument requestToDocument(JobSeekerRegisterRequestDetails request);

    JobSeekerRegisterResponseDetails documentToRegisterResponse(JobSeekerDocument document);

}
