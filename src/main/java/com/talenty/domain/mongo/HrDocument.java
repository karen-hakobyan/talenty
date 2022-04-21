package com.talenty.domain.mongo;

import com.mongodb.BasicDBObject;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "users")
@TypeAlias("hr")
public class HrDocument extends UserDocument {

    private String companyId;
    @Setter(AccessLevel.NONE)

    @Field("cv_templates")
    private BasicDBObject cvTemplates = new BasicDBObject();

    @Field("job_announcements")
    private BasicDBObject jobAnnouncements = new BasicDBObject();

    public void addJobAnnouncement(final String id, final String name) {
        jobAnnouncements.append(id, name);
    }

    public void deleteJobAnnouncement(final String id) {
        jobAnnouncements.remove(id);
    }

    public void addCvTemplate(final String id, final String name) {
        cvTemplates.append(id, name);
    }

    public void deleteCvTemplate(final String id) {
        cvTemplates.remove(id);
    }

}
