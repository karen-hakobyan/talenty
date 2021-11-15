package com.talenty.domain.mongo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@Document("tokens")
public class TokenDocument {

    private String value;
    private String userId;

}
