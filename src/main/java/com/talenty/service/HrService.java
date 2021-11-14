package com.talenty.service;

import com.talenty.domain.dto.hr.HrLoginRequestDetails;
import com.talenty.domain.dto.hr.HrLoginResponseDetails;
import com.talenty.domain.dto.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.hr.HrRegisterResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.exceptions.HrAlreadyRegisteredException;
import com.talenty.mapper.CompanyMapper;
import com.talenty.repository.CompanyRepository;
import com.talenty.repository.HrRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HrService {

    private final CompanyRepository companyRepository;
    private final HrRepository hrRepository;

    public HrService(final CompanyRepository companyRepository, final HrRepository hrRepository) {
        this.companyRepository = companyRepository;
        this.hrRepository = hrRepository;
    }

    public HrRegisterResponseDetails register(final HrRegisterRequestDetails request) {
        ValidationChecker.assertDetailsAreValid(request);

        final Optional<HrDocument> HrOptional = hrRepository.findByEmail(request.getEmail());

        if (HrOptional.isPresent()) {
            throw new HrAlreadyRegisteredException();
        }

        final CompanyDocument company = CompanyMapper.instance.extractCompany(request);
        final HrDocument hr = CompanyMapper.instance.extractHr(request);

        final CompanyDocument savedCompany = companyRepository.save(company);

        hr.setCompanyId(savedCompany.getId());
        hr.setRole("ROLE_ADMIN");

        final HrDocument savedHr = hrRepository.save(hr);

        return CompanyMapper.instance.documentToRegisterResponse(savedHr);
    }

    public HrLoginResponseDetails login(final HrLoginRequestDetails request) {
        return null;
    }

}
