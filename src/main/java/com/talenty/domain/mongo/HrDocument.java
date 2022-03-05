package com.talenty.domain.mongo;

import com.mongodb.BasicDBObject;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "users")
@TypeAlias("hr")
public class HrDocument extends UserDocument {

    private String companyId;
    @Setter(AccessLevel.NONE)
    private BasicDBObject templates = new BasicDBObject();

    public void addTemplate(final String id, final String name) {
        templates.append(id, name);
    }

}
