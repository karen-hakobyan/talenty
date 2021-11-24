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
    private final EmailSender emailSender;
    private final TokenService tokenService;

    public ResetController(final UserService userService, final EmailSender emailSender, final TokenService tokenService) {
        this.userService = userService;
        this.emailSender = emailSender;
        this.tokenService = tokenService;
    }

    @GetMapping(path = "/password")
    public ResponseEntity<?> sendPasswordResetEmail(@RequestParam final String email) {
        final Optional<UserDocument> userOptional = userService.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new UserNotFoundException();
        }

        final String token = tokenService.generate(userOptional.get());
        emailSender.sendResetPassword(userOptional.get().getEmail(), token);

        return ResponseEntity.ok("Check you email!");
    }

    @PostMapping(path = "/password", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> resetPassword(@RequestParam final String token, final ResetPasswordDetails details) {
        ValidationChecker.assertPasswordIsValid(details.getPassword());
        ValidationChecker.assertPasswordsAreEqual(details.getPassword(), details.getConfirmPassword());

        final Optional<TokenDocument> tokenOptional = tokenService.findByValue(token);

        if (tokenOptional.isEmpty()) {
            throw new TokenNotFoundException("Token: " + token + " does not exist!");
        }

        final Optional<UserDocument> userOptional = userService.finById(tokenOptional.get().getUserId());

        if(userOptional.isEmpty()) {
            throw new UserNotFoundException();
        }

        userService.resetPassword(userOptional.get(), details);

        return ResponseEntity.ok("Password updated!");
    }

}
