package com.talenty.domain.dto.hr;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HrRegisterRequestDetails {

    private String companyName;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String confirmPassword;

}
