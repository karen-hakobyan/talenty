package com.talenty.domain.dto;

import com.talenty.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ApplyInProgressResponse {
    private Type type;
    private String id;
}
