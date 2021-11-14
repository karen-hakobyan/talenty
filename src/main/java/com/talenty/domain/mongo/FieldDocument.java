package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class FieldDocument {

    @MongoId
    private String id;
    private String name;
    private List<FieldDocument> fields;
    private Map<String, Object> metadata;

}
