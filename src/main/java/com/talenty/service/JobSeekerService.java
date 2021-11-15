package com.talenty.service;

import com.talenty.domain.dto.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.dto.jobseeker.JobSeekerRegisterResponseDetails;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.JobSeekerDocument;
import com.talenty.domain.mongo.TokenDocument;
import com.talenty.email.EmailSender;
import com.talenty.exceptions.JobSeekerAlreadyRegisteredException;
import com.talenty.exceptions.ProvidedEmailAlreadyRegistered;
import com.talenty.mapper.JobSeekerMapper;
import com.talenty.repository.HrRepository;
import com.talenty.repository.JobSeekerRepository;
import com.talenty.repository.TokenRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class JobSeekerService {

    private final JobSeekerRepository jobSeekerRepository;
    private final HrRepository hrRepository;
    private final EmailSender emailSender;
    private final TokenRepository tokenRepository;

    public JobSeekerService(JobSeekerRepository jobSeekerRepository, HrRepository hrRepository, EmailSender emailSender, TokenRepository tokenRepository) {
        this.jobSeekerRepository = jobSeekerRepository;
        this.hrRepository = hrRepository;
        this.emailSender = emailSender;
        this.tokenRepository = tokenRepository;
    }

    public JobSeekerRegisterResponseDetails register(final JobSeekerRegisterRequestDetails request) {
        ValidationChecker.assertDetailsAreValid(request);

        final Optional<HrDocument> hrOptional = hrRepository.findByEmail(request.getEmail());
        if (hrOptional.isPresent()){
            throw new ProvidedEmailAlreadyRegistered("Email " + request.getEmail() + "already registered");
        }

        final Optional<JobSeekerDocument> jobSeekerOptional = jobSeekerRepository.findByEmail(request.getEmail());
        if (jobSeekerOptional.isPresent()) {
            throw new JobSeekerAlreadyRegisteredException();
        }

        final JobSeekerDocument jobSeekerDocument = JobSeekerMapper.instance.requestToDocument(request);
        jobSeekerDocument.setRole("ROLE_JOB_SEEKER");
        final JobSeekerDocument savedJobSeeker = jobSeekerRepository.save(jobSeekerDocument);

        final String token = UUID.randomUUID().toString();
        tokenRepository.save(new TokenDocument(token, savedJobSeeker.getId()));
        emailSender.sendConfirmation(request.getEmail(), token);

        return JobSeekerMapper.instance.documentToRegisterResponse(savedJobSeeker);
    }

}
