package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "users")
@TypeAlias("hr")
public class HrDocument extends UserDocument {

    private String companyId;
    private List<String> templatesList = new ArrayList<>();

    public void addTemplate(final String id) {
        templatesList.add(id);
    }

    public void removeTemplate(final String id) {
        templatesList.remove(id);
    }

}
