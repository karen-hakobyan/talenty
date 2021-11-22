package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "users")
public class UserDocument {

    @MongoId
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private boolean verifiedAccount;

}
