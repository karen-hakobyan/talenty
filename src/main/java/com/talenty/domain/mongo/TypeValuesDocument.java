package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "type_values")
public class TypeValuesDocument {

    @Id
    private String id;
    @Indexed(unique = true)
    private String type;
    private List<String> values;

}
