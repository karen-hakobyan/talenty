package com.talenty.controller;

import com.talenty.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/confirm")
public class ConfirmationController {

    private final UserService userService;

    public ConfirmationController(final UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> confirm(@RequestParam final String token) {
        userService.confirm(token);
        return ResponseEntity.ok("confirmed");
    }

}
