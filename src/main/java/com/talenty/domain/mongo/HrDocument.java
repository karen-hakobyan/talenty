package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("hrs")
public class HrDocument {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private String companyId;

}
