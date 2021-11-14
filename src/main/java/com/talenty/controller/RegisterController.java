package com.talenty.controller;

import com.talenty.domain.dto.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.hr.HrRegisterResponseDetails;
import com.talenty.domain.dto.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.dto.jobseeker.JobSeekerRegisterResponseDetails;
import com.talenty.service.HrService;
import com.talenty.service.JobSeekerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class RegisterController {

    private final HrService hrService;
    private final JobSeekerService jobSeekerService;

    public RegisterController(final HrService hrService, final JobSeekerService jobSeekerService) {
        this.hrService = hrService;
        this.jobSeekerService = jobSeekerService;
    }

    @PostMapping("/hr")
    public ResponseEntity<?> register(@RequestBody final HrRegisterRequestDetails request) {
        final HrRegisterResponseDetails registered = hrService.register(request);
        return ResponseEntity.ok(registered);
    }

    @PostMapping("/jobseeker")
    public ResponseEntity<?> register(@RequestBody final JobSeekerRegisterRequestDetails request) {
        final JobSeekerRegisterResponseDetails registered = jobSeekerService.register(request);
        return ResponseEntity.ok(registered);
    }

}