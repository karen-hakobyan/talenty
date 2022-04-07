package com.talenty.service;

import com.talenty.domain.dto.JobAnnouncement;
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

    public JobAnnouncementService(final JobAnnouncementRepository jobAnnouncementRepository, final ApplicationContext applicationContext) {
        this.jobAnnouncementRepository = jobAnnouncementRepository;
        this.applicationContext = applicationContext;
    }

    public JobAnnouncement getSystemJobAnnouncement() {
        final JobAnnouncementDocument systemJobAnnouncement = jobAnnouncementRepository.findSystemJobAnnouncement();
        Executor.getInstance().setChildFields(systemJobAnnouncement.getFields()).executeLogic(applicationContext.getBean(AdminValuesMergeExecutor.class));
        return JobAnnouncementMapper.instance.documentToDto(systemJobAnnouncement);
    }

    public JobAnnouncement publish(final JobAnnouncement jobAnnouncement) {
        final JobAnnouncementDocument document = JobAnnouncementMapper.instance.dtoToDocument(jobAnnouncement);
        final Optional<JobAnnouncementDocument> parentTemplateOptional = jobAnnouncementRepository.findById(document.getId());

        if (parentTemplateOptional.isEmpty()) {
            System.out.printf("No such job announcement with id '%s'\n", document.getId());
            throw new NoSuchAnnouncementException();
        }

        final JobAnnouncementDocument parentTemplate = parentTemplateOptional.get();
        Executor.getInstance()
                .setParentFields(parentTemplate.getFields())
                .setChildFields(document.getFields())
                .executeLogic(
                        new RequiredFieldValidationExecutor(),
                        new SubmittedFieldValueValidationExecutor()
                );

        document.setId(null);
        document.setParentId(parentTemplate.getId());
        document.setStatus(JobAnnouncementStatus.PENDING);
        final JobAnnouncementDocument saved = jobAnnouncementRepository.save(document);
        return JobAnnouncementMapper.instance.documentToDto(saved);
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

    public JobAnnouncement approveAnnouncement(final String id) {
        final JobAnnouncementDocument document = changeAnnouncementStatus(id, JobAnnouncementStatus.CONFIRMED);
        return JobAnnouncementMapper.instance.documentToDto(jobAnnouncementRepository.save(document));
    }

    public JobAnnouncement rejectAnnouncement(final String id) {
        final JobAnnouncementDocument document = changeAnnouncementStatus(id, JobAnnouncementStatus.REJECTED);
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

}
