package com.talenty.domain.mongo;

import com.talenty.enums.JobAnnouncementStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "job_announcements")
public class JobAnnouncementDocument extends BaseTemplateDocument {

    private String attachedCvTemplateId;
    private String parentId;
    private JobAnnouncementStatus status;
    private String companyId;
    @Field("viewed_user_ids")
    private Set<String> viewedUsersIds = new HashSet<>();

}