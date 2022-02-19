package com.talenty.logical_executors;

import com.talenty.domain.mongo.FieldDocument;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Scope("prototype")
public class CleanUpMetadataExecutor implements LogicExecutor {

    private final String[] REMOVABLE_FIELDS = {"editable", "deletable", "required", "required_editable"};
    private final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    @Override
    public void execute(final FieldDocument... fields) {
        for (final GrantedAuthority authority : authentication.getAuthorities()) {
            if ("ROLE_JOB_SEEKER".equals(authority.getAuthority())) {
                final Map<String, Object> metadata = fields[0].getMetadata();
                for (final String removableField : REMOVABLE_FIELDS) {
                    metadata.remove(removableField);
                }
            }
        }
    }

}
