package com.talenty.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class Field {

    private String id;
    private String name;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<Field> fields;

    private Map<String, Object> metadata;
}
