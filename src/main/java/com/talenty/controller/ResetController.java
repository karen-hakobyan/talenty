package com.talenty.controller;

import com.talenty.domain.dto.reset.ResetPasswordDetails;
import com.talenty.domain.mongo.TokenDocument;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.email.EmailSender;
import com.talenty.exceptions.TokenNotFoundException;
import com.talenty.exceptions.UserNotFoundException;
import com.talenty.service.TokenService;
import com.talenty.service.UserService;
import com.talenty.validation.ValidationChecker;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/reset")
public class ResetController {

    private final UserService userService;

    public ResetController(final UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/password")
    public ResponseEntity<?> sendPasswordResetEmail(@RequestParam final String email) {
        userService.sendResetPassword(email);
        return ResponseEntity.ok("Check your email!");
    }

    @PostMapping(path = "/password")
    public ResponseEntity<?> resetPassword(@RequestParam final String token, @RequestBody final ResetPasswordDetails details) {
        final String newJwt = userService.resetPassword(token, details);
        return ResponseEntity.ok(newJwt);
    }

}
