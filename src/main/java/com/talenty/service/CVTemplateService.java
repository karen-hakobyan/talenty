package com.talenty.service;

import com.mongodb.BasicDBObject;
import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.exceptions.WrongOwnerException;
import com.talenty.executor.BaseSource;
import com.talenty.logical_executors.*;
import com.talenty.executor.Executor;
import com.talenty.mapper.CVTemplateMapper;
import com.talenty.repository.CVTemplateRepository;
import com.talenty.validation.ValidationChecker;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CVTemplateService {

    private final CVTemplateRepository cvTemplateRepository;
    private final ApplicationContext applicationContext;
    private final HrService hrService;

    public CVTemplateService(final CVTemplateRepository cvTemplateRepository,
                             final ApplicationContext applicationContext,
                             final HrService hrService) {
        this.cvTemplateRepository = cvTemplateRepository;
        this.applicationContext = applicationContext;
        this.hrService = hrService;
    }

    public CVTemplate getSystemCvTemplate() {
        final CVTemplateDocument systemCvTemplate = findSystemCvTemplate();
        Executor.getInstance()
                .setIterableFields(systemCvTemplate.getFields())
                .executeLogic(
                        new FieldsAutoCompleteExecutor(),
                        applicationContext.getBean(AdminValuesMergeExecutor.class)
                );
        return CVTemplateMapper.instance.documentToDto(systemCvTemplate);
    }

    public CVTemplateDocument getCvTemplateById(final String id, final boolean withMetaData) {
        final Optional<CVTemplateDocument> cvTemplateDocumentOptional = cvTemplateRepository.findById(id);
        if (cvTemplateDocumentOptional.isEmpty()) {
            System.out.printf("Template with id '%s' is not found\n", id);
            throw new NoSuchTemplateException();
        }
        final CVTemplateDocument cvTemplateById = cvTemplateDocumentOptional.get();
        final CVTemplateDocument systemTemplate = findSystemCvTemplate();

        Executor.getInstance()
                .setIterableFields(systemTemplate.getFields())
                .setMatchableFields(cvTemplateById.getFields())
                .setSourceParent(BaseSource.ITERABLE)
                .executeLogic(
                        applicationContext.getBean(AdminValuesMergeExecutor.class),
                        new MergeFieldsExecutor()
                );

        return cvTemplateById;
    }

    public CVTemplate createNewCvTemplate(final CVTemplate cvTemplate) {
        final CVTemplateDocument newTemplate = CVTemplateMapper.instance.dtoToDocument(cvTemplate);
        final CVTemplateDocument systemCvTemplate = findSystemCvTemplate();

        ValidationChecker.assertCvTemplateSectionsNamesAreUnique(newTemplate);
        Executor.getInstance()
                .setIterableFields(systemCvTemplate.getFields())
                .executeLogic(
                        applicationContext.getBean(AdminValuesMergeExecutor.class)
                )
                .after()
                .setIterableFields(systemCvTemplate.getFields())
                .setMatchableFields(newTemplate.getFields())
                .setSourceParent(BaseSource.ITERABLE)
                .executeLogic(
                        new FieldsIdValidationExecutor(),
                        new DeletedFieldValidationExecutor()
                )
                .after()
                .setIterableFields(newTemplate.getFields())
                .executeLogic(
//                        new CleanUpMetadataExecutor(true, "required"),
                        new NewFieldValidationExecutor()
                );

        final HrDocument currentHr = hrService.getCurrentHr();
        newTemplate.setId(null);
        newTemplate.setOwnerId(currentHr.getId());
        newTemplate.setCompanyId(currentHr.getCompanyId());
        newTemplate.setMetadata(systemCvTemplate.getMetadata());
        final CVTemplateDocument savedNewTemplate = cvTemplateRepository.save(newTemplate);

        currentHr.addCvTemplate(savedNewTemplate.getId(), cvTemplate.getName());
        hrService.save(currentHr);

        return CVTemplateMapper.instance.documentToDto(savedNewTemplate);
    }

    public BasicDBObject getAllCvTemplates() {
        final HrDocument currentHr = hrService.getCurrentHr();
        final List<CVTemplateDocument> allByCompanyId = cvTemplateRepository.findAllByCompanyId(currentHr.getCompanyId());

        final BasicDBObject allCvTemplates = new BasicDBObject();
        for (final CVTemplateDocument template : allByCompanyId) {
            if (template.getMetadata().containsKey("status")
                    && Objects.equals(template.getMetadata().get("status"), "DELETED")) {
                continue;
            }
            template.setFields(null);
            allCvTemplates.append(template.getId(), template.getName());
        }

        return allCvTemplates;
    }

    public CVTemplateDocument findSystemCvTemplate() {
        return cvTemplateRepository.findSystemTemplate();
    }

    public BasicDBObject deleteCreatedCvTemplateById(final String id) {
        final CVTemplateDocument cvTemplateById = getCvTemplateById(id, true);
        final HrDocument currentHr = hrService.getCurrentHr();
        final String ownerId = cvTemplateById.getOwnerId();

        if (!Objects.equals(ownerId, currentHr.getId())) {
            System.out.printf("Owner with id %s tried to delete cv of owner with id %s\n", ownerId, currentHr.getId());
            throw new WrongOwnerException();
        }

        final Map<String, Object> metadata = cvTemplateById.getMetadata();

        if (!metadata.containsKey("count")) metadata.put("count", 0);

        final double count = Double.parseDouble((metadata.get("count").toString()));
        if (count > 0) {
            metadata.put("status", "DELETED");
            return getAllCvTemplates();
        }

        currentHr.deleteCvTemplate(id);
        hrService.save(currentHr);
        return getAllCvTemplates();
    }

    public void updateCountIfNeeded(final CVTemplateDocument parentTemplate) {
        final Optional<CVTemplateDocument> byId = cvTemplateRepository.findById(parentTemplate.getId());
        if (byId.isEmpty()) {
            System.out.printf("Template with id '%s' is not found\n", parentTemplate.getId());
            throw new NoSuchTemplateException();
        }

        final CVTemplateDocument cvTemplateDocument = byId.get();
        if (cvTemplateDocument.getSystem()) return;

        final Map<String, Object> metadata = cvTemplateDocument.getMetadata();
        final Map<String, Object> newMetadata = new HashMap<>();
        if (metadata != null) {
            newMetadata.putAll(metadata);
            final Object count = metadata.get("count");
            Double currentCount = null;
            if (count != null) currentCount = Double.parseDouble(count.toString());
            if (currentCount == null) {
                newMetadata.put("count", 1);
            } else {
                newMetadata.put("count", (currentCount + 1));
            }
        } else {
            newMetadata.put("count", 1);
        }
        cvTemplateDocument.setMetadata(newMetadata);

        cvTemplateRepository.save(cvTemplateDocument);
    }

    public CVTemplateDocument save(final CVTemplateDocument document) {
        return cvTemplateRepository.save(document);
    }

    public CVTemplate edit(final CVTemplate editedCvTemplate) {
        final CVTemplateDocument parentTemplate = getCvTemplateById(editedCvTemplate.getId(), true);

        final Map<String, Object> parentMetadata = parentTemplate.getMetadata();
        if (!parentMetadata.containsKey("editable") || !((Boolean) parentMetadata.get("editable"))) {
            System.out.printf("Couldn't edit cv template with id '%s'\n", editedCvTemplate.getId());
            throw new NoSuchTemplateException();
        }
        if (!parentMetadata.containsKey("count")) parentMetadata.put("count", 0);

        final CVTemplateDocument editedCvTemplateDocument = CVTemplateMapper.instance.dtoToDocument(editedCvTemplate);

        double count = Double.parseDouble(parentMetadata.get("count").toString());

        if (count > 0) {
            editedCvTemplateDocument.setId(null);
            if (Objects.equals(parentTemplate.getName(), editedCvTemplateDocument.getName())) {
                parentTemplate.getMetadata().put("status", "DELETED");
                cvTemplateRepository.save(parentTemplate);
            }
        }

        ValidationChecker.assertCvTemplateSectionsNamesAreUnique(editedCvTemplateDocument);
        Executor.getInstance()
                .setIterableFields(parentTemplate.getFields())
                .setMatchableFields(editedCvTemplateDocument.getFields())
                .setSourceParent(BaseSource.ITERABLE)
                .executeLogic(
                        new FieldsIdValidationExecutor(),
                        new DeletedFieldValidationExecutor()
                )
                .after()
                .setIterableFields(editedCvTemplateDocument.getFields())
                .executeLogic(
//                        new CleanUpMetadataExecutor(true),
                        new NewFieldValidationExecutor()
                );

        editedCvTemplateDocument.setOwnerId(parentTemplate.getOwnerId());
        editedCvTemplateDocument.setCompanyId(parentTemplate.getCompanyId());
        editedCvTemplateDocument.setMetadata(Map.of("editable", true, "count", 0));
        return CVTemplateMapper.instance.documentToDto(save(editedCvTemplateDocument));
    }

}
