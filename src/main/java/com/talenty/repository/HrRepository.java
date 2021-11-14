package com.talenty.repository;

import com.talenty.domain.mongo.HrDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HrRepository extends MongoRepository<HrDocument, String> {
}
