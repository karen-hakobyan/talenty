package com.talenty.repository;

import com.talenty.domain.mongo.JobAnnouncementDocument;
import com.talenty.enums.JobAnnouncementStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface JobAnnouncementRepository extends MongoRepository<JobAnnouncementDocument, String> {

    @Query(value = "{'system' : true}", fields = "{}")
    JobAnnouncementDocument findSystemJobAnnouncement();

    List<JobAnnouncementDocument> findAllByStatus(JobAnnouncementStatus status);

    List<JobAnnouncementDocument> findAllByCompanyIdAndStatus(String id, JobAnnouncementStatus status);

}
