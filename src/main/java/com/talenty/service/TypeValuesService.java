package com.talenty.service;

import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.TypeValuesDocument;
import com.talenty.mapper.TypeValuesMapper;
import com.talenty.repository.TypeValuesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypeValuesService {

    private final TypeValuesRepository typeValuesRepository;

    public TypeValuesService(TypeValuesRepository typeValuesRepository) {
        this.typeValuesRepository = typeValuesRepository;
    }

    public Optional<TypeValuesDocument> findByType(final String type) {
        return typeValuesRepository.findByType(type);
    }


    public TypeValues getTypes() {
        return null;
    }

    public TypeValuesDocument save(final TypeValues typeValues) {
       return typeValuesRepository.save(TypeValuesMapper.instance.dtoToDocument(typeValues));
    }

    public List<TypeValuesDocument> findAll() {
        return typeValuesRepository.findAll();
    }
}
