package com.talenty.repository;

import com.talenty.domain.mongo.TokenDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface TokenRepository extends MongoRepository<TokenDocument, String> {

    @Query(value = "{'expired': false}")
    Optional<TokenDocument> findByValue(String token);

}
