package com.talenty.logical_executors;

import com.talenty.domain.dto.user.AuthenticatedUser;
import com.talenty.domain.mongo.FieldDocument;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Map;

public class CleanUpMetadataExecutor implements LogicExecutor {

    private final String[] REMOVABLE_FIELDS = {"editable", "deletable", "required", "required_editable"};

    @Override
    public FieldDocument execute(final FieldDocument field) {
        final AuthenticatedUser user = (AuthenticatedUser) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        if ("ROLE_JOB_SEEKER".equals(user.getRole())) {
            final Map<String, Object> metadata = field.getMetadata();
            Arrays.stream(REMOVABLE_FIELDS).forEach(metadata::remove);
        }
        return field;
    }

    @Override
    public boolean needParentField() {
        return false;
    }

    @Override
    public void setCurrentParentField(final FieldDocument field) {
    }

}
