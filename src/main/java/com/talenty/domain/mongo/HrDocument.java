package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Getter
@Setter
@Document("hrs")
public class HrDocument {

    @MongoId
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private String companyId;
    private boolean verifiedAccount;

}
