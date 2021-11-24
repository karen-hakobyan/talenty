package com.talenty.service;

import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterResponseDetails;
import com.talenty.domain.mongo.JobSeekerDocument;
import com.talenty.domain.mongo.TokenDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.email.EmailSender;
import com.talenty.exceptions.ProvidedEmailAlreadyRegistered;
import com.talenty.mapper.JobSeekerMapper;
import com.talenty.repository.JobSeekerRepository;
import com.talenty.repository.TokenRepository;
import com.talenty.repository.UserRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class JobSeekerService {

    private final JobSeekerRepository jobSeekerRepository;
    private final EmailSender emailSender;
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public JobSeekerService(final JobSeekerRepository jobSeekerRepository, final EmailSender emailSender, final TokenService tokenService, final UserRepository userRepository, final PasswordEncoder passwordEncoder) {
        this.jobSeekerRepository = jobSeekerRepository;
        this.emailSender = emailSender;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public JobSeekerRegisterResponseDetails register(final JobSeekerRegisterRequestDetails request) {
        ValidationChecker.assertDetailsAreValid(request);

        final Optional<UserDocument> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isPresent()) {
            throw new ProvidedEmailAlreadyRegistered("Email " + request.getEmail() + "already registered");
        }

        final JobSeekerDocument jobSeekerDocument = JobSeekerMapper.instance.requestToDocument(request);
        jobSeekerDocument.setRole("ROLE_JOB_SEEKER");
        jobSeekerDocument.setPassword(passwordEncoder.encode(jobSeekerDocument.getPassword()));

        final JobSeekerDocument savedJobSeeker = jobSeekerRepository.save(jobSeekerDocument);

        final String token = tokenService.generate(savedJobSeeker);
        emailSender.sendConfirmation(request.getEmail(), token);

        return JobSeekerMapper.instance.documentToRegisterResponse(savedJobSeeker);
    }

}
