package com.talenty.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.talenty.enums.ProfileStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileStatusWrapper {
    @JsonProperty("profile_status")
    private ProfileStatus profileStatus;
}
