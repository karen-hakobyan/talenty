package com.talenty.controller;

import com.talenty.domain.dto.Template;
import com.talenty.service.TemplateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
        Template systemTemplate = templateService.getSystemTemplate();
        return ResponseEntity.ok(systemTemplate);
    }

    @PostMapping("/save_filled_template")
    public ResponseEntity<?> saveFilledTemplate(@RequestBody final Template template) {
        templateService.saveFilledTemplate(template);
        return ResponseEntity.ok("saved_filled_template");
    }

}
