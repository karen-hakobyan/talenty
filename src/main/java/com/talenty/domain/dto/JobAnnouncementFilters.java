package com.talenty.domain.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class JobAnnouncementFilters {

    private List<String> employmentTerms;
    private List<String> jobType;
    private List<String> jobCategory;
    private List<String> candidateLevel;
    private List<String> location;
    private String search;

}
