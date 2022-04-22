package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BaseTemplateDocument {

    @Id
    private String id;
    private String name;
    private List<FieldDocument> fields;
    private String ownerId;

}
