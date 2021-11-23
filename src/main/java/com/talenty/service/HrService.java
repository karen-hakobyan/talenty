package com.talenty.service;

import com.talenty.domain.dto.user.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.user.hr.HrRegisterResponseDetails;
import com.talenty.domain.mongo.*;
import com.talenty.email.EmailSender;
import com.talenty.exceptions.ProvidedEmailAlreadyRegistered;
import com.talenty.mapper.CompanyMapper;
import com.talenty.mapper.HrMapper;
import com.talenty.repository.*;
import com.talenty.validation.ValidationChecker;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class HrService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final HrRepository hrRepository;
    private final TokenRepository tokenRepository;
    private final EmailSender emailSender;

    public HrService(final UserRepository userRepository, final CompanyRepository companyRepository, final HrRepository hrRepository, final TokenRepository tokenRepository, final EmailSender emailSender) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.hrRepository = hrRepository;
        this.tokenRepository = tokenRepository;
        this.emailSender = emailSender;
    }

    public HrRegisterResponseDetails register(final HrRegisterRequestDetails request) {
        ValidationChecker.assertDetailsAreValid(request);

        final Optional<UserDocument> userOptional = userRepository.findByEmail(request.getEmail());

        if(userOptional.isPresent()) {
            throw new ProvidedEmailAlreadyRegistered("Email: " + request.getEmail() + " already registered!");
        }

        final CompanyDocument company = CompanyMapper.instance.extractCompanyFromRegisterRequest(request);
        final HrDocument hr = HrMapper.instance.extractHrFromRegisterRequest(request);

        final CompanyDocument savedCompany = companyRepository.save(company);

        hr.setCompanyId(savedCompany.getId());
        hr.setRole("ROLE_HR_ADMIN");

        final HrDocument savedHr = hrRepository.save(hr);

        final String token = UUID.randomUUID().toString();
        tokenRepository.save(new TokenDocument(token, savedHr.getId()));
        emailSender.sendConfirmation(request.getEmail(), token);

        return HrMapper.instance.documentToRegisterResponse(savedHr);
    }

}
