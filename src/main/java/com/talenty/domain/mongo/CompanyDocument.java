package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("companies")
public class CompanyDocument {

    @Id
    private String id;
    @Indexed(unique = true)
    private String name;

}
