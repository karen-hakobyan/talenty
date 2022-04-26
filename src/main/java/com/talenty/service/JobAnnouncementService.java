package com.talenty.service;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.talenty.domain.dto.JobAnnouncement;
import com.talenty.domain.dto.JobAnnouncementBasicInfo;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.JobAnnouncementDocument;
import com.talenty.enums.JobAnnouncementStatus;
import com.talenty.exceptions.NoSuchAnnouncementException;
import com.talenty.logical_executors.AdminValuesMergeExecutor;
import com.talenty.logical_executors.MakeBasicJobAnnouncementInformationExecutor;
import com.talenty.logical_executors.RequiredFieldValidationExecutor;
import com.talenty.logical_executors.SubmittedFieldValueValidationExecutor;
import com.talenty.logical_executors.executor.Executor;
import com.talenty.mapper.JobAnnouncementMapper;
import com.talenty.repository.JobAnnouncementRepository;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.*;

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
        final Map<String, Object> parentMetadata = parentTemplate.getMetadata();
        final HashMap<String, Object> newMetadata = new HashMap<>();
        if (parentMetadata != null && !parentMetadata.isEmpty()) newMetadata.putAll(parentMetadata);
        newMetadata.put("editable", false);
        newAnnouncement.setMetadata(newMetadata);
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

//    public List<JobAnnouncementBasicInfo> findAllPendings() {
//        final List<JobAnnouncementBasicInfo> result = new ArrayList<>();
//        final List<JobAnnouncementDocument> allByStatus = jobAnnouncementRepository.findAllByStatus(JobAnnouncementStatus.PENDING);
//        allByStatus.forEach(e -> result.add(makeBasicInfo(e)));
//        return result;
//    }

    public List<JobAnnouncementBasicInfo> findAllPendings() {
        final List<JobAnnouncementBasicInfo> result = new ArrayList<>();
        final List<JobAnnouncementDocument> allByStatus = jobAnnouncementRepository.findAllByStatus(JobAnnouncementStatus.PENDING);
        allByStatus.forEach(e -> {
            final JobAnnouncementBasicInfo temp = new JobAnnouncementBasicInfo();
            temp.setName(e.getName());
            temp.setId(e.getId());
            result.add(temp);
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
        final Map<String, Object> metadata = document.getMetadata();
        final Map<String, Object> newMetadata = new HashMap<>();
        if (metadata != null && !metadata.isEmpty()) newMetadata.putAll(metadata);
        newMetadata.put("editable", true);
        document.setMetadata(newMetadata);
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

    public List<JobAnnouncementBasicInfo> getAllJobAnnouncementsByStatus(final JobAnnouncementStatus status) {
        final HrDocument currentHr = hrService.getCurrentHr();
        final String companyId = currentHr.getCompanyId();
        final List<JobAnnouncementDocument> allByCompanyId = jobAnnouncementRepository.findAllByCompanyIdAndStatus(companyId, status);
        final List<JobAnnouncementBasicInfo> result = new ArrayList<>();

        //TODO temporary solution getting info from sections
        for (final JobAnnouncementDocument jobAnnouncementDocument : allByCompanyId) {
            final JobAnnouncementBasicInfo temp = makeBasicInfo(jobAnnouncementDocument);
            result.add(temp);
        }
        return result;
    }

    private JobAnnouncementBasicInfo makeBasicInfo(final JobAnnouncementDocument jobAnnouncementDocument) {
        final Optional<JobAnnouncementDocument> jobAnnouncementOptional = jobAnnouncementRepository.findById(jobAnnouncementDocument.getParentId());
        if (jobAnnouncementOptional.isEmpty()) {
            System.out.printf("Couldn't find parent announcement with id '%s'\n", jobAnnouncementDocument.getParentId());
            throw new NoSuchAnnouncementException();
        }
        final JobAnnouncementDocument jobAnnouncement = jobAnnouncementOptional.get();
        final JobAnnouncementBasicInfo dto = new JobAnnouncementBasicInfo();
        dto.setId(jobAnnouncementDocument.getId());
        dto.setName(jobAnnouncementDocument.getName());
        Executor.getInstance()
                .setChildFields(jobAnnouncementDocument.getFields().get(0).getFields())
                .setParentFields(jobAnnouncement.getFields().get(0).getFields())
                .executeLogic(
                        new MakeBasicJobAnnouncementInformationExecutor(dto)
                );
        return dto;
    }
}