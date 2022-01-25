package com.talenty.repository;

import com.talenty.domain.mongo.TemplateDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface TemplateRepository extends MongoRepository<TemplateDocument, String> {

    @Query("{ 'system' : true}")
    TemplateDocument findSystemTemplate();
}
