package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "navigation_bar")
public class NavigationBarDocument {

    @Id
    private String id;
    private String name;
    private List<FieldDocument> fields;
    private Map<String, Object> metadata;

}
