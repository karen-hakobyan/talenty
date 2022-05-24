package com.talenty.domain.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Getter
@Setter
public class JobAnnouncementBasicInfo {

    private String id;
    private String name;
    private String deadline;
    private String country;
    private Double applicantsCount;

}
