package com.talenty.domain.mongo;

import com.talenty.enums.JobAnnouncementStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "job_announcements")
public class JobAnnouncementDocument {

    @Id
    private String id;
    private String name;
    private List<FieldDocument> fields;
    private String attachedTemplateId;
    private JobAnnouncementStatus status;

}
