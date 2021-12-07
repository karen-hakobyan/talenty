package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "job_announcement")
public class JobAnnouncementDocument {

    @MongoId
    private String id;
    private String name;
    private List<FieldDocument> fields;

}
