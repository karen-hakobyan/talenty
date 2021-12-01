package com.talenty.service;

import com.talenty.domain.dto.JobAnnouncement;
import com.talenty.mapper.JobAnnouncementMapper;
import com.talenty.repository.JobAnnouncementRepository;
import org.springframework.stereotype.Service;

@Service
public class JobAnnouncementService {

    private final JobAnnouncementRepository jobAnnouncementRepository;

    public JobAnnouncementService(JobAnnouncementRepository jobAnnouncementRepository) {
        this.jobAnnouncementRepository = jobAnnouncementRepository;
    }

    public JobAnnouncement getSystemJobAnnouncement() {
        return JobAnnouncementMapper.instance.documentToDto(jobAnnouncementRepository.findSystemJobAnnouncement());
    }
}
