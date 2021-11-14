package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("job_seekers")
public class JobSeekerDocument {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;

}
