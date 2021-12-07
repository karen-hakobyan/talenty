package com.talenty.repository;

import com.talenty.domain.mongo.JobAnnouncementDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface JobAnnouncementRepository extends MongoRepository<JobAnnouncementDocument, String> {

    @Query(" { 'system' : true} ")
    JobAnnouncementDocument findSystemJobAnnouncement();

}
