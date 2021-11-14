package com.talenty.service;

import com.talenty.domain.dto.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.dto.jobseeker.JobSeekerRegisterResponseDetails;
import com.talenty.domain.mongo.JobSeekerDocument;
import com.talenty.exceptions.JobSeekerAlreadyRegisteredException;
import com.talenty.mapper.CompanyMapper;
import com.talenty.repository.JobSeekerRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JobSeekerService {

    private final JobSeekerRepository jobSeekerRepository;

    public JobSeekerService(JobSeekerRepository jobSeekerRepository) {
        this.jobSeekerRepository = jobSeekerRepository;
    }

    public JobSeekerRegisterResponseDetails register(final JobSeekerRegisterRequestDetails request) {
        ValidationChecker.assertDetailsAreValid(request);

        final Optional<JobSeekerDocument> jobSeekerOptional = jobSeekerRepository.findByEmail(request.getEmail());
        if(jobSeekerOptional.isPresent()) {
            throw new JobSeekerAlreadyRegisteredException();
        }

        final JobSeekerDocument jobSeekerDocument = CompanyMapper.instance.requestToDocument(request);
        jobSeekerDocument.setRole("ROLE_JOB_SEEKER");
        final JobSeekerDocument savedJobSeeker = jobSeekerRepository.save(jobSeekerDocument);

        return CompanyMapper.instance.documentToRegisterResponse(savedJobSeeker);
    }

}
