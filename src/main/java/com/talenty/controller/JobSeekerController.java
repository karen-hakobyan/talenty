package com.talenty.controller;


import com.talenty.domain.dto.HeadlineWrapper;
import com.talenty.domain.dto.ProfileDetails;
import com.talenty.domain.dto.ProfileStatusWrapper;
import com.talenty.enums.ProfileStatus;
import com.talenty.service.JobSeekerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/job_seeker")
public class JobSeekerController {

    private final JobSeekerService jobSeekerService;

    public JobSeekerController(final JobSeekerService jobSeekerService) {
        this.jobSeekerService = jobSeekerService;
    }

    @GetMapping("/profile_details")
    public ResponseEntity<?> getProfileDetails() {
        final ProfileDetails profileDetails = jobSeekerService.getProfileDetails();
        return ResponseEntity.ok(profileDetails);
    }

    @PostMapping("/update_headline")
    public ResponseEntity<?> updateHeadline(@RequestBody final HeadlineWrapper headlineWrapper) {
        final String updatedHeadline = jobSeekerService.updateHeadline(headlineWrapper.getHeadline());
        return ResponseEntity.ok("Updated new headline: " + updatedHeadline);
    }

    @PostMapping("/update_profile_status")
    public ResponseEntity<?> updateProfileStatus(@RequestBody final ProfileStatusWrapper profileStatusWrapper) {
        final ProfileStatus updatedStatus = jobSeekerService.updateProfileStatus(profileStatusWrapper.getProfileStatus());
        return ResponseEntity.ok("Updated new status: " + updatedStatus);
    }

}
