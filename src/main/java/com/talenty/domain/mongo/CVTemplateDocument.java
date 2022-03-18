package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document("cv_templates")
public class CVTemplateDocument {

    @Id
    private String id;
    private String name;
    private List<FieldDocument> fields;

}
