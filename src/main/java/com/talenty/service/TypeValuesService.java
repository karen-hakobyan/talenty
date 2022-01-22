package com.talenty.service;

import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.TypeValuesDocument;
import com.talenty.exceptions.GivenTypeAlreadyExistsException;
import com.talenty.exceptions.InvalidTypeValuesLengthException;
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
        String type = typeValues.getType();
        TypeValuesDocument typeValuesDocument = typeValuesRepository.findByType(type);
        String id = typeValuesDocument.getId();
        TypeValuesDocument newTypeValuesDocument = TypeValuesMapper.instance.dtoToDocument(typeValues);
        newTypeValuesDocument.setId(id);
        return typeValuesRepository.save(newTypeValuesDocument);
    }

    public void editType(TypeValues[] typeValues ) {
        if(typeValues.length != 2) {
            throw new InvalidTypeValuesLengthException();
        }

        String type1 = typeValues[0].getType();
        String type2 = typeValues[1].getType();

        final TypeValuesDocument byType1 = typeValuesRepository.findByType(type1);
        final TypeValuesDocument byType2 = typeValuesRepository.findByType(type2);


        if (type1.equals(type2)){
            throw new GivenTypeAlreadyExistsException();
        } else if (byType1 == null && byType2 == null){
            throw new NoSuchTypeException();
        }

        if(byType1 != null && byType2 == null) {
            byType1.setType(typeValues[1].getType());
            typeValuesRepository.save(byType1);
        } else if (byType1 == null){
            byType2.setType(typeValues[0].getType());
            typeValuesRepository.save(byType2);
        }
    }
}
