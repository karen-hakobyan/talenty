package com.talenty.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobAnnouncementWithCompanyName {

    private JobAnnouncement jobAnnouncement;
    private String companyName;

}
