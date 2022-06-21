package com.talenty.service;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.talenty.domain.dto.*;
import com.talenty.domain.mongo.*;
import com.talenty.enums.JobAnnouncementStatus;
import com.talenty.enums.Type;
import com.talenty.exceptions.*;
import com.talenty.executor.BaseSource;
import com.talenty.executor.Executor;
import com.talenty.logical_executors.*;
import com.talenty.mapper.AppliedAnnouncementMapper;
import com.talenty.mapper.CVTemplateMapper;
import com.talenty.mapper.JobAnnouncementMapper;
import com.talenty.pagination.PaginationSettings;
import com.talenty.repository.AppliedAnnouncementRepository;
import com.talenty.repository.CompanyRepository;
import com.talenty.repository.JobAnnouncementRepository;
import com.talenty.repository.SubmittedCvTemplateRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JobAnnouncementService {

    private final JobAnnouncementRepository jobAnnouncementRepository;
    private final ApplicationContext applicationContext;
    private final HrService hrService;
    private final AppliedAnnouncementRepository appliedAnnouncementRepository;
    private final JobSeekerService jobSeekerService;
    private final SubmittedCvTemplateService submittedCvTemplateService;
    private final CompanyRepository companyRepository;
    private final TypeValuesService typeValuesService;
    private final CVTemplateService cvTemplateService;
    private final SubmittedCvTemplateRepository submittedCvTemplateRepository;

    public JobAnnouncementService(final JobAnnouncementRepository jobAnnouncementRepository,
                                  final ApplicationContext applicationContext,
                                  final HrService hrService,
                                  final AppliedAnnouncementRepository appliedAnnouncementRepository,
                                  final JobSeekerService jobSeekerService,
                                  final SubmittedCvTemplateService submittedCvTemplateService,
                                  final CompanyRepository companyRepository,
                                  final TypeValuesService typeValuesService,
                                  final CVTemplateService cvTemplateService,
                                  final SubmittedCvTemplateRepository submittedCvTemplateRepository) {
        this.jobAnnouncementRepository = jobAnnouncementRepository;
        this.applicationContext = applicationContext;
        this.hrService = hrService;
        this.appliedAnnouncementRepository = appliedAnnouncementRepository;
        this.jobSeekerService = jobSeekerService;
        this.submittedCvTemplateService = submittedCvTemplateService;
        this.companyRepository = companyRepository;
        this.typeValuesService = typeValuesService;
        this.cvTemplateService = cvTemplateService;
        this.submittedCvTemplateRepository = submittedCvTemplateRepository;
    }

    public JobAnnouncement getSystemJobAnnouncement() {
        final JobAnnouncementDocument systemJobAnnouncement = findSystemJobAnnouncement();
        Executor.getInstance()
                .setIterableFields(systemJobAnnouncement.getFields())
                .executeLogic(
                        applicationContext.getBean(AdminValuesMergeExecutor.class)
                );
        return JobAnnouncementMapper.instance.documentToDto(systemJobAnnouncement);
    }

    public JobAnnouncement publish(final JobAnnouncement jobAnnouncement) {
        final JobAnnouncementDocument newAnnouncement = JobAnnouncementMapper.instance.dtoToDocument(jobAnnouncement);
        final JobAnnouncementDocument systemAnnouncement = findSystemJobAnnouncement();

        Executor.getInstance()
                .setIterableFields(systemAnnouncement.getFields())
                .executeLogic(
                        applicationContext.getBean(AdminValuesMergeExecutor.class)
                )
                .after()
                .setIterableFields(systemAnnouncement.getFields())
                .setMatchableFields(newAnnouncement.getFields())
                .setSourceParent(BaseSource.ITERABLE)
                .executeLogic(
                        new FieldsIdValidationExecutor(),
                        new MergeFieldsExecutor(),
                        new RequiredFieldValidationExecutor(),
                        new SubmittedFieldValueValidationExecutor(),
                        new DeletedFieldValidationExecutor()
                )
                .after()
                .setIterableFields(newAnnouncement.getFields())
                .executeLogic(
                        new NewFieldValidationExecutor()
                );

        final HrDocument currentHr = hrService.getCurrentHr();
        newAnnouncement.setId(null);
        newAnnouncement.setParentId(systemAnnouncement.getId());
        newAnnouncement.setStatus(JobAnnouncementStatus.PENDING);
        newAnnouncement.setOwnerId(currentHr.getId());
        newAnnouncement.setCompanyId(currentHr.getCompanyId());
        final Map<String, Object> parentMetadata = systemAnnouncement.getMetadata();
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

    public JobAnnouncementDocument getJobAnnouncementById(final String id) {
        final Optional<JobAnnouncementDocument> announcement = jobAnnouncementRepository.findById(id);
        if (announcement.isEmpty()) {
            System.out.printf("Announcement with id '%s' is not found\n", id);
            throw new NoSuchAnnouncementException();
        }
        final JobAnnouncementDocument jobAnnouncementDocument = announcement.get();

        final JobAnnouncementDocument systemAnnouncement = findSystemJobAnnouncement();

        Executor.getInstance()
                .setIterableFields(systemAnnouncement.getFields())
                .setMatchableFields(jobAnnouncementDocument.getFields())
                .setSourceParent(BaseSource.ITERABLE)
                .executeLogic(
                        applicationContext.getBean(AdminValuesMergeExecutor.class),
                        new MergeFieldsExecutor()
                );

        return jobAnnouncementDocument;
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
        // TODO if else on user role
        final HrDocument currentHr = hrService.getCurrentHr();
        final String companyId = currentHr.getCompanyId();
        final List<JobAnnouncementDocument> allByCompanyId = jobAnnouncementRepository.findAllByCompanyIdAndStatus(companyId, status);
        final List<JobAnnouncementBasicInfo> result = new ArrayList<>();

        for (final JobAnnouncementDocument jobAnnouncementDocument : allByCompanyId) {
            if (jobAnnouncementDocument.getMetadata().containsKey("status") && Objects.equals(jobAnnouncementDocument.getMetadata().get("status"), "DELETED")) {
                continue;
            }
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
        final Object applicantsCount = jobAnnouncementDocument.getMetadata().get("count");
        dto.setId(jobAnnouncementDocument.getId());
        dto.setName(jobAnnouncementDocument.getName());
        dto.setApplicantsCount(Double.parseDouble(applicantsCount.toString()));
        dto.setViewedCount(jobAnnouncementDocument.getViewedUsersIds().size());
        Executor.getInstance()
                .setIterableFields(jobAnnouncement.getFields().get(0).getFields())
                .setMatchableFields(jobAnnouncementDocument.getFields().get(0).getFields())
                .setSourceParent(BaseSource.ITERABLE)
                .executeLogic(
                        new MergeFieldsExecutor(),
                        new MakeBasicJobAnnouncementInformationExecutor(dto)
                );
        return dto;
    }

    public AppliedAnnouncement apply(final AppliedAnnouncement appliedAnnouncement) {
        final AppliedAnnouncemetDocument appliedAnnouncemetDocument = AppliedAnnouncementMapper.instance.dtoToDocument(appliedAnnouncement);
        SubmittedCVTemplateDocument submittedCvTemplate = submittedCvTemplateService.getCvTemplateById(appliedAnnouncemetDocument.getSubmittedCvTemplateId(), false);
        final JobSeekerDocument owner = jobSeekerService.getCurrentJobSeeker();
        if (!Objects.equals(submittedCvTemplate.getOwnerId(), owner.getId())) {
            System.out.printf("Owner with id %s tried to save submitted cv of owner with id %s\n", owner.getId(), submittedCvTemplate.getOwnerId());
            throw new WrongOwnerException();
        }

        final JobAnnouncementDocument jobAnnouncement = getJobAnnouncementById(appliedAnnouncemetDocument.getJobAnnouncementId());
        if (jobAnnouncement.getAttachedCvTemplateId() != null) {
            if (!Objects.equals(jobAnnouncement.getAttachedCvTemplateId(), submittedCvTemplate.getParentId())) {
                System.out.printf("Wrong submission with id '%s' for announcement with id '%s'\n", submittedCvTemplate.getParentId(), jobAnnouncement.getId());
                throw new WrongSubmissionForAnnouncement();
            }
        }

        final Map<String, Object> announcementMetadata = jobAnnouncement.getMetadata();
        final Map<String, Object> newMetadata = new HashMap<>();
        if (announcementMetadata != null) {
            newMetadata.putAll(announcementMetadata);
            final Object count = announcementMetadata.get("count");
            Double currentCount = null;
            if (count != null) currentCount = Double.parseDouble(count.toString());
            if (currentCount == null) {
                newMetadata.put("count", 1);
            } else {
                newMetadata.put("count", (currentCount + 1));
            }
        } else {
            newMetadata.put("count", 1);
        }
        jobAnnouncement.setMetadata(newMetadata);
        jobAnnouncementRepository.save(jobAnnouncement);

        final AppliedAnnouncemetDocument saved = appliedAnnouncementRepository.save(appliedAnnouncemetDocument);
        return AppliedAnnouncementMapper.instance.documentToDto(saved);
    }

    public JobAnnouncement edit(final JobAnnouncement editedJobAnnouncement) {
        final JobAnnouncementDocument parentJobAnnouncement = getJobAnnouncementById(editedJobAnnouncement.getId());
        final Map<String, Object> parentMetadata = parentJobAnnouncement.getMetadata();

        if (!parentMetadata.containsKey("editable") || !((Boolean) parentMetadata.get("editable"))) {
            System.out.printf("Couldn't edit announcement with id '%s'\n", editedJobAnnouncement.getId());
            throw new NoSuchAnnouncementException();
        }

        final JobAnnouncementDocument jobAnnouncement = JobAnnouncementMapper.instance.dtoToDocument(editedJobAnnouncement);
        jobAnnouncement.setMetadata(new HashMap<>());
        final Map<String, Object> newMetadata = jobAnnouncement.getMetadata();

        if (!parentMetadata.containsKey("count")) parentMetadata.put("count", 0);

        double count = Double.parseDouble(parentMetadata.get("count").toString());
        if (count > 0) {
            jobAnnouncement.setId(null);
            handleEditedJobAnnouncementInList(parentJobAnnouncement, jobAnnouncement);
        }

        Executor.getInstance()
                .setIterableFields(parentJobAnnouncement.getFields())
                .setMatchableFields(jobAnnouncement.getFields())
                .executeLogic(
                        new RequiredFieldValidationExecutor(),
                        new SubmittedFieldValueValidationExecutor()
                );
        jobAnnouncement.setOwnerId(parentJobAnnouncement.getOwnerId());
        jobAnnouncement.setCompanyId(parentJobAnnouncement.getCompanyId());
        newMetadata.put("editable", true);
        newMetadata.put("count", 0);
        return JobAnnouncementMapper.instance.documentToDto(jobAnnouncementRepository.save(jobAnnouncement));
    }

    public Long getCountByStatus() {
        return jobAnnouncementRepository.countByStatus(JobAnnouncementStatus.CONFIRMED);
    }

    private void handleEditedJobAnnouncementInList(final JobAnnouncementDocument parent, final JobAnnouncementDocument child) {
        if (!Objects.equals(parent.getName(), child.getName())) return;
        parent.getMetadata().put("status", "DELETED");
        jobAnnouncementRepository.save(parent);
    }

    public ApplyInProgressResponse applyInProgress(final String jobAnnouncementId) {
        final JobAnnouncementDocument jobAnnouncementDocumentById = getJobAnnouncementById(jobAnnouncementId);
        final JobSeekerDocument currentJobSeeker = jobSeekerService.getCurrentJobSeeker();

        final String jobSeekerCvTemplateId = currentJobSeeker.getCvTemplateId();
        final String attachedCvTemplateId = jobAnnouncementDocumentById.getAttachedCvTemplateId();

        if (attachedCvTemplateId == null && jobSeekerCvTemplateId == null) {
            System.out.printf("User with id %s should have CV template\n", currentJobSeeker.getId());
            throw new JobSeekerShouldHaveCVException();
        } else if (attachedCvTemplateId == null) {
            return new ApplyInProgressResponse(Type.SUBMITTED_CV_TEMPLATE, jobSeekerCvTemplateId);
        } else if (jobSeekerCvTemplateId == null) {
            return new ApplyInProgressResponse(Type.CV_TEMPLATE, attachedCvTemplateId);
        }
        final SubmittedCVTemplateDocument matchedCv = matchCvTemplates(attachedCvTemplateId, jobSeekerCvTemplateId, currentJobSeeker.getId());
        return new ApplyInProgressResponse(Type.SUBMITTED_CV_TEMPLATE, matchedCv.getId());
    }

    public List<JobAnnouncementInfoForSearchPage> findAllConfirmed() {
        final List<JobAnnouncementDocument> allByStatus = jobAnnouncementRepository.findAllByStatus(JobAnnouncementStatus.CONFIRMED);
        final List<JobAnnouncementInfoForSearchPage> result = new ArrayList<>();
        for (JobAnnouncementDocument jobAnnouncementDocument : allByStatus) {
            if (jobAnnouncementDocument.getMetadata().containsKey("status") && Objects.equals(jobAnnouncementDocument.getMetadata().get("status"), "DELETED")) {
                continue;
            }
            final JobAnnouncementInfoForSearchPage temp = makeSearchPageInfo(jobAnnouncementDocument);
            result.add(temp);
        }
        return result;
    }

    public List<JobAnnouncementInfoForSearchPage> findAllByFilters(final JobAnnouncementFilters filters, final PaginationSettings pagination) {
        final List<TypeValues> typesWithValues = getTypeValues();
        final String allNames = getAllNames();

        final List<String> employmentTermsFilters = filters.getEmploymentTerms();
        final List<String> jobTypeFilters = filters.getJobType();
        final List<String> jobCategoryFilters = filters.getJobCategory();
        final List<String> candidateLevelFilters = filters.getCandidateLevel();
        final List<String> location = filters.getLocation();
        final String search = filters.getSearch();

        final List<JobAnnouncementDocument> allByStatusAndFilters = jobAnnouncementRepository.findAllByStatusAndFilters(
                JobAnnouncementStatus.CONFIRMED,
                employmentTermsFilters != null && !employmentTermsFilters.isEmpty() ? employmentTermsFilters : typesWithValues.get(0).getValues(),
                jobTypeFilters != null && !jobTypeFilters.isEmpty() ? jobTypeFilters : typesWithValues.get(1).getValues(),
                jobCategoryFilters != null && !jobCategoryFilters.isEmpty() ? jobCategoryFilters : typesWithValues.get(2).getValues(),
                candidateLevelFilters != null && !candidateLevelFilters.isEmpty() ? candidateLevelFilters : typesWithValues.get(3).getValues(),
                location != null && !location.isEmpty() ? location : ValidationChecker.COUNTRIES,
                search != null && !search.isEmpty() ? search : allNames,
                PageRequest.of(pagination.getPage(), pagination.getSize())
        );

        final List<JobAnnouncementInfoForSearchPage> result = new ArrayList<>();
        for (JobAnnouncementDocument jobAnnouncementDocument : allByStatusAndFilters) {
            if (jobAnnouncementDocument.getMetadata().containsKey("status") && Objects.equals(jobAnnouncementDocument.getMetadata().get("status"), "DELETED")) {
                continue;
            }
            final JobAnnouncementInfoForSearchPage temp = makeSearchPageInfo(jobAnnouncementDocument);
            result.add(temp);
        }
        return result;
    }

    public List<TypeValues> getTypeValues() {
        return typeValuesService.getTypesWithValuesByTypes(
                "employment_terms",
                "job_type",
                "job_category",
                "candidate_level"
        );
    }

    public String getAllNames() {
        final List<JobAnnouncementDocument> allByStatus = jobAnnouncementRepository.findAllByStatus(JobAnnouncementStatus.CONFIRMED);
        final List<String> allNames = new ArrayList<>();
        for (JobAnnouncementDocument byStatus : allByStatus) {
            allNames.add(byStatus.getName());
        }
        return allNames.toString();
    }

    private JobAnnouncementInfoForSearchPage makeSearchPageInfo(final JobAnnouncementDocument jobAnnouncementDocument) {
        final Optional<JobAnnouncementDocument> jobAnnouncementOptional = jobAnnouncementRepository.findById(jobAnnouncementDocument.getParentId());
        if (jobAnnouncementOptional.isEmpty()) {
            System.out.printf("Couldn't find parent announcement with id '%s'\n", jobAnnouncementDocument.getParentId());
            throw new NoSuchAnnouncementException();
        }
        final JobAnnouncementDocument jobAnnouncement = jobAnnouncementOptional.get();
        final JobAnnouncementInfoForSearchPage dto = new JobAnnouncementInfoForSearchPage();
        final Optional<CompanyDocument> companyDocumentOptional = companyRepository.findById(jobAnnouncementDocument.getCompanyId());
        if (companyDocumentOptional.isEmpty()) {
            System.out.printf("Couldn't find company with id '%s'\n", jobAnnouncementDocument.getCompanyId());
            throw new NoSuchCompanyException();
        }
        dto.setId(jobAnnouncementDocument.getId());
        dto.setName(jobAnnouncementDocument.getName());
        dto.setCompanyName(companyDocumentOptional.get().getName());
        Executor.getInstance()
                .setIterableFields(jobAnnouncement.getFields())
                .setMatchableFields(jobAnnouncementDocument.getFields())
                .setSourceParent(BaseSource.ITERABLE)
                .executeLogic(
                        new MakeJobAnnouncementSearchPageInformationExecutor(dto)
                );
        return dto;
    }

    public JobAnnouncementWithCompanyName getJobAnnouncementWithCompanyName(final String id) {

        final Optional<JobAnnouncementDocument> jobAnnouncementOptional = jobAnnouncementRepository.findById(id);
        if (jobAnnouncementOptional.isEmpty()) {
            System.out.printf("No such job announcement with id '%s'\n", id);
            throw new NoSuchAnnouncementException();
        }

        final JobAnnouncementDocument jobAnnouncementDocument = jobAnnouncementOptional.get();

        final JobSeekerDocument currentJobSeeker = jobSeekerService.getCurrentJobSeeker();
        final Set<String> viewedUsersIds = jobAnnouncementDocument.getViewedUsersIds();
        viewedUsersIds.add(currentJobSeeker.getId());
        jobAnnouncementRepository.save(jobAnnouncementDocument);

        final Optional<JobAnnouncementDocument> parentAnnouncement = jobAnnouncementRepository.findById(jobAnnouncementDocument.getParentId());
        if (parentAnnouncement.isEmpty()) {
            System.out.printf("No such job announcement with id '%s'\n", jobAnnouncementDocument.getParentId());
            throw new NoSuchAnnouncementException();
        }
        final JobAnnouncementDocument parentAnnouncementDocument = parentAnnouncement.get();
        Executor.getInstance()
                .setIterableFields(parentAnnouncementDocument.getFields())
                .setMatchableFields(jobAnnouncementDocument.getFields())
                .executeLogic(
                        applicationContext.getBean(AdminValuesMergeExecutor.class),
                        new MergeFieldsExecutor()
                );
        final JobAnnouncement jobAnnouncement = JobAnnouncementMapper.instance.documentToDto(jobAnnouncementDocument);
        final Optional<CompanyDocument> companyDocumentOptional = companyRepository.findById(jobAnnouncementDocument.getCompanyId());
        if (companyDocumentOptional.isEmpty()) {
            System.out.printf("Couldn't find company with id '%s'\n", jobAnnouncementDocument.getCompanyId());
            throw new NoSuchCompanyException();
        }
        final CompanyDocument companyDocument = companyDocumentOptional.get();

        final JobAnnouncementWithCompanyName jobAnnouncementWithCompanyName = new JobAnnouncementWithCompanyName();
        jobAnnouncementWithCompanyName.setId(jobAnnouncement.getId());
        jobAnnouncementWithCompanyName.setOwnerId(jobAnnouncement.getOwnerId());
        jobAnnouncementWithCompanyName.setName(jobAnnouncement.getName());
        jobAnnouncementWithCompanyName.setMetadata(jobAnnouncement.getMetadata());
        jobAnnouncementWithCompanyName.setStatus(jobAnnouncement.getStatus());
        jobAnnouncementWithCompanyName.setAttachedCvTemplateId(jobAnnouncement.getAttachedCvTemplateId());
        jobAnnouncementWithCompanyName.setFields(jobAnnouncement.getFields());
        jobAnnouncementWithCompanyName.setCompanyName(companyDocument.getName());

        return jobAnnouncementWithCompanyName;
    }

    private SubmittedCVTemplateDocument matchCvTemplates(final String attachedCvTemplateId, final String jobSeekerCvTemplateId, final String jobSeekerId) {
        final CVTemplateDocument attachedCv = cvTemplateService.getCvTemplateById(attachedCvTemplateId, true);
        final SubmittedCVTemplateDocument jobSeekerCv = submittedCvTemplateService.getCvTemplateById(jobSeekerCvTemplateId, true);
        final CVTemplateDocument systemCvTemplate = cvTemplateService.findSystemCvTemplate();

        final SubmittedCVTemplateDocument attachedCvAsSubmitted = CVTemplateMapper.instance.cvTemplateDocumentToSubmittedDocument(attachedCv);

        final List<FieldDocument> cachedSectionContainersOfJobSeekerCv = new ArrayList<>();
        final List<FieldDocument> cachedSectionContainersOfAttachedCv = new ArrayList<>();

        Executor.getInstance()
                .setIterableFields(jobSeekerCv.getFields())
                .executeLogic(
                        new SingleSectionOfSectionContainersCache(cachedSectionContainersOfJobSeekerCv)
                )
                .after()
                .setIterableFields(systemCvTemplate.getFields())
                .setMatchableFields(jobSeekerCv.getFields())
                .setSourceParent(BaseSource.ITERABLE)
                .executeLogic(
                        new MatchFieldsExecutor()
                )
                .after()
                .setIterableFields(systemCvTemplate.getFields())
                .setMatchableFields(attachedCvAsSubmitted.getFields())
                .setSourceParent(BaseSource.MATCHABLE)
                .executeLogic(
                        new MatchFieldsExecutor(),
                        new SectionOfSectionContainersCache(cachedSectionContainersOfAttachedCv)
                );


        addAndMergeSectionContainers(cachedSectionContainersOfJobSeekerCv, cachedSectionContainersOfAttachedCv);

        attachedCvAsSubmitted.setId(null);
        attachedCvAsSubmitted.setName(null);
        attachedCvAsSubmitted.setOwnerId(jobSeekerId);
        attachedCvAsSubmitted.setParentId(attachedCvTemplateId);
        attachedCvAsSubmitted.setMetadata(Map.of("status", "MATCHING"));

        return submittedCvTemplateRepository.save(attachedCvAsSubmitted);
    }


    public void addAndMergeSectionContainers(final List<FieldDocument> from,
                                             final List<FieldDocument> to) {
        for (int i = 0; i < to.size(); i++) {
            final FieldDocument tempSubmittedSection = from.get(i);
            final FieldDocument tempAttachedSection = to.get(i);

            for (int j = 0; j < tempSubmittedSection.getFields().size() - 1; j++) {
                tempAttachedSection.getFields().add(tempAttachedSection.getFields().get(0));
            }

            Executor.getInstance()
                    .setIterableFields(tempSubmittedSection.getFields())
                    .setMatchableFields(tempAttachedSection.getFields())
                    .setSourceParent(BaseSource.MATCHABLE)
                    .executeLogic(
                            new MergeSectionContainers()
                    );

        }
    }

    private JobAnnouncementDocument findSystemJobAnnouncement() {
        return jobAnnouncementRepository.findSystemJobAnnouncement();
    }

}