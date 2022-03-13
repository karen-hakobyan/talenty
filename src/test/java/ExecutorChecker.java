import com.talenty.domain.mongo.FieldDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.logical_executors.Executor;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExecutorChecker {

    @Test
    public void executeLogicOnFields() {

        final TemplateDocument template = new TemplateDocument();
        template.setId("1");
        template.setName("TEST template");

        final List<FieldDocument> sections = new ArrayList<>();

        final FieldDocument section = new FieldDocument();
        final FieldDocument field = new FieldDocument();
        field.setId("3");
        field.setName("Test field");
        field.setFields(null);
        final Map<String, Object> fieldMetadata = new HashMap<>();
        fieldMetadata.put("submitted_value", "Rafo");
        field.setMetadata(fieldMetadata);

        section.setId("2");
        section.setName("Test Section");
        final Map<String, Object> sectionMetadata = new HashMap<>();
        sectionMetadata.put("type", "section");
        sectionMetadata.put("deleteable", false);
        sectionMetadata.put("display", "fold");
        section.setMetadata(sectionMetadata);

        final List<FieldDocument> sectionFields = new ArrayList<>();
        sectionFields.add(field);
        section.setFields(sectionFields);

        sections.add(section);
        template.setFields(sections);

        Executor.executeLogicOnFields(
                template.getFields()
        );

    }

}
