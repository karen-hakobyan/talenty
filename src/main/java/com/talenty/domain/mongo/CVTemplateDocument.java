package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("cv_templates")
public class CVTemplateDocument extends BaseTemplateDocument {

    private String companyId;

}
