package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Getter
@Setter
public class FieldDocument {

    @Id
    private String id;
    private String name;
    private List<FieldDocument> fields;
    private Map<String, Object> metadata;

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof FieldDocument)) {
            return false;
        }
        final FieldDocument other = (FieldDocument) obj;
        return Objects.equals(id, other.getId());
    }

    @Override
    public String toString() {
        return "FieldDocument{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }

}
