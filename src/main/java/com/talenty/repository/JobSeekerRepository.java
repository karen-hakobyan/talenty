package com.talenty.repository;

import com.talenty.domain.mongo.JobSeekerDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface JobSeekerRepository extends MongoRepository<JobSeekerDocument, String> {

    Optional<JobSeekerDocument> findByEmail(String email);

}
