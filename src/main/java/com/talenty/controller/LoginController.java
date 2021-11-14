package com.talenty.controller;

import com.talenty.domain.dto.hr.HrLoginRequestDetails;
import com.talenty.domain.dto.hr.HrLoginResponseDetails;
import com.talenty.service.HrService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final HrService hrService;

    public LoginController(final HrService hrService) {
        this.hrService = hrService;
    }

    @PostMapping("/hr")
    public ResponseEntity<?> login(@RequestBody final HrLoginRequestDetails request) {
        final HrLoginResponseDetails response = hrService.login(request);
        return ResponseEntity.ok(response);
    }

}
