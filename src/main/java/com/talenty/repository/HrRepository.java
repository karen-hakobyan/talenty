package com.talenty.repository;

import com.talenty.domain.mongo.HrDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface HrRepository extends MongoRepository<HrDocument, String> {

    Optional<HrDocument> findByEmail(String email);

}
