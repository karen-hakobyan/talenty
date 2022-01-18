package com.talenty.repository;

import com.talenty.domain.mongo.TypeValuesDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface TypeValuesRepository extends MongoRepository<TypeValuesDocument, String> {

    Optional<TypeValuesDocument> findByType(String type);
    List<TypeValuesDocument> findAll();
}
