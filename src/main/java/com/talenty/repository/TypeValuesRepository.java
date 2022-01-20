package com.talenty.repository;

import com.talenty.domain.mongo.TypeValuesDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface TypeValuesRepository extends MongoRepository<TypeValuesDocument, String> {

    List<TypeValuesDocument> findAll();

    @Query(value = "{}", fields = "{type : 1, _id : 0}")
    List<TypeValuesDocument> getTypes();

    TypeValuesDocument deleteByType(String type);

}
