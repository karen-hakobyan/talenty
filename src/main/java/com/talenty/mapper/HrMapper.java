package com.talenty.mapper;

import com.talenty.domain.dto.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.hr.HrRegisterResponseDetails;
import com.talenty.domain.mongo.HrDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HrMapper {

    HrMapper instance = Mappers.getMapper(HrMapper.class);

    HrRegisterResponseDetails documentToRegisterResponse(HrDocument document);

    HrDocument extractHrFromRegisterRequest(HrRegisterRequestDetails details);

}
