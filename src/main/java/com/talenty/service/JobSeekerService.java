package com.talenty.service;

import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.dto.ProfileDetails;
import com.talenty.domain.dto.user.AuthenticatedUser;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterResponseDetails;
import com.talenty.domain.mongo.*;
import com.talenty.email.EmailSender;
import com.talenty.enums.ProfileStatus;
import com.talenty.exceptions.EmailAlreadyRegisteredException;
import com.talenty.exceptions.UserNotFoundException;
import com.talenty.executor.Executor;
import com.talenty.executor.RemoveFieldFromTemplateByNameExecutor;
import com.talenty.mapper.CVTemplateMapper;
import com.talenty.mapper.JobSeekerMapper;
import com.talenty.repository.JobSeekerRepository;
import com.talenty.repository.UserRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class JobSeekerService {

    private final JobSeekerRepository jobSeekerRepository;
    private final EmailSender emailSender;
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SubmittedCvTemplateService submittedCvTemplateService;
    private final CVTemplateService cvTemplateService;

    public JobSeekerService(final JobSeekerRepository jobSeekerRepository,
                            final EmailSender emailSender,
                            final TokenService tokenService,
                            final UserRepository userRepository,
                            final PasswordEncoder passwordEncoder,
                            final SubmittedCvTemplateService submittedCvTemplateService,
                            final CVTemplateService cvTemplateService) {
        this.jobSeekerRepository = jobSeekerRepository;
        this.emailSender = emailSender;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.submittedCvTemplateService = submittedCvTemplateService;
        this.cvTemplateService = cvTemplateService;
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
        jobSeekerDocument.setProfileStatus(ProfileStatus.PUBLIC);
        jobSeekerDocument.setHeadline("");
        jobSeekerDocument.setPassword(passwordEncoder.encode(jobSeekerDocument.getPassword()));

        final JobSeekerDocument savedJobSeeker = jobSeekerRepository.save(jobSeekerDocument);

        final String token = tokenService.generate(savedJobSeeker);
        emailSender.sendConfirmation(request.getEmail(), token);

        System.out.printf("Successfully registered job seeker with email '%s'\n", savedJobSeeker.getEmail());
        return JobSeekerMapper.instance.documentToRegisterResponse(savedJobSeeker);
    }

    public JobSeekerDocument getCurrentJobSeeker() {
        final AuthenticatedUser authenticatedUser = AuthenticatedUserService.getCurrentUser();
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

    public ProfileDetails getProfileDetails() {
        final JobSeekerDocument currentJobSeeker = getCurrentJobSeeker();
        final ProfileDetails profileDetails = new ProfileDetails();
        profileDetails.setFullName(currentJobSeeker.getFirstName() + " " + currentJobSeeker.getLastName());
        profileDetails.setEmail(currentJobSeeker.getEmail());
        profileDetails.setProfileStatus(currentJobSeeker.getProfileStatus());
        profileDetails.setHeadline(currentJobSeeker.getHeadline());
        profileDetails.setProfileCompleteness(calculateProfileCompleteness());
        return profileDetails;
    }

    private double calculateProfileCompleteness() {
        return 0;
    }

    public String updateHeadline(final String headline) {
        final JobSeekerDocument currentJobSeeker = getCurrentJobSeeker();
        currentJobSeeker.setHeadline(headline);
        if (currentJobSeeker.getProfileStatus() == null) {
            currentJobSeeker.setProfileStatus(ProfileStatus.PUBLIC);
        }
        final JobSeekerDocument save = jobSeekerRepository.save(currentJobSeeker);
        return save.getHeadline();
    }

    public ProfileStatus updateProfileStatus(final ProfileStatus profileStatus) {
        final JobSeekerDocument currentJobSeeker = getCurrentJobSeeker();
        currentJobSeeker.setProfileStatus(profileStatus);
        if (currentJobSeeker.getHeadline() == null) {
            currentJobSeeker.setHeadline("");
        }
        final JobSeekerDocument save = jobSeekerRepository.save(currentJobSeeker);
        return save.getProfileStatus();
    }

    public CVTemplate getProfileData() {
        final JobSeekerDocument currentJobSeeker = getCurrentJobSeeker();
        final String cvTemplateId = currentJobSeeker.getCvTemplateId();

        final CVTemplateDocument result;

        if (cvTemplateId != null) {
            final SubmittedCVTemplateDocument submittedCv = submittedCvTemplateService.getCvTemplateById(cvTemplateId, true);
            result = CVTemplateMapper.instance.submittedDocumentToCvTemplateDocument(submittedCv);
        } else result = cvTemplateService.findSystemCvTemplate();

        Executor.getInstance()
                .setIterableFields(result.getFields())
                .executeLogic(
                        new RemoveFieldFromTemplateByNameExecutor("First name", "Last name")
                );
        addHeaderSection(result, currentJobSeeker);

        return CVTemplateMapper.instance.documentToDto(result);
    }

    private void addHeaderSection(final CVTemplateDocument templateDocument, final JobSeekerDocument currentJobSeeker) {
        final FieldDocument newSection = new FieldDocument();
        newSection.setMetadata(Map.of(
                "type", "section",
                "deletable", false,
                "display", "fold"
        ));
        newSection.setName("Profile header section");
        newSection.setFields(new ArrayList<>());
        final List<FieldDocument> fields = newSection.getFields();

        final FieldDocument profileStatusField = new FieldDocument();
        profileStatusField.setName("Profile status");
        profileStatusField.setMetadata(
                Map.of(
                        "type", "check_box",
                        "placeholder", List.of(ProfileStatus.PUBLIC, ProfileStatus.PRIVATE),
                        "required", Boolean.FALSE,
                        "submitted_value", currentJobSeeker.getProfileStatus()
                )
        );

        final FieldDocument headlineField = new FieldDocument();
        headlineField.setName("Headline");
        headlineField.setMetadata(
                Map.of(
                        "type", "text",
                        "maxLength", 50,
                        "placeholder", "Add headline",
                        "required", Boolean.FALSE,
                        "submitted_value", currentJobSeeker.getHeadline()
                )
        );

        final FieldDocument imageField = new FieldDocument();
        imageField.setName("Profile image");
        imageField.setMetadata(
                Map.of(
                        "type", "profile_image",
                        "placeholder", "Change image",
                        "required", Boolean.FALSE,
                        "submitted_value", "default"
                )
        );

        final FieldDocument firstNameField = new FieldDocument();
        firstNameField.setName("First name");
        firstNameField.setMetadata(
                Map.of(
                        "type", "special_name",
                        "placeholder", "First name",
                        "maxLength", 20,
                        "required", Boolean.FALSE,
                        "submitted_value", currentJobSeeker.getFirstName()
                )
        );

        final FieldDocument lastNameField = new FieldDocument();
        lastNameField.setName("Last name");
        lastNameField.setMetadata(
                Map.of(
                        "type", "special_name",
                        "placeholder", "Last name",
                        "maxLength", 20,
                        "required", Boolean.FALSE,
                        "submitted_value", currentJobSeeker.getLastName()
                )
        );

        fields.add(profileStatusField);
        fields.add(headlineField);
        fields.add(imageField);
        fields.add(firstNameField);
        fields.add(lastNameField);

        templateDocument.getFields().add(0, newSection);
    }

}
