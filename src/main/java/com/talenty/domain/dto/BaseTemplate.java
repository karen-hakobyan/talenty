package com.talenty.domain.dto;

import com.talenty.enums.JobAnnouncementStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class BaseTemplate {

    private String id;
    private String name;
    private List<Field> fields;

}
