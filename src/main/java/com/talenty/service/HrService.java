package com.talenty.service;

import com.talenty.domain.dto.hr.HrLoginRequestDetails;
import com.talenty.domain.dto.hr.HrLoginResponseDetails;
import com.talenty.domain.dto.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.hr.HrRegisterResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.mapper.CompanyMapper;
import com.talenty.repository.CompanyRepository;
import com.talenty.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class HrService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public HrService(final CompanyRepository companyRepository, final UserRepository userRepository) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    public HrRegisterResponseDetails register(final HrRegisterRequestDetails request) {
        // TODO validation of information and passwords matching

        // TODO check email in DB (must not exists)

        final CompanyDocument company = CompanyMapper.instance.extractCompany(request);
        final UserDocument user = CompanyMapper.instance.extractUser(request);

        final CompanyDocument savedCompany = companyRepository.save(company);

        user.setCompanyId(savedCompany.getId());
        user.setRole("ROLE_ADMIN");

        final UserDocument savedUser = userRepository.save(user);

        return CompanyMapper.instance.documentToRegisterResponse(savedUser);
    }

    public HrLoginResponseDetails login(final HrLoginRequestDetails request) {
        return null;
    }
}
