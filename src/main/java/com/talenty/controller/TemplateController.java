package com.talenty.controller;

import com.talenty.domain.dto.Template;
import com.talenty.service.SubmittedTemplateService;
import com.talenty.service.TemplateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/templates")
@PreAuthorize("permitAll()")
public class TemplateController {

    private final TemplateService templateService;
    private final SubmittedTemplateService submittedTemplateService;

    public TemplateController(TemplateService templateService, SubmittedTemplateService submittedTemplateService) {
        this.templateService = templateService;
        this.submittedTemplateService = submittedTemplateService;
    }

    @GetMapping("/system")
    public ResponseEntity<?> getSystemTemplate() {
        final Template systemTemplate = templateService.getSystemTemplate();
        return ResponseEntity.ok(systemTemplate);
    }

    @PostMapping("/save_submitted_template")
    public ResponseEntity<?> saveSubmittedTemplate(@RequestBody final Template template) {
        submittedTemplateService.saveSubmittedTemplate(template);
        return ResponseEntity.ok("saved_submitted_template");
    }

}
