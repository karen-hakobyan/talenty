package com.talenty.service;

import com.talenty.domain.mongo.FieldDocument;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Service
public class FieldService {

    public static boolean isFieldNew(final FieldDocument field) {
        final Map<String, Object> metadata = field.getMetadata();
        return metadata.containsKey("status") && Objects.equals(metadata.get("status"), "NEW");
    }

}
