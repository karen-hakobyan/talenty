package com.talenty.domain.mongo;

import com.talenty.domain.dto.ProfileDetails;
import com.talenty.enums.ProfileStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "users")
@TypeAlias("job_seeker")
public class JobSeekerDocument extends UserDocument {

    private String cvTemplateId;
    private ProfileStatus profileStatus;
    private String headline;

}
