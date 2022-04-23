package com.talenty.repository;

import com.talenty.domain.mongo.CVTemplateDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface CVTemplateRepository extends MongoRepository<CVTemplateDocument, String> {

    @Query(value = "{'system' : true}", fields = "{_id : 1, name: 1}")
    CVTemplateDocument findSystemTemplateInfo();

    List<CVTemplateDocument> findAllByCompanyId(String id);

    void deleteById(String id);
}
