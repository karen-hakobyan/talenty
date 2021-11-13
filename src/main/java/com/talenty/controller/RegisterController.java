package com.talenty.controller;

import com.talenty.domain.dto.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.hr.HrRegisterResponseDetails;
import com.talenty.domain.mongo.CompanyDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.mapper.CompanyMapper;
import com.talenty.service.HrService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class RegisterController {

    private final HrService hrService;

    public RegisterController(final HrService hrService) {
        this.hrService = hrService;
    }

    @PostMapping("/hr")
    public ResponseEntity<?> register(@RequestBody final HrRegisterRequestDetails request) {
        final HrRegisterResponseDetails registered = hrService.register(request);
        return ResponseEntity.ok(registered);
    }

}