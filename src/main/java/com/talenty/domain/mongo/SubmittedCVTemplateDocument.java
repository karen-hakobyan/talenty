package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document("submitted_cv_templates")
public class SubmittedCVTemplateDocument {

    @Id
    private String id;
    private String parentId;
    private List<SubmittedFieldDocument> fields;

}
