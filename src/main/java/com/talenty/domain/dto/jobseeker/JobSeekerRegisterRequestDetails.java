package com.talenty.domain.dto.jobseeker;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JobSeekerRegisterRequestDetails {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String confirmPassword;

}
