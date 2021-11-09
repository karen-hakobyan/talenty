package com.talenty.repository;

import com.talenty.domain.mongo.CompanyDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompanyRepository extends MongoRepository <CompanyDocument, String> {

}
