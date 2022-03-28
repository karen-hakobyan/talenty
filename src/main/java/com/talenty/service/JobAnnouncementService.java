package com.talenty.service;

import com.talenty.domain.dto.JobAnnouncement;
import com.talenty.domain.mongo.JobAnnouncementDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.logical_executors.AdminValuesMergeExecutor;
import com.talenty.logical_executors.RequiredFieldValidationExecutor;
import com.talenty.logical_executors.SubmittedFieldValueValidationExecutor;
import com.talenty.logical_executors.executor.Executor;
import com.talenty.mapper.JobAnnouncementMapper;
import com.talenty.repository.JobAnnouncementRepository;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JobAnnouncementService {

    private final JobAnnouncementRepository jobAnnouncementRepository;
    private final ApplicationContext applicationContext;

    public JobAnnouncementService(final JobAnnouncementRepository jobAnnouncementRepository,
                                  final ApplicationContext applicationContext) {
        this.jobAnnouncementRepository = jobAnnouncementRepository;
        this.applicationContext = applicationContext;
    }

    public JobAnnouncement getSystemJobAnnouncement() {
        final JobAnnouncementDocument systemJobAnnouncement = jobAnnouncementRepository.findSystemJobAnnouncement();
        Executor.getInstance()
                .setChildFields(systemJobAnnouncement.getFields())
                .executeLogic(applicationContext.getBean(AdminValuesMergeExecutor.class));
        return JobAnnouncementMapper.instance.documentToDto(systemJobAnnouncement);
    }

    public JobAnnouncement publish(final JobAnnouncement jobAnnouncement) {
        final JobAnnouncementDocument document = JobAnnouncementMapper.instance.dtoToDocument(jobAnnouncement);
        final Optional<JobAnnouncementDocument> parentTemplate = jobAnnouncementRepository.findById(document.getId());

        if (parentTemplate.isEmpty()) {
            System.out.printf("No such job announcement with id '%s'\n", document.getId());
            throw new NoSuchTemplateException();
        }

        Executor.getInstance()
                .setParentFields(parentTemplate.get().getFields())
                .setChildFields(document.getFields())
                .executeLogic(
                        new RequiredFieldValidationExecutor(),
                        new SubmittedFieldValueValidationExecutor()
                );

        final JobAnnouncementDocument saved = jobAnnouncementRepository.save(document);
        saved.setId(null);
        return JobAnnouncementMapper.instance.documentToDto(saved);
    }
}
