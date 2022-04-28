package com.talenty.controller;

import com.mongodb.BasicDBObject;
import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.dto.SubmittedCVTemplate;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.domain.mongo.JobSeekerDocument;
import com.talenty.jwt.JWTService;
import com.talenty.service.CVTemplateService;
import com.talenty.service.JobSeekerService;
import com.talenty.service.SubmittedCvTemplateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cv_template")
@PreAuthorize("permitAll()")
public class CVTemplateController {

    private final CVTemplateService cvTemplateService;
    private final SubmittedCvTemplateService submittedCvTemplateService;
    private final JWTService jwtService;
    private final JobSeekerService jobSeekerService;

    public CVTemplateController(final CVTemplateService cvTemplateService,
                                final SubmittedCvTemplateService submittedCvTemplateService,
                                final JWTService jwtService,
                                final JobSeekerService jobSeekerService) {
        this.cvTemplateService = cvTemplateService;
        this.submittedCvTemplateService = submittedCvTemplateService;
        this.jwtService = jwtService;
        this.jobSeekerService = jobSeekerService;
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
        return ResponseEntity.ok(cvTemplateService.getAllCvTemplates());
    }

    @PostMapping("/save_submitted")
    public ResponseEntity<?> saveSubmittedCvTemplate(@RequestBody final SubmittedCVTemplate submittedCVTemplate) {
        final SubmittedCVTemplate savedTemplate = submittedCvTemplateService.saveSubmittedCvTemplate(submittedCVTemplate);
        final JobSeekerDocument currentJobSeeker = jobSeekerService.getCurrentJobSeeker();
        final JobSeekerDocument jobSeekerDocument = jobSeekerService.addCvTemplate(currentJobSeeker, savedTemplate.getId());
        return ResponseEntity.ok(jwtService.generate(jobSeekerDocument));
    }

    @PostMapping("/edit")
    public ResponseEntity<?> editSubmittedCvTemplate(@RequestBody final SubmittedCVTemplate editedCvTemplate) {
        submittedCvTemplateService.edit(editedCvTemplate);
        return ResponseEntity.ok("edited_submitted_cv_template");
    }

    @PostMapping("/edit_cv")
    public ResponseEntity<?> editCvTemplate(@RequestBody final CVTemplate editedCvTemplate) {
        submittedCvTemplateService.edit(editedCvTemplate);
        return ResponseEntity.ok("edited_cv_template");
    }

    @GetMapping("/delete")
    public ResponseEntity<?> deleteCreatedCvTemplateById(@RequestParam final String id) {
        final BasicDBObject allCvTemplatesIds = cvTemplateService.deleteCreatedCvTemplateById(id);
        return ResponseEntity.ok(allCvTemplatesIds);
    }

}
