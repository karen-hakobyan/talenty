package com.talenty.service;

import com.talenty.domain.dto.JobAnnouncement;
import com.talenty.domain.mongo.JobAnnouncementDocument;
import com.talenty.logical_executors.AdminValuesMergeExecutor;
import com.talenty.logical_executors.Executor;
import com.talenty.logical_executors.RequiredFieldValidationExecutor;
import com.talenty.logical_executors.SubmittedFieldValueValidationExecutor;
import com.talenty.mapper.JobAnnouncementMapper;
import com.talenty.repository.JobAnnouncementRepository;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

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
        Executor.executeLogicOnFields(
                systemJobAnnouncement.getFields(),
                applicationContext.getBean(AdminValuesMergeExecutor.class)
        );
        return JobAnnouncementMapper.instance.documentToDto(systemJobAnnouncement);
    }

    public JobAnnouncement publish(final JobAnnouncement jobAnnouncement) {
        final JobAnnouncementDocument document = JobAnnouncementMapper.instance.dtoToDocument(jobAnnouncement);
        Executor.executeLogicOnFields(
                document.getFields(),
                applicationContext.getBean(RequiredFieldValidationExecutor.class),
                applicationContext.getBean(SubmittedFieldValueValidationExecutor.class)
        );

        return null;
    }
}
