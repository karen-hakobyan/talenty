package com.talenty.mapper;

import com.talenty.domain.dto.user.UserLoginResponseDetails;
import com.talenty.domain.mongo.UserDocument;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper instance = Mappers.getMapper(UserMapper.class);

    UserLoginResponseDetails documentToLoginResponse(UserDocument document);
}
