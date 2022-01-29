package com.talenty.service;

import com.talenty.domain.dto.Template;
import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.mapper.TemplateMapper;
import com.talenty.repository.TemplateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;
    private final TypeValuesService typeValuesService;

    public TemplateService(final TemplateRepository templateRepository, final TypeValuesService typeValuesService) {
        this.templateRepository = templateRepository;
        this.typeValuesService = typeValuesService;
    }

    public Template getSystemTemplate() {
        final TemplateDocument systemTemplate = templateRepository.findSystemTemplateId();
        return TemplateMapper.instance.documentToDto(getTemplateById(systemTemplate.getId()).get());
    }

    public Optional<TemplateDocument> getTemplateById(final String id) {
        final Optional<TemplateDocument> templateDocumentOptional = templateRepository.findById(id);
        if (templateDocumentOptional.isEmpty()) {
            return Optional.empty();
        }
        final TemplateDocument templateDocument = templateDocumentOptional.get();

        final List<TypeValues> adminDefinedTypeValues = typeValuesService.getTypesWithValues();
        modifyFields(templateDocument.getFields(), adminDefinedTypeValues);

        return Optional.of(templateDocument);
    }

    private void modifyFields(final List<FieldDocument> fields, final List<TypeValues> typeValues) {
        for (final FieldDocument field : fields) {

            final List<FieldDocument> fieldFields = field.getFields();
            if (fieldFields != null) { //section
                modifyFields(fieldFields, typeValues);
            } else { //field
                final Map<String, Object> metadata = field.getMetadata();
                if (metadata == null) {
                    continue;
                }
                for (final TypeValues typeValue : typeValues) {
                    if (typeValue.getType().equals(metadata.get("type"))) {
                        metadata.put("values", typeValue.getValues());
                    }
                }
            }
        }
    }

}
