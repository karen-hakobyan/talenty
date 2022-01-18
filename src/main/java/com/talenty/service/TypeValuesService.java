package com.talenty.service;

import com.talenty.domain.mongo.TypeValuesDocument;
import com.talenty.repository.TypeValuesRepository;
import org.springframework.stereotype.Service;

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


}
