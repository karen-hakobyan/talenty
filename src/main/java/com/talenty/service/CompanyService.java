package com.talenty.service;

import com.talenty.domain.dto.Company;
import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.exceptions.NoSuchCompanyException;
import com.talenty.mapper.CompanyMapper;
import com.talenty.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final TypeValuesService typeValuesService;
    private final HrService hrService;

    public CompanyService(final CompanyRepository companyRepository,
                          final TypeValuesService typeValuesService,
                          final HrService hrService) {
        this.companyRepository = companyRepository;
        this.typeValuesService = typeValuesService;
        this.hrService = hrService;
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

    public Company getCompany() {
        final String companyId = hrService.getCurrentHr().getCompanyId();
        final Optional<CompanyDocument> optionalCompanyDocument = companyRepository.findById(companyId);
        if (optionalCompanyDocument.isEmpty()) {
            System.out.printf("Couldn't find company with id '%s'\n", companyId);
            throw new NoSuchCompanyException();
        }

        return CompanyMapper.instance.documentToDto(optionalCompanyDocument.get());
    }
}
