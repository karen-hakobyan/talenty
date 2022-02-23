package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("tokens")
public class TokenDocument {

    @Id
    private String id;
    @Indexed(unique = true)
    private String value;
    private String userId;
    private Boolean expired;

    public TokenDocument(final String value, final String userId) {
        this.value = value;
        this.userId = userId;
        this.expired = false;
    }

}
