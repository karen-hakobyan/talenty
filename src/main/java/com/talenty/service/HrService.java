package com.talenty.service;

import com.talenty.domain.dto.hr.HrLoginRequestDetails;
import com.talenty.domain.dto.hr.HrLoginResponseDetails;
import com.talenty.domain.dto.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.hr.HrRegisterResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.JobSeekerDocument;
import com.talenty.domain.mongo.TokenDocument;
import com.talenty.email.EmailSender;
import com.talenty.exceptions.HrAlreadyRegisteredException;
import com.talenty.exceptions.ProvidedEmailAlreadyRegistered;
import com.talenty.mapper.CompanyMapper;
import com.talenty.mapper.HrMapper;
import com.talenty.repository.CompanyRepository;
import com.talenty.repository.HrRepository;
import com.talenty.repository.JobSeekerRepository;
import com.talenty.repository.TokenRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class HrService {

    private final CompanyRepository companyRepository;
    private final HrRepository hrRepository;
    private final JobSeekerRepository jobSeekerRepository;
    private final TokenRepository tokenRepository;
    private final EmailSender emailSender;

    public HrService(final CompanyRepository companyRepository, final HrRepository hrRepository, final JobSeekerRepository jobSeekerRepository, final TokenRepository tokenRepository, final EmailSender emailSender) {
        this.companyRepository = companyRepository;
        this.hrRepository = hrRepository;
        this.jobSeekerRepository = jobSeekerRepository;
        this.tokenRepository = tokenRepository;
        this.emailSender = emailSender;
    }

    public HrRegisterResponseDetails register(final HrRegisterRequestDetails request) {
        ValidationChecker.assertDetailsAreValid(request);

        final Optional<JobSeekerDocument> jobSeekerOptional = jobSeekerRepository.findByEmail(request.getEmail());

        if (jobSeekerOptional.isPresent()) {
            throw new ProvidedEmailAlreadyRegistered("Email: " + request.getEmail() + " already registered!");
        }

        final Optional<HrDocument> HrOptional = hrRepository.findByEmail(request.getEmail());

        if (HrOptional.isPresent()) {
            /* TODO
                 1. if account is verified than throw exception if not then:
                     2.1. check token for this email,
                     2.2. expire if exists
                     2.3. create new token and send confirmation email
             */
            throw new HrAlreadyRegisteredException();
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

    public HrLoginResponseDetails login(final HrLoginRequestDetails request) {
        //TODO if account verified generate jwt token and login session
        return null;
    }

}
