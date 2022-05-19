package com.talenty.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.talenty.enums.ProfileStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileDetails {
    @JsonProperty("profile_status")
    private ProfileStatus profileStatus;
    private String fullName;
    private String email;
    private String headline;
    private double profileCompleteness;
    @JsonProperty("image_url")
    private String imageUrl = "default";
}
