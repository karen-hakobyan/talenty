package com.talenty.logical_executors;

import com.talenty.domain.dto.user.AuthenticatedUser;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.InvalidAuthenticationWithJwt;
import com.talenty.service.AuthenticatedUserService;

import java.util.Map;
import java.util.Optional;

public class FieldsAutoCompleteExecutor implements LogicExecutor {

    @Override
    public void execute(final FieldDocument field) {
        if (field == null || field.getFields() != null) return;

        final AuthenticatedUser user = AuthenticatedUserService.getCurrentUser();

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
    }

    @Override
    public boolean needMatchableField() {
        return false;
    }

    @Override
    public void setCurrentBaseSourceField(final FieldDocument field) {
    }

}
