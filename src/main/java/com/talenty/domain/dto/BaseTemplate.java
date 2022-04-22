package com.talenty.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class BaseTemplate {

    private String id;
    private String name;
    private List<Field> fields;
    private String ownerId;

}
