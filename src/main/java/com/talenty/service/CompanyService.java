package com.talenty.service;

import com.talenty.domain.dto.CompanyLoginRequestDetails;
import com.talenty.domain.dto.CompanyLoginResponseDetails;
import com.talenty.domain.dto.CompanyRegisterRequestDetails;
import com.talenty.domain.dto.CompanyRegisterResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.mapper.CompanyMapper;
import com.talenty.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(final CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public CompanyRegisterResponseDetails register(final CompanyRegisterRequestDetails request) {
        final CompanyDocument companyDocument = CompanyMapper.instance.requestToDocument(request);
        final CompanyDocument saved = companyRepository.save(companyDocument);
        return CompanyMapper.instance.documentToRegisterResponse(saved);
    }

    public CompanyLoginResponseDetails login(final CompanyLoginRequestDetails request) {
        return null;
    }
}
