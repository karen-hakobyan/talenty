package com.talenty.service;

import com.mongodb.BasicDBObject;
import com.talenty.domain.dto.CVTemplate;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.domain.mongo.HrDocument;
import com.talenty.exceptions.NoSuchTemplateException;
import com.talenty.exceptions.WrongOwnerException;
import com.talenty.logical_executors.AdminValuesMergeExecutor;
import com.talenty.logical_executors.DeletedFieldValidationExecutor;
import com.talenty.logical_executors.FieldsAutoCompleteExecutor;
import com.talenty.logical_executors.FieldsIdValidationExecutor;
import com.talenty.logical_executors.executor.Executor;
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
        return CVTemplateMapper.instance.documentToDto(getCvTemplateById(getSystemCvTemplateId(), true));
    }

    public String getSystemCvTemplateId() {
        return cvTemplateRepository.findSystemTemplateInfo().getId();
    }

    public CVTemplateDocument getCvTemplateById(final String id, final boolean withMetaData) {
        final Optional<CVTemplateDocument> cvTemplateDocumentOptional = cvTemplateRepository.findById(id);
        if (cvTemplateDocumentOptional.isEmpty()) {
            System.out.printf("Template with id '%s' is not found\n", id);
            throw new NoSuchTemplateException();
        }
        final CVTemplateDocument cvTemplateDocument = cvTemplateDocumentOptional.get();

        Executor.getInstance()
                .setChildFields(cvTemplateDocument.getFields())
                .executeLogic(
                        new FieldsAutoCompleteExecutor(),
                        applicationContext.getBean(AdminValuesMergeExecutor.class)
                );

        return cvTemplateDocument;
    }

    public CVTemplate createNewCvTemplate(final CVTemplate cvTemplate) {
        final CVTemplateDocument parentTemplate = getCvTemplateById(cvTemplate.getId(), true);
        final CVTemplateDocument newTemplate = CVTemplateMapper.instance.dtoToDocument(cvTemplate);

        ValidationChecker.assertCvTemplateSectionsNamesAreUnique(newTemplate);
        Executor.getInstance()
                .setParentFields(parentTemplate.getFields())
                .setChildFields(newTemplate.getFields())
                .executeLogic(
                        new FieldsIdValidationExecutor(),
                        new DeletedFieldValidationExecutor()
                );

        final HrDocument currentHr = hrService.getCurrentHr();
        newTemplate.setId(null);
        newTemplate.setOwnerId(currentHr.getId());
        newTemplate.setCompanyId(currentHr.getCompanyId());
        newTemplate.setMetadata(parentTemplate.getMetadata());
        final CVTemplateDocument savedNewTemplate = cvTemplateRepository.save(newTemplate);

        currentHr.addCvTemplate(savedNewTemplate.getId(), cvTemplate.getName());
        hrService.save(currentHr);

        return CVTemplateMapper.instance.documentToDto(savedNewTemplate);
    }

    public BasicDBObject getAllCvTemplates() {
        final HrDocument currentHr = hrService.getCurrentHr();
        final String companyId = currentHr.getCompanyId();
        final List<CVTemplateDocument> allByCompanyId = cvTemplateRepository.findAllByCompanyId(companyId);

        final BasicDBObject allCvTemplates = new BasicDBObject();
        for (final CVTemplateDocument e : allByCompanyId) {
            if (e.getMetadata().containsKey("status") && Objects.equals(e.getMetadata().get("status"), "DELETED")) {
                continue;
            }
            e.setFields(null);
            allCvTemplates.append(e.getId(), e.getName());
        }

        return allCvTemplates;
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

}

