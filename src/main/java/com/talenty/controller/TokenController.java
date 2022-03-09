package com.talenty.controller;

import com.talenty.service.TokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/token")
//@PreAuthorize("anonymous()")
public class TokenController {

    private final TokenService tokenService;

    public TokenController(final TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @GetMapping
    public ResponseEntity<?> validateToken(@RequestParam final String token) {
        tokenService.findByValue(token);
        return ResponseEntity.ok("valid");
    }

}
