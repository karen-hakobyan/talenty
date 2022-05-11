package com.talenty.service;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.talenty.domain.dto.user.AuthenticatedUser;
import com.talenty.domain.dto.user.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.user.hr.HrRegisterResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.JobAnnouncementDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.email.EmailSender;
import com.talenty.exceptions.EmailAlreadyRegisteredException;
import com.talenty.exceptions.InvalidAuthenticationWithJwt;
import com.talenty.exceptions.UserNotFoundException;
import com.talenty.mapper.CompanyMapper;
import com.talenty.mapper.HrMapper;
import com.talenty.repository.*;
import com.talenty.validation.ValidationChecker;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Objects;
import java.util.Optional;

@Service
public class HrService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final HrRepository hrRepository;
    private final TokenService tokenService;
    private final EmailSender emailSender;
    private final PasswordEncoder passwordEncoder;

    public HrService(final UserRepository userRepository,
                     final CompanyRepository companyRepository,
                     final HrRepository hrRepository,
                     final TokenService tokenService,
                     final EmailSender emailSender,
                     final PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.hrRepository = hrRepository;
        this.tokenService = tokenService;
        this.emailSender = emailSender;
        this.passwordEncoder = passwordEncoder;
    }

    public HrRegisterResponseDetails register(final HrRegisterRequestDetails request) {
        ValidationChecker.assertDetailsAreValid(request);

        final Optional<UserDocument> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isPresent()) {
            System.out.printf("Email '%s' already registered\n", request.getEmail());
            throw new EmailAlreadyRegisteredException();
        }

        final CompanyDocument company = CompanyMapper.instance.extractCompanyFromRegisterRequest(request);
        final HrDocument hr = HrMapper.instance.extractHrFromRegisterRequest(request);

        final CompanyDocument savedCompany = companyRepository.save(company);

        hr.setCompanyId(savedCompany.getId());
        hr.setRole("ROLE_HR_ADMIN");
        hr.setPassword(passwordEncoder.encode(hr.getPassword()));

        final HrDocument savedHr = hrRepository.save(hr);

        final String token = tokenService.generate(savedHr);
        emailSender.sendConfirmation(request.getEmail(), token);

        System.out.printf("Successfully registered hr with email '%s' from company '%s'\n", savedHr.getEmail(), savedCompany.getName());
        return HrMapper.instance.documentToRegisterResponse(savedHr);
    }

    public HrDocument getCurrentHr() {
        final AuthenticatedUser authenticatedUser = AuthenticatedUserService.getCurrentUser();

        final String currentHrId = authenticatedUser.getId();
        final Optional<HrDocument> currentHr = hrRepository.findById(currentHrId);

        if (currentHr.isEmpty()) {
            System.out.printf("User with id '%s' not found while getting current hr from authenticated user\n", currentHrId);
            throw new UserNotFoundException();
        }

        return currentHr.get();
    }

    public HrDocument save(final HrDocument hr) {
        return hrRepository.save(hr);
    }

    public void updateAnnouncementStatus(final JobAnnouncementDocument jobAnnouncement) {
        boolean found = false;
        final HrDocument owner = getHrById(jobAnnouncement.getOwnerId());
        final BasicDBList jobAnnouncementsInHr = owner.getJobAnnouncements();
        for (final Object o : jobAnnouncementsInHr) {
            try {
                final LinkedHashMap<String, Object> jobAnnouncementInList = (LinkedHashMap<String, Object>) o;
                if (Objects.equals(jobAnnouncementInList.get("id"), jobAnnouncement.getId())) {
                    jobAnnouncementInList.put("status", jobAnnouncement.getStatus());
                    found = true;
                    break;
                }
            } catch (final ClassCastException e) {
                System.out.println("Something went wrong while casting Object to basicDbObject");
            }
        }
        if (found) hrRepository.save(owner);
        else {
            System.out.printf("Didn't found job announcement with id: %s in the hr's list, this looks strange, please handle it (delete job announcement or write it into hr if it's not here mistakenly)!\n", jobAnnouncement.getId());
        }
    }

    public HrDocument getHrById(final String id) {
        final Optional<HrDocument> hrOptional = hrRepository.findById(id);

        if (hrOptional.isEmpty()) {
            System.out.printf("No hr found with id: %s\n", id);
            throw new UserNotFoundException();
        }

        return hrOptional.get();
    }

}