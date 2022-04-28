package com.talenty.controller;

import com.talenty.domain.dto.AppliedAnnouncement;
import com.talenty.domain.dto.JobAnnouncement;
import com.talenty.domain.dto.JobAnnouncementBasicInfo;
import com.talenty.enums.JobAnnouncementStatus;
import com.talenty.service.JobAnnouncementService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/job_announcements")
@PreAuthorize("permitAll()")
public class JobAnnouncementController {

    private final JobAnnouncementService jobAnnouncementService;

    public JobAnnouncementController(final JobAnnouncementService jobAnnouncementService) {
        this.jobAnnouncementService = jobAnnouncementService;
    }

    @GetMapping("/system")
    public ResponseEntity<?> getJobAnnouncementTemplate() {
        final JobAnnouncement jobAnnouncement = jobAnnouncementService.getSystemJobAnnouncement();
        return ResponseEntity.ok(jobAnnouncement);
    }

    @PostMapping("/publish")
    public ResponseEntity<?> publishJobAnnouncement(@RequestBody final JobAnnouncement request) {
        final JobAnnouncement response = jobAnnouncementService.publish(request);
        return ResponseEntity.ok("published");
    }

    @GetMapping("/all_pending")
    public ResponseEntity<?> getAllPending() {
        final List<JobAnnouncementBasicInfo> allPending = jobAnnouncementService.getAllJobAnnouncementsByStatus(JobAnnouncementStatus.PENDING);
        return ResponseEntity.ok(allPending);
    }

    @GetMapping("/all_pendings")
    public ResponseEntity<?> getAllPendings() {
        final List<JobAnnouncementBasicInfo> allPending = jobAnnouncementService.findAllPendings();
        return ResponseEntity.ok(allPending);
    }

    @GetMapping("/approve")
    public ResponseEntity<?> approveAnnouncement(@RequestParam final String id) {
        final JobAnnouncement jobAnnouncement = jobAnnouncementService.approveAnnouncement(id);
        return ResponseEntity.ok("approved");
    }

    @GetMapping("/reject")
    public ResponseEntity<?> rejectAnnouncement(@RequestParam final String id) {
        final JobAnnouncement jobAnnouncement = jobAnnouncementService.rejectAnnouncement(id);
        return ResponseEntity.ok("declined");
    }

    @GetMapping("/all_confirmed")
    public ResponseEntity<?> getAllConfirmed() {
        final List<JobAnnouncementBasicInfo> allConfirmedJobAnnouncements = jobAnnouncementService.getAllJobAnnouncementsByStatus(JobAnnouncementStatus.CONFIRMED);
        return ResponseEntity.ok((allConfirmedJobAnnouncements));
    }

    @PostMapping("/apply")
    public ResponseEntity<?> applyJob(@RequestBody final AppliedAnnouncement appliedAnnouncement) {
        final AppliedAnnouncement apply = jobAnnouncementService.apply(appliedAnnouncement);
        return ResponseEntity.ok("");
    }

    @PostMapping("/edit")
    public ResponseEntity<?> editJobAnnouncement(@RequestBody final JobAnnouncement editedJobAnnouncement) {
        jobAnnouncementService.edit(editedJobAnnouncement);
        return ResponseEntity.ok("edited_job_announcement");
    }

    @GetMapping()
    public ResponseEntity<?> getJobAnnouncementById(@RequestParam final String id) {
        final JobAnnouncement jobAnnouncement = jobAnnouncementService.getJobAnnouncementById(id);
        return ResponseEntity.ok(jobAnnouncement);
    }

}
