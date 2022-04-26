package com.talenty.repository;

import com.talenty.domain.mongo.AppliedAnnouncemetDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppliedAnnouncementRepository extends MongoRepository<AppliedAnnouncemetDocument, String> {
}
