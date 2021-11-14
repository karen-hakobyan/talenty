package com.talenty.repository;

import com.talenty.domain.mongo.JobSeekerDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobSeekerRepository extends MongoRepository<JobSeekerDocument, String> {
}
