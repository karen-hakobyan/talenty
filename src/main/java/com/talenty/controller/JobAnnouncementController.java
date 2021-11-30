package com.talenty.controller;

import com.talenty.domain.dto.JobAnnouncement;
import com.talenty.service.JobAnnouncementService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/job_announcement")
@PreAuthorize("permitAll()")
public class JobAnnouncementController {

    private final JobAnnouncementService jobAnnouncementService;


    public JobAnnouncementController(JobAnnouncementService jobAnnouncementService) {
        this.jobAnnouncementService = jobAnnouncementService;
    }

    @GetMapping("/system")
    public ResponseEntity<?> getJobAnnouncementTemplate() {
        JobAnnouncement jobAnnouncement = jobAnnouncementService.getSystemJobAnnouncement();
        return ResponseEntity.ok(jobAnnouncement);
    }
}
