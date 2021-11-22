package com.talenty.controller;

import com.talenty.domain.dto.user.UserLoginRequestDetails;
import com.talenty.domain.dto.user.hr.HrLoginResponseDetails;
import com.talenty.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final UserService userService;

    public LoginController(final UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody final UserLoginRequestDetails request) {
        final HrLoginResponseDetails response = userService.login(request);
        return ResponseEntity.ok(response);
    }

}
