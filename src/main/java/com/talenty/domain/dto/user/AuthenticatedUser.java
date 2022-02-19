package com.talenty.domain.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuthenticatedUser {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private boolean verifiedAccount;

}
