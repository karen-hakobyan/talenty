package com.talenty.controller;

import com.talenty.domain.dto.*;
import com.talenty.domain.mongo.JobAnnouncementDocument;
import com.talenty.enums.JobAnnouncementStatus;
import com.talenty.pagination.PaginationSettings;
import com.talenty.service.JobAnnouncementService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/all_confirmed_count")
    public ResponseEntity<?> getApprovedCount() {
        final Long count = jobAnnouncementService.getCountByStatus();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/all_pending")
    // This endpoint is to get all pendings per company
    // We need to join this to endpoints and use role ("/all_pending", "/all_pendings")
    public ResponseEntity<?> getAllPending() {
        final List<JobAnnouncementBasicInfo> allPending = jobAnnouncementService.getAllJobAnnouncementsByStatus(JobAnnouncementStatus.PENDING);
        return ResponseEntity.ok(allPending);
    }

    @GetMapping("/all_pendings")
    // This endpoint is to get all pendings for admin dashboard
    // We need to join this to endpoints and use role ("/all_pending", "/all_pendings")
    public ResponseEntity<?> getAllPendings() {
        final List<JobAnnouncementBasicInfo> allPending = jobAnnouncementService.findAllPendings();
        return ResponseEntity.ok(allPending);
    }

    @PostMapping("/find_by_filters")
    public ResponseEntity<?> getTempAllConfirmed(@RequestParam(defaultValue = "0") final String page,
                                                 @RequestParam(defaultValue = "10") final String size,
                                                 @RequestBody final JobAnnouncementFilters filters) {
        System.out.println(filters);
        final List<JobAnnouncementInfoForSearchPage> allConfirmed = jobAnnouncementService.findAllByFilters(
                filters,
                new PaginationSettings(Integer.parseInt(page), Integer.parseInt(size))
        );
        return ResponseEntity.ok(allConfirmed);
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
        final JobAnnouncementDocument jobAnnouncement = jobAnnouncementService.getJobAnnouncementById(id);
        return ResponseEntity.ok(jobAnnouncement);
    }

    @PostMapping("/apply_in_progress")
    public ResponseEntity<?> applyInProgress(@RequestBody final ApplyInProgressCreds applyInProgressCreds) {
        ApplyInProgressResponse applyInProgressResponse = jobAnnouncementService.applyInProgress(
                applyInProgressCreds.getJobAnnouncementId()
        );
        return ResponseEntity.ok(applyInProgressResponse);
    }

    @GetMapping("/get_filters_list")
    public ResponseEntity<?> getFiltersList() {
        final List<TypeValues> filtersList = jobAnnouncementService.getTypeValues();
        return ResponseEntity.ok(filtersList);
    }

    @GetMapping("/view_more")
    public ResponseEntity<?> getJobAnnouncement(@RequestParam final String id) {
        final JobAnnouncementWithCompanyName jobAnnouncement = jobAnnouncementService.getJobAnnouncementWithCompanyName(id);
        return ResponseEntity.ok(jobAnnouncement);
    }

}
