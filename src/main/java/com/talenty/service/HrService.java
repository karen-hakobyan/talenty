package com.talenty.service;

import com.talenty.domain.dto.user.AuthenticatedUser;
import com.talenty.domain.dto.user.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.user.hr.HrRegisterResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.email.EmailSender;
import com.talenty.exceptions.EmailAlreadyRegisteredException;
import com.talenty.exceptions.UserNotFoundException;
import com.talenty.mapper.CompanyMapper;
import com.talenty.mapper.HrMapper;
import com.talenty.repository.*;
import com.talenty.validation.ValidationChecker;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HrService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final HrRepository hrRepository;
    private final TokenService tokenService;
    private final EmailSender emailSender;
    private final PasswordEncoder passwordEncoder;
    private final TemplateRepository templateRepository;

    public HrService(final UserRepository userRepository,
                     final CompanyRepository companyRepository,
                     final HrRepository hrRepository,
                     final TokenService tokenService,
                     final EmailSender emailSender,
                     final PasswordEncoder passwordEncoder,
                     final TemplateRepository templateRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.hrRepository = hrRepository;
        this.tokenService = tokenService;
        this.emailSender = emailSender;
        this.passwordEncoder = passwordEncoder;
        this.templateRepository = templateRepository;
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
        final TemplateDocument systemTemplateInfo = templateRepository.findSystemTemplateInfo();
        hr.addTemplate(systemTemplateInfo.getId(), systemTemplateInfo.getName());

        final HrDocument savedHr = hrRepository.save(hr);

        final String token = tokenService.generate(savedHr);
        emailSender.sendConfirmation(request.getEmail(), token);

        System.out.printf("Successfully registered hr with email '%s' from company '%s'\n", savedHr.getEmail(), savedCompany.getName());
        return HrMapper.instance.documentToRegisterResponse(savedHr);
    }

    public HrDocument getCurrentHr() {
        final AuthenticatedUser authenticatedUser = (AuthenticatedUser) SecurityContextHolder.getContext().getAuthentication().getCredentials();

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

}