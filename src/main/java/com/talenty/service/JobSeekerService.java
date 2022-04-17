package com.talenty.service;

import com.talenty.domain.dto.user.AuthenticatedUser;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterResponseDetails;
import com.talenty.domain.mongo.JobSeekerDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.email.EmailSender;
import com.talenty.exceptions.EmailAlreadyRegisteredException;
import com.talenty.exceptions.InvalidAuthenticationWithJwt;
import com.talenty.exceptions.UserNotFoundException;
import com.talenty.mapper.JobSeekerMapper;
import com.talenty.repository.JobSeekerRepository;
import com.talenty.repository.UserRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JobSeekerService {

    private final JobSeekerRepository jobSeekerRepository;
    private final EmailSender emailSender;
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public JobSeekerService(final JobSeekerRepository jobSeekerRepository,
                            final EmailSender emailSender,
                            final TokenService tokenService,
                            final UserRepository userRepository,
                            final PasswordEncoder passwordEncoder) {
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
            System.out.printf("Email '%s' already registered\n", request.getEmail());
            throw new EmailAlreadyRegisteredException();
        }

        final JobSeekerDocument jobSeekerDocument = JobSeekerMapper.instance.requestToDocument(request);
        jobSeekerDocument.setRole("ROLE_JOB_SEEKER");
        jobSeekerDocument.setPassword(passwordEncoder.encode(jobSeekerDocument.getPassword()));

        final JobSeekerDocument savedJobSeeker = jobSeekerRepository.save(jobSeekerDocument);

        final String token = tokenService.generate(savedJobSeeker);
        emailSender.sendConfirmation(request.getEmail(), token);

        System.out.printf("Successfully registered job seeker with email '%s'\n", savedJobSeeker.getEmail());
        return JobSeekerMapper.instance.documentToRegisterResponse(savedJobSeeker);
    }

    public JobSeekerDocument getCurrentJobSeeker() {
        final Optional<AuthenticatedUser> currentUserOptional = AuthenticatedUserService.getCurrentUser();
        if (currentUserOptional.isEmpty()) {
            System.out.printf("Something wrong with authentication creds: %s\n", SecurityContextHolder.getContext().getAuthentication().getCredentials());
            throw new InvalidAuthenticationWithJwt();
        }

        final AuthenticatedUser authenticatedUser = currentUserOptional.get();
        final String currentJobSeekerId = authenticatedUser.getId();
        final Optional<JobSeekerDocument> currentJobSeeker = jobSeekerRepository.findById(currentJobSeekerId);

        if (currentJobSeeker.isEmpty()) {
            System.out.printf("User with id '%s' not found while getting current job seeker from authenticated user\n", currentJobSeekerId);
            throw new UserNotFoundException();
        }

        return currentJobSeeker.get();
    }

    public JobSeekerDocument addCvTemplate(final JobSeekerDocument currentJobSeeker, final String id) {
        final Optional<JobSeekerDocument> byId = jobSeekerRepository.findById(currentJobSeeker.getId());
        if (byId.isEmpty()) {
            System.out.printf("User with id '%s' not found while getting current job seeker from authenticated user\n", currentJobSeeker.getId());
            throw new UserNotFoundException();
        }

        final JobSeekerDocument jobSeekerDocument = byId.get();
        jobSeekerDocument.setCvTemplateId(id);

        return jobSeekerRepository.save(jobSeekerDocument);
    }

}
