package com.talenty.repository;

import com.talenty.domain.mongo.TokenDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TokenRepository extends MongoRepository<TokenDocument, String> {
}
