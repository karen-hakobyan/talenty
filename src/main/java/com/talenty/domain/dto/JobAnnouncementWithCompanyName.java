package com.talenty.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobAnnouncementWithCompanyName extends JobAnnouncement{

    private String companyName;

}