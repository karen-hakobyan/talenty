package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NoArgsConstructor
public class AppliedAnnouncemetDocument {

    @Id
    private String id;
    private String ownerId;
    private String jobAnnouncementId;
    private String submittedCvTemplateId;

}
