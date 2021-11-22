package com.talenty.service;

import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterResponseDetails;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.JobSeekerDocument;
import com.talenty.domain.mongo.TokenDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.email.EmailSender;
import com.talenty.exceptions.JobSeekerAlreadyRegisteredException;
import com.talenty.exceptions.ProvidedEmailAlreadyRegistered;
import com.talenty.mapper.JobSeekerMapper;
import com.talenty.repository.HrRepository;
import com.talenty.repository.JobSeekerRepository;
import com.talenty.repository.TokenRepository;
import com.talenty.repository.UserRepository;
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
    private final UserRepository userRepository;

    public JobSeekerService(final JobSeekerRepository jobSeekerRepository, final HrRepository hrRepository, final EmailSender emailSender, final TokenRepository tokenRepository, final UserRepository userRepository) {
        this.jobSeekerRepository = jobSeekerRepository;
        this.hrRepository = hrRepository;
        this.emailSender = emailSender;
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }

    public JobSeekerRegisterResponseDetails register(final JobSeekerRegisterRequestDetails request) {
        ValidationChecker.assertDetailsAreValid(request);

        final Optional<UserDocument> userOptional = userRepository.findByEmail(request.getEmail());

        if(userOptional.isPresent()) {
            throw new ProvidedEmailAlreadyRegistered("Email " + request.getEmail() + "already registered");

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
