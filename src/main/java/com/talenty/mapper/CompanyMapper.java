package com.talenty.mapper;

import com.talenty.domain.dto.hr.HrLoginRequestDetails;
import com.talenty.domain.dto.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.hr.HrRegisterResponseDetails;
import com.talenty.domain.dto.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.dto.jobseeker.JobSeekerRegisterResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.JobSeekerDocument;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CompanyMapper {

    CompanyMapper instance = Mappers.getMapper(CompanyMapper.class);

    CompanyDocument requestToDocument(HrRegisterRequestDetails request);

    CompanyDocument requestToDocument(HrLoginRequestDetails request);

    HrRegisterResponseDetails documentToRegisterResponse(HrDocument document);

    @Mapping(target = "name", source = "companyName")
    CompanyDocument extractCompany(HrRegisterRequestDetails details);

    HrDocument extractHr(HrRegisterRequestDetails details);

    JobSeekerDocument requestToDocument(JobSeekerRegisterRequestDetails request);

    JobSeekerRegisterResponseDetails documentToRegisterResponse (JobSeekerDocument document);

}
