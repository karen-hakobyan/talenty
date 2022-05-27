package com.talenty.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class NavigationBar {

    private String id;
    private String name;
    private List<Field> fields;
    private Map<String, Object> metadata;

}
