package com.talenty.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobAnnouncementInfoForSearchPage {

    private String id;
    private String name;
    private String companyName;
    private String country;
    private String city;
    private String jobType;
    private String jobDescription;
    private String jobResponsibilities;

}
