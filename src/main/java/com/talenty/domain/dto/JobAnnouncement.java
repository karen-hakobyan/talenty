package com.talenty.domain.dto;

import com.talenty.enums.JobAnnouncementStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobAnnouncement extends BaseTemplate {

    private String attachedCvTemplateId;
    private JobAnnouncementStatus status;

}
