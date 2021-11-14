package com.talenty.service;

import com.talenty.domain.dto.hr.HrLoginRequestDetails;
import com.talenty.domain.dto.hr.HrLoginResponseDetails;
import com.talenty.domain.dto.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.hr.HrRegisterResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.mapper.CompanyMapper;
import com.talenty.repository.CompanyRepository;
import com.talenty.repository.HrRepository;
import org.springframework.stereotype.Service;

@Service
public class HrService {

    private final CompanyRepository companyRepository;
    private final HrRepository hrRepository;

    public HrService(final CompanyRepository companyRepository,final HrRepository hrRepository) {
        this.companyRepository = companyRepository;
        this.hrRepository = hrRepository;
    }

    public HrRegisterResponseDetails register(final HrRegisterRequestDetails request) {
        // TODO validation of information and passwords matching

        // TODO check email in DB (must not exists)

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
