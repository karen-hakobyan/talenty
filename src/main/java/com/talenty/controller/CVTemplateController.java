package com.talenty.controller;

import com.mongodb.BasicDBObject;
import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.dto.SubmittedCVTemplate;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.service.SubmittedCvTemplateService;
import com.talenty.service.CVTemplateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cv_template")
@PreAuthorize("permitAll()")
public class CVTemplateController {

    private final CVTemplateService cvTemplateService;
    private final SubmittedCvTemplateService submittedCvTemplateService;

    public CVTemplateController(final CVTemplateService cvTemplateService, final SubmittedCvTemplateService submittedCvTemplateService) {
        this.cvTemplateService = cvTemplateService;
        this.submittedCvTemplateService = submittedCvTemplateService;
    }

    @GetMapping("/system")
    public ResponseEntity<CVTemplate> getSystemCvTemplate() {
        final CVTemplate systemCVTemplate = cvTemplateService.getSystemCvTemplate();
        return ResponseEntity.ok(systemCVTemplate);
    }

    @GetMapping
//    @PreAuthorize("isAuthenticated()")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getCvTemplateById(@RequestParam final String id) {
        final CVTemplateDocument cvTemplateById = cvTemplateService.getCvTemplateById(id, false);
        return ResponseEntity.ok(cvTemplateById);
    }

    @GetMapping("/submitted")
//    @PreAuthorize("isAuthenticated()")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getSubmittedCvTemplateById(@RequestParam final String id) {
        final SubmittedCVTemplate cvTemplateById = submittedCvTemplateService.getCvTemplateById(id, true);
        return ResponseEntity.ok(cvTemplateById);
    }

    @GetMapping("/all")
    //    @PreAuthorize("hasAnyRole('ROLE_HR_ADMIN')")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getAllCvTemplatesIds() {
        final BasicDBObject allCvTemplatesIds = cvTemplateService.getAllCvTemplates();
        return ResponseEntity.ok(allCvTemplatesIds);
    }

    @PostMapping("/create_new")
//        @PreAuthorize("hasAnyRole('ROLE_HR_ADMIN', 'ROLE_HR')")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createNewCvTemplate(@RequestBody final CVTemplate cvTemplate) {
        final CVTemplate newCvTemplate = cvTemplateService.createNewCvTemplate(cvTemplate);
        return ResponseEntity.ok("created_new_cv_template");
    }

    @PostMapping("/save_submitted")
    public ResponseEntity<?> saveSubmittedCvTemplate(@RequestBody final SubmittedCVTemplate submittedCVTemplate) {
        submittedCvTemplateService.saveSubmittedCvTemplate(submittedCVTemplate);
        return ResponseEntity.ok("saved_submitted_cv_template");
    }

    @PostMapping("/edit")
    public ResponseEntity<?> editSubmittedCvTemplate(@RequestBody final SubmittedCVTemplate editedCvTemplate) {
        submittedCvTemplateService.edit(editedCvTemplate);
        return ResponseEntity.ok("saved_submitted_cv_template");
    }

}
