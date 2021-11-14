package com.talenty.service;

import com.talenty.domain.dto.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.dto.jobseeker.JobSeekerRegisterResponseDetails;
import com.talenty.domain.mongo.JobSeekerDocument;
import com.talenty.mapper.CompanyMapper;
import com.talenty.repository.JobSeekerRepository;
import org.springframework.stereotype.Service;

@Service
public class JobSeekerService {

    private final JobSeekerRepository jobSeekerRepository;

    public JobSeekerService(JobSeekerRepository jobSeekerRepository) {
        this.jobSeekerRepository = jobSeekerRepository;
    }

    public JobSeekerRegisterResponseDetails register(final JobSeekerRegisterRequestDetails request) {
        final JobSeekerDocument jobSeekerDocument = CompanyMapper.instance.requestToDocument(request);
        jobSeekerDocument.setRole("ROLE_JOB_SEEKER");
        final JobSeekerDocument savedJobSeeker = jobSeekerRepository.save(jobSeekerDocument);

        return CompanyMapper.instance.documentToRegisterResponse(savedJobSeeker);
    }

}
