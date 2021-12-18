package com.talenty.repository;

import com.talenty.domain.mongo.FilledTemplateDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FilledTemplateRepository extends MongoRepository<FilledTemplateDocument, String> {
}
