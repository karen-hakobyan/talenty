package com.talenty.mapper;

import com.talenty.domain.dto.hr.HrLoginRequestDetails;
import com.talenty.domain.dto.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.hr.HrRegisterResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.domain.mongo.UserDocument;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CompanyMapper {

    CompanyMapper instance = Mappers.getMapper(CompanyMapper.class);

    CompanyDocument requestToDocument(HrRegisterRequestDetails request);

    CompanyDocument requestToDocument(HrLoginRequestDetails request);

    HrRegisterResponseDetails documentToRegisterResponse(UserDocument document);

    @Mapping(target = "name", source = "companyName")
    CompanyDocument extractCompany(HrRegisterRequestDetails details);

    UserDocument extractUser(HrRegisterRequestDetails details);

}
