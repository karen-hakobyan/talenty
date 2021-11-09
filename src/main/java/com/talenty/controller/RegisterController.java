package com.talenty.controller;

import com.talenty.domain.dto.CompanyRegisterRequestDetails;
import com.talenty.domain.dto.CompanyRegisterResponseDetails;
import com.talenty.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class RegisterController {

    private final CompanyService companyService;

    public RegisterController(final CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping("/company")
    public ResponseEntity<?> register(@RequestBody final CompanyRegisterRequestDetails request) {
        final CompanyRegisterResponseDetails register = companyService.register(request);
        return ResponseEntity.ok(register);
    }

}