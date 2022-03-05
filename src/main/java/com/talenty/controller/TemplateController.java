package com.talenty.controller;

import com.talenty.domain.dto.Template;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.service.SubmittedTemplateService;
import com.talenty.service.TemplateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/templates")
@PreAuthorize("permitAll()")
public class TemplateController {

    private final TemplateService templateService;
    private final SubmittedTemplateService submittedTemplateService;

    public TemplateController(final TemplateService templateService, final SubmittedTemplateService submittedTemplateService) {
        this.templateService = templateService;
        this.submittedTemplateService = submittedTemplateService;
    }

    @GetMapping("/system")
    public ResponseEntity<Template> getSystemTemplate() {
        final Template systemTemplate = templateService.getSystemTemplate();
        return ResponseEntity.ok(systemTemplate);
    }

    @GetMapping("/template")
//    @PreAuthorize("isAuthenticated()")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getTemplateById(@RequestParam final String id) {
        final TemplateDocument templateById = templateService.getTemplateById(id);
        return ResponseEntity.ok(templateById);
    }

    @GetMapping("/all")
    //    @PreAuthorize("hasAnyRole('ROLE_HR_ADMIN')")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getAllTemplatesIds() {
        final List<String> allTemplatesIds = templateService.getAllTemplatesIds();
        return ResponseEntity.ok(allTemplatesIds);
    }

    @PostMapping("/create_new_template")
//        @PreAuthorize("hasAnyRole('ROLE_HR_ADMIN', 'ROLE_HR')")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createNewTemplate(@RequestBody final Template template) {
        templateService.createNewTemplate(template);
        return ResponseEntity.ok("created_new_template");
    }

    @PostMapping("/save_submitted_template")
    public ResponseEntity<?> saveSubmittedTemplate(@RequestBody final Template template) {
        submittedTemplateService.saveSubmittedTemplate(template);
        return ResponseEntity.ok("saved_submitted_template");
    }

}
