package com.talenty.repository;

import com.talenty.domain.mongo.SubmittedTemplateDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SubmittedTemplateRepository extends MongoRepository<SubmittedTemplateDocument, String> {
}
