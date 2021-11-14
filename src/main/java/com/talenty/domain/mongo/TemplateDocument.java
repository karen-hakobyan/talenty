package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Getter
@Setter
@Document("templates")
public class TemplateDocument {

    @MongoId
    private String id;
    private String name;
    private List<FieldDocument> fields;

}
