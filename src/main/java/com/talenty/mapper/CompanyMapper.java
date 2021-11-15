package com.talenty.mapper;

import com.talenty.domain.dto.hr.HrRegisterRequestDetails;
import com.talenty.domain.mongo.CompanyDocument;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CompanyMapper {

    CompanyMapper instance = Mappers.getMapper(CompanyMapper.class);

    @Mapping(target = "name", source = "companyName")
    CompanyDocument extractCompanyFromRegisterRequest(HrRegisterRequestDetails details);

}
