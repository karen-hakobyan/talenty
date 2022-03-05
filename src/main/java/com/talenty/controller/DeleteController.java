package com.talenty.controller;

import com.talenty.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/delete")
public class DeleteController {

    final UserRepository userRepository;

    public DeleteController(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> delete(@RequestParam final String email) {
        userRepository.deleteByEmail(email);
        return ResponseEntity.ok(String.format("user with email %s deleted", email));
    }

}
