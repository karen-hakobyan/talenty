package com.talenty.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/templates")
@PreAuthorize("hasRole('MANAGER')")
public class TemplateController {

    @GetMapping("/default")
    public ResponseEntity<?> getDefaultTemplate() {
        //TODO go to database, fetch the default template and return it
        return ResponseEntity.ok().build();
    }

}
