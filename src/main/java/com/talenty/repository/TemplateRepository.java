package com.talenty.repository;

import com.talenty.domain.mongo.CVTemplateDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface TemplateRepository extends MongoRepository<CVTemplateDocument, String> {


    @Query(value = "{'system' : true}", fields = "{_id : 1, name: 1}")
    CVTemplateDocument findSystemTemplateInfo();

}
