package com.talenty.repository;

import com.talenty.domain.mongo.TemplateDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface TemplateRepository extends MongoRepository<TemplateDocument, String> {


    @Query(value = "{'system' : true}", fields = "{_id : 1, name: 1}")
    TemplateDocument findSystemTemplateInfo();

}
