package com.talenty.repository;

import com.talenty.domain.mongo.JobAnnouncementDocument;
import com.talenty.enums.JobAnnouncementStatus;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface JobAnnouncementRepository extends MongoRepository<JobAnnouncementDocument, String> {

    @Query(value = "{'system' : true}", fields = "{}")
    JobAnnouncementDocument findSystemJobAnnouncement();

    List<JobAnnouncementDocument> findAllByStatus(JobAnnouncementStatus status);

    List<JobAnnouncementDocument> findAllByCompanyIdAndStatus(String id, JobAnnouncementStatus status);

    Long countByStatus(JobAnnouncementStatus status);


    @Query(value = "{" +
            "    $and: [" +
            "        {" +
            "            'fields': {" +
            "                $elemMatch: {" +
            "                    'fields': {" +
            "                        $elemMatch: {" +
            "                            'fields': {" +
            "                                $elemMatch: {" +
            "                                    'metadata.type': 'employment_terms'," +
            "                                    'metadata.submitted_value': {$in: ?1}" +
            "                                }" +
            "                            }" +
            "                        }" +
            "                    }" +
            "                }" +
            "            }," +
            "            'status': ?0" +
            "        }," +
            "        {" +
            "            'fields': {" +
            "                $elemMatch: {" +
            "                    'fields': {" +
            "                        $elemMatch: {" +
            "                            'fields': {" +
            "                                $elemMatch: {" +
            "                                    'metadata.type': 'job_type'," +
            "                                    'metadata.submitted_value': {$in: ?2}" +
            "                                }" +
            "                            }" +
            "                        }" +
            "                    }" +
            "                }" +
            "            }," +
            "            'status': ?0" +
            "        }," +
            "        {" +
            "            'fields': {" +
            "                $elemMatch: {" +
            "                    'fields': {" +
            "                        $elemMatch: {" +
            "                            'fields': {" +
            "                                $elemMatch: {" +
            "                                    'metadata.type': 'job_category'," +
            "                                    'metadata.submitted_value': {$in: ?3}" +
            "                                }" +
            "                            }" +
            "                        }" +
            "                    }" +
            "                }" +
            "            }," +
            "            'status': ?0" +
            "        }," +
            "        {" +
            "            'fields': {" +
            "                $elemMatch: {" +
            "                    'fields': {" +
            "                        $elemMatch: {" +
            "                            'fields': {" +
            "                                $elemMatch: {" +
            "                                    'metadata.type': 'candidate_level'," +
            "                                    'metadata.submitted_value': {$in: ?4}" +
            "                                }" +
            "                            }" +
            "                        }" +
            "                    }" +
            "                }" +
            "            }," +
            "            'status': ?0" +
            "        }," +
            "        {" +
            "            'fields': {" +
            "                $elemMatch: {" +
            "                    'fields': {" +
            "                        $elemMatch: {" +
            "                            'fields': {" +
            "                                $elemMatch: {" +
            "                                    'metadata.type': 'country'," +
            "                                    'metadata.submitted_value': {$in: ?5}" +
            "                                }" +
            "                            }" +
            "                        }" +
            "                    }" +
            "                }" +
            "            }," +
            "            'status': ?0" +
            "        }," +
            "        {" +
            "           $text: { $search: ?6 }" +
            "         }," +
            "           {" +
            "           'status': ?0" +
            "          }" +
            "    ]" +
            "}")
    List<JobAnnouncementDocument> findAllByStatusAndFilters(
            JobAnnouncementStatus status,
            List<String> employmentTerms,
            List<String> jobType,
            List<String> jobCategory,
            List<String> candidateLevel,
            List<String> location,
            String search,
            PageRequest pageRequest
    );

}
