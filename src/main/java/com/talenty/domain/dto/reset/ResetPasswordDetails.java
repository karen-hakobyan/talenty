package com.talenty.domain.dto.reset;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ResetPasswordDetails {

    private String password;
    private String confirmPassword;

}
