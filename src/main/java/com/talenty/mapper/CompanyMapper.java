package com.talenty.mapper;

import com.talenty.domain.dto.CompanyLoginRequestDetails;
import com.talenty.domain.dto.CompanyLoginResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CompanyMapper {

    CompanyMapper instance = Mappers.getMapper(CompanyMapper.class);

    CompanyDocument requestToDocument(CompanyLoginRequestDetails request);

    CompanyLoginResponseDetails documentToResponse(CompanyDocument document);


}
