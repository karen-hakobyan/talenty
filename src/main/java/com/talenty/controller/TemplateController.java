package com.talenty.controller;

import com.mongodb.BasicDBObject;
import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.mongo.CVTemplateDocument;
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

    public TemplateController(final TemplateService templateService, final SubmittedTemplateService submittedTemplateService) {
        this.templateService = templateService;
        this.submittedTemplateService = submittedTemplateService;
    }

    @GetMapping("/system")
    public ResponseEntity<CVTemplate> getSystemTemplate() {
        final CVTemplate systemCVTemplate = templateService.getSystemTemplate();
        return ResponseEntity.ok(systemCVTemplate);
    }

    @GetMapping("/template")
//    @PreAuthorize("isAuthenticated()")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getTemplateById(@RequestParam final String id) {
        final CVTemplateDocument templateById = templateService.getTemplateById(id);
        return ResponseEntity.ok(templateById);
    }

    @GetMapping("/all")
    //    @PreAuthorize("hasAnyRole('ROLE_HR_ADMIN')")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getAllTemplatesIds() {
        final BasicDBObject allTemplatesIds = templateService.getAllTemplates();
        return ResponseEntity.ok(allTemplatesIds);
    }

    @PostMapping("/create_new_template")
//        @PreAuthorize("hasAnyRole('ROLE_HR_ADMIN', 'ROLE_HR')")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createNewTemplate(@RequestBody final CVTemplate cvTemplate) {
        templateService.createNewTemplate(cvTemplate);
        return ResponseEntity.ok("created_new_template");
    }

    @PostMapping("/save_submitted_template")
    public ResponseEntity<?> saveSubmittedTemplate(@RequestBody final CVTemplate cvTemplate) {
        submittedTemplateService.saveSubmittedTemplate(cvTemplate);
        return ResponseEntity.ok("saved_submitted_template");
    }

}
