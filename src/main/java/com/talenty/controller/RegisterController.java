package com.talenty.controller;

import com.talenty.domain.dto.user.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.user.hr.HrRegisterResponseDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterResponseDetails;
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
        hrService.register(request);
        return ResponseEntity.ok("registered");
    }

    @PostMapping("/jobseeker")
    public ResponseEntity<?> register(@RequestBody final JobSeekerRegisterRequestDetails request) {
        jobSeekerService.register(request);
        return ResponseEntity.ok("registered");
    }

}