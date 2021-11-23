package com.talenty.repository;

import com.talenty.domain.mongo.TokenDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TokenRepository extends MongoRepository<TokenDocument, String> {

    Optional<TokenDocument> findByValue(String token);

}
