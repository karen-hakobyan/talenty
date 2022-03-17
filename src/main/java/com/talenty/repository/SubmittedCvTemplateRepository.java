package com.talenty.repository;

import com.talenty.domain.mongo.SubmittedCVTemplateDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SubmittedCvTemplateRepository extends MongoRepository<SubmittedCVTemplateDocument, String> {
}
