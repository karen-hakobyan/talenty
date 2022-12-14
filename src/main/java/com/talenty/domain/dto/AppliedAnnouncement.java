package com.talenty.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AppliedAnnouncement {

    private String ownerId;
    private String jobAnnouncementId;
    private String submittedCvTemplateId;

}
