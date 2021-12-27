package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Map;


@Getter
@Setter
@NoArgsConstructor
public class SubmittedFieldDocument {

    @Id
    private String id;
    private List<SubmittedFieldDocument> fields;
    private Map<String, Object> metadata;

}
