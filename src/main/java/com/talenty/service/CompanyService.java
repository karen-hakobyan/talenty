package com.talenty.service;

import com.talenty.domain.dto.CompanyLoginRequestDetails;
import com.talenty.domain.dto.CompanyLoginResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.mapper.CompanyMapper;
import com.talenty.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public CompanyLoginResponseDetails login(final CompanyLoginRequestDetails request) {
        final CompanyDocument companyDocument = CompanyMapper.instance.requestToDocument(request);
        final CompanyDocument saved = companyRepository.save(companyDocument);
        return CompanyMapper.instance.documentToResponse(saved);
    }

}
