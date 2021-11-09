package com.talenty.controller;

import com.talenty.domain.dto.CompanyLoginRequestDetails;
import com.talenty.domain.dto.CompanyLoginResponseDetails;
import com.talenty.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final CompanyService companyService;

    public LoginController(final CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping("/company")
    public ResponseEntity<?> login(@RequestBody final CompanyLoginRequestDetails request) {
        final CompanyLoginResponseDetails response = companyService.login(request);
        return ResponseEntity.ok(response);
    }

}
