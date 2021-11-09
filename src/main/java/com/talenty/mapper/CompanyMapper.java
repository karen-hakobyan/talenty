package com.talenty.mapper;

import com.talenty.domain.dto.CompanyRegisterRequestDetails;
import com.talenty.domain.dto.CompanyRegisterResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CompanyMapper {

    CompanyMapper instance = Mappers.getMapper(CompanyMapper.class);

    CompanyDocument requestToDocument(CompanyRegisterRequestDetails request);

    CompanyRegisterResponseDetails documentToResponse(CompanyDocument document);

}
