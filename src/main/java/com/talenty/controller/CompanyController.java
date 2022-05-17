package com.talenty.controller;

import com.talenty.domain.dto.Company;
import com.talenty.domain.dto.TypeValues;
import com.talenty.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/company")
@PreAuthorize("permitAll()")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(final CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/get_dropdown_list")
    public ResponseEntity<?> getDropdownList() {
        final List<TypeValues> dropdownList = companyService.getTypeValues();
        return ResponseEntity.ok(dropdownList);
    }

    @PostMapping
    public ResponseEntity<?> saveCompany(@RequestBody final Company company) {
        companyService.save(company);
        return ResponseEntity.ok("saved");
    }

}
