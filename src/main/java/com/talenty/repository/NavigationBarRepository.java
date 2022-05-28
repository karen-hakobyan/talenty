package com.talenty.repository;

import com.talenty.domain.mongo.NavigationBarDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface NavigationBarRepository extends MongoRepository<NavigationBarDocument, String> {

    @Query(value = "{'system' : true}", fields = "{}")
    NavigationBarDocument findSystemNavigationBar();

}
