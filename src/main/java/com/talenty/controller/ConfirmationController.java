package com.talenty.controller;

import com.talenty.repository.TokenRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/confirm")
public class ConfirmationController {

    private final TokenRepository tokenRepository;

    public ConfirmationController(final TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @GetMapping
    public ResponseEntity<?> confirm(@RequestParam final String token) {
        /* TODO
            1. handle token and confirm account if the token is valid
            2. expire token after successfully confirmation
         */
        return ResponseEntity.ok("confirmed");
    }

}
