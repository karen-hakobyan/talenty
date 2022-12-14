package com.talenty.domain.dto;

import com.talenty.enums.JobAnnouncementStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class JobAnnouncement extends BaseTemplate {

    private String attachedCvTemplateId;
    private JobAnnouncementStatus status;
    private Set<String> viewedUsersIds;

}
