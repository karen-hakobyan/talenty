package com.talenty.logical_executors;

import com.talenty.domain.dto.user.AuthenticatedUser;
import com.talenty.domain.mongo.FieldDocument;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Map;

public class FieldsAutoCompleteExecutor implements LogicExecutor {

    @Override
    public FieldDocument execute(final FieldDocument field) {
        if (field == null || field.getFields() != null) return field;

        final AuthenticatedUser user = (AuthenticatedUser) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        if ("ROLE_JOB_SEEKER".equals(user.getRole())) {
            final Map<String, Object> metadata = field.getMetadata();
            final String type = field.getMetadata().get("type").toString();
            final String name = field.getName();

            if ("special_name".equals(type)) {
                if (name.equals("First name")) {
                    metadata.put("submitted_value", user.getFirstName());
                    metadata.put("autocomplete", true);
                }
                if (name.equals("Last name")) {
                    metadata.put("submitted_value", user.getLastName());
                    metadata.put("autocomplete", true);
                }
            }

            if ("email".equals(type) && name.equals("Email")) {
                metadata.put("submitted_value", user.getEmail());
                metadata.put("autocomplete", true);
            }
        }

        return field;
    }

    @Override
    public boolean needParentField() {
        return false;
    }

    @Override
    public void setCurrentParentField(FieldDocument field) {
    }

}
