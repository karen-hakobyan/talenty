package com.talenty.domain.dto.user.hr;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HrRegisterRequestDetails {

    private String companyName;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String confirmPassword;

}
