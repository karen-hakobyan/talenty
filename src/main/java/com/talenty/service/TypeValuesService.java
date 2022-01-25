package com.talenty.service;

import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.TypeValuesDocument;
import com.talenty.exceptions.GivenTypeAlreadyExistsException;
import com.talenty.exceptions.InvalidTypeValuesLengthException;
import com.talenty.exceptions.NoSuchTypeException;
import com.talenty.mapper.TypeValuesMapper;
import com.talenty.repository.TypeValuesRepository;
import org.springframework.stereotype.Service;

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
        return TypeValuesMapper.instance.documentListToDtoList(typeValuesRepository.findAll());
    }

    public String delete(final TypeValues typeValues) {
        final String type = typeValues.getType();
        final TypeValuesDocument typeValuesDocument = typeValuesRepository.deleteByType(type);
        if (typeValuesDocument == null) throw new NoSuchTypeException();
        return type;
    }

    public TypeValuesDocument editValues(final TypeValues typeValues) {
        final TypeValuesDocument typeValuesDocument = typeValuesRepository.findByType(typeValues.getType());

        final TypeValuesDocument newTypeValuesDocument = TypeValuesMapper.instance.dtoToDocument(typeValues);
        newTypeValuesDocument.setId(typeValuesDocument.getId());

        return typeValuesRepository.save(newTypeValuesDocument);
    }

    public void editType(final TypeValues[] typeValues) {
        if (typeValues.length != 2) {
            throw new InvalidTypeValuesLengthException();
        }

        final String type1 = typeValues[0].getType();
        final String type2 = typeValues[1].getType();

        final TypeValuesDocument byType1 = typeValuesRepository.findByType(type1);
        final TypeValuesDocument byType2 = typeValuesRepository.findByType(type2);

        if (byType1 != null && byType2 != null) {
            throw new GivenTypeAlreadyExistsException();
        } else if (byType1 == null && byType2 == null) {
            throw new NoSuchTypeException();
        }

        if (byType1 == null) { // change 2nd type name with 1st
            byType2.setType(type1);
            typeValuesRepository.save(byType2);
        } else { // change 1st type name with 2nd
            byType1.setType(type2);
            typeValuesRepository.save(byType1);
        }

    }

}
