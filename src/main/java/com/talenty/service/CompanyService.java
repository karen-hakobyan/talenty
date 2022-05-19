package com.talenty.service;

import com.talenty.domain.dto.Company;
import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.mapper.CompanyMapper;
import com.talenty.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final TypeValuesService typeValuesService;

    public CompanyService(final CompanyRepository companyRepository, final TypeValuesService typeValuesService) {
        this.companyRepository = companyRepository;
        this.typeValuesService = typeValuesService;
    }

    public List<TypeValues> getTypeValues() {
        return typeValuesService.getTypesWithValuesByTypes(
                "legal_form",
                "industry",
                "benefits"
        );
    }

    public Company save(final Company company) {
        final CompanyDocument companyDocument = CompanyMapper.instance.dtoToDocument(company);
        return CompanyMapper.instance.documentToDto(companyRepository.save(companyDocument));
    }
}
