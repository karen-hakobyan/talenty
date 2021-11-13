package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("users")
public class UserDocument {

    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String role;
    private String companyId;

}
