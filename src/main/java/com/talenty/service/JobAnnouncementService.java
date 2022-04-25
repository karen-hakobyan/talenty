package com.talenty.service;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.talenty.domain.dto.JobAnnouncement;
import com.talenty.domain.mongo.CurrentJobDocument;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.JobAnnouncementDocument;
import com.talenty.enums.JobAnnouncementStatus;
import com.talenty.exceptions.NoSuchAnnouncementException;
import com.talenty.logical_executors.AdminValuesMergeExecutor;
import com.talenty.logical_executors.RequiredFieldValidationExecutor;
import com.talenty.logical_executors.SubmittedFieldValueValidationExecutor;
import com.talenty.logical_executors.executor.Executor;
import com.talenty.mapper.JobAnnouncementMapper;
import com.talenty.repository.JobAnnouncementRepository;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobAnnouncementService {

    private final JobAnnouncementRepository jobAnnouncementRepository;
    private final ApplicationContext applicationContext;
    private final HrService hrService;


    public JobAnnouncementService(final JobAnnouncementRepository jobAnnouncementRepository,
                                  final ApplicationContext applicationContext,
                                  final HrService hrService) {
        this.jobAnnouncementRepository = jobAnnouncementRepository;
        this.applicationContext = applicationContext;
        this.hrService = hrService;
    }

    public JobAnnouncement getSystemJobAnnouncement() {
        final JobAnnouncementDocument systemJobAnnouncement = jobAnnouncementRepository.findSystemJobAnnouncement();
        Executor.getInstance()
                .setChildFields(systemJobAnnouncement.getFields())
                .executeLogic(
                        applicationContext.getBean(AdminValuesMergeExecutor.class)
                );
        return JobAnnouncementMapper.instance.documentToDto(systemJobAnnouncement);
    }

    public JobAnnouncement publish(final JobAnnouncement jobAnnouncement) {
        final JobAnnouncementDocument newAnnouncement = JobAnnouncementMapper.instance.dtoToDocument(jobAnnouncement);
        final Optional<JobAnnouncementDocument> parentTemplateOptional = findById(newAnnouncement.getId());

        if (parentTemplateOptional.isEmpty()) {
            System.out.printf("No such job announcement with id '%s'\n", newAnnouncement.getId());
            throw new NoSuchAnnouncementException();
        }

        final JobAnnouncementDocument parentTemplate = parentTemplateOptional.get();

        Executor.getInstance()
                .setParentFields(parentTemplate.getFields())
                .setChildFields(newAnnouncement.getFields())
                .executeLogic(
                        new RequiredFieldValidationExecutor(),
                        new SubmittedFieldValueValidationExecutor()
                );

        final HrDocument currentHr = hrService.getCurrentHr();
        newAnnouncement.setId(null);
        newAnnouncement.setParentId(parentTemplate.getId());
        newAnnouncement.setStatus(JobAnnouncementStatus.PENDING);
        newAnnouncement.setOwnerId(currentHr.getId());
        newAnnouncement.setCompanyId(currentHr.getCompanyId());
        final JobAnnouncementDocument savedNewAnnouncement = jobAnnouncementRepository.save(newAnnouncement);

        final BasicDBObject jobAnnouncementInHr = new BasicDBObject();
        jobAnnouncementInHr.append("id", savedNewAnnouncement.getId());
        jobAnnouncementInHr.append("name", savedNewAnnouncement.getName());
        jobAnnouncementInHr.append("status", savedNewAnnouncement.getStatus());
        BasicDBList jobAnnouncementList = currentHr.getJobAnnouncements();
        if (jobAnnouncementList == null) jobAnnouncementList = new BasicDBList();
        jobAnnouncementList.add(jobAnnouncementInHr);
        hrService.save(currentHr);

        return JobAnnouncementMapper.instance.documentToDto(savedNewAnnouncement);
    }

    public List<JobAnnouncement> findAllPending() {
        final List<JobAnnouncement> result = new ArrayList<>();
        final List<JobAnnouncementDocument> allByStatus = jobAnnouncementRepository.findAllByStatus(JobAnnouncementStatus.PENDING);
        allByStatus.forEach(e -> {
            e.setFields(null);
            result.add(JobAnnouncementMapper.instance.documentToDto(e));
        });
        return result;
    }

    public Optional<JobAnnouncementDocument> findById(final String id) {
        final Optional<JobAnnouncementDocument> announcement = jobAnnouncementRepository.findById(id);
        if (announcement.isEmpty()) {
            return Optional.empty();
        }
        final JobAnnouncementDocument jobAnnouncementDocument = announcement.get();
        Executor.getInstance()
                .setChildFields(jobAnnouncementDocument.getFields())
                .executeLogic(
                        applicationContext.getBean(AdminValuesMergeExecutor.class)
                );
        return Optional.of(jobAnnouncementDocument);
    }

    public JobAnnouncement approveAnnouncement(final String id) {
        final JobAnnouncementDocument document = changeAnnouncementStatus(id, JobAnnouncementStatus.CONFIRMED);
        hrService.updateAnnouncementStatus(document);
        return JobAnnouncementMapper.instance.documentToDto(jobAnnouncementRepository.save(document));
    }

    public JobAnnouncement rejectAnnouncement(final String id) {
        final JobAnnouncementDocument document = changeAnnouncementStatus(id, JobAnnouncementStatus.REJECTED);
        hrService.updateAnnouncementStatus(document);
        return JobAnnouncementMapper.instance.documentToDto(jobAnnouncementRepository.save(document));
    }

    private JobAnnouncementDocument changeAnnouncementStatus(final String id, final JobAnnouncementStatus status) {
        final Optional<JobAnnouncementDocument> byId = jobAnnouncementRepository.findById(id);
        if (byId.isEmpty()) {
            System.out.printf("announcement with id '%s' does not exist\n", id);
            throw new NoSuchAnnouncementException();
        }
        final JobAnnouncementDocument jobAnnouncementDocument = byId.get();
        jobAnnouncementDocument.setStatus(status);
        return jobAnnouncementDocument;
    }

    public CurrentJobDocument getAllConfirmedJobAnnouncements() {
        final HrDocument currentHr = hrService.getCurrentHr();
        final String companyId = currentHr.getCompanyId();
        final List<JobAnnouncementDocument> allByCompanyId = jobAnnouncementRepository.findAllByCompanyIdAndStatus(companyId, JobAnnouncementStatus.CONFIRMED);


        //TODO Add deadline and Country
//        allByCompanyId.forEach(e -> {
//            e.setFields(null);
//            currentHr.setJobAnnouncementsInfo(e.getId(), e.getName(),);
//        });

//        return currentHr.getJobAnnouncementsInfo();
        return null;
    }
}
