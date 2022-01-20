package com.talenty.service;

import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.TypeValuesDocument;
import com.talenty.exceptions.NoSuchTypeException;
import com.talenty.mapper.TypeValuesMapper;
import com.talenty.repository.TypeValuesRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TypeValuesService {

    private final TypeValuesRepository typeValuesRepository;

    public TypeValuesService(TypeValuesRepository typeValuesRepository) {
        this.typeValuesRepository = typeValuesRepository;
    }


    public List<TypeValuesDocument> getTypes() {
        return typeValuesRepository.getTypes();
    }

    public TypeValuesDocument save(final TypeValues typeValues) {
        return typeValuesRepository.save(TypeValuesMapper.instance.dtoToDocument(typeValues));
    }

    public List<TypeValues> getTypesWithValues() {
        final List<TypeValues> result = new ArrayList<>();
        List<TypeValuesDocument> list = typeValuesRepository.findAll();
        for (TypeValuesDocument typeValuesDocument : list) {
            result.add(TypeValuesMapper.instance.documentToDto(typeValuesDocument));
        }

        return result;
    }

    public String delete(TypeValues typeValues) {
        String type = typeValues.getType();
        TypeValuesDocument typeValuesDocument = typeValuesRepository.deleteByType(type);
        if (typeValuesDocument == null) {
            throw new NoSuchTypeException();
        }
        return type;
    }

    public TypeValuesDocument editValues(TypeValues typeValues) {
        return null;
    }
}
