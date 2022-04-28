package com.talenty.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;


@Getter
@Setter
public class BaseTemplate {

    private String id;
    private String name;
    private List<Field> fields;
    private String ownerId;
    private Map<String, Object> metadata;

}
