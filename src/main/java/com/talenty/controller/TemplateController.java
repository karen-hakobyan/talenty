package com.talenty.controller;

import com.talenty.domain.dto.Template;
import com.talenty.service.TemplateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/templates")
@PreAuthorize("permitAll()")
public class TemplateController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping("/system")
    public ResponseEntity<?> getSystemTemplate() {
        System.out.println("1");
        Template systemTemplate = templateService.getSystemTemplate();
        return ResponseEntity.ok(systemTemplate);
    }

}
