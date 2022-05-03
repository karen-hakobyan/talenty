package com.talenty.logical_executors;

import com.talenty.domain.dto.JobAnnouncementInfoForSearchPage;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.InvalidSubmissionException;
import org.springframework.jmx.export.metadata.InvalidMetadataException;

import java.util.Map;
import java.util.Objects;

public class MakeJobAnnouncementSearchPageInformationExecutor implements LogicExecutor{

    private FieldDocument currentParentField;
    private final JobAnnouncementInfoForSearchPage jobAnnouncementInfoForSearchPage;

    public MakeJobAnnouncementSearchPageInformationExecutor(final JobAnnouncementInfoForSearchPage jobAnnouncementInfoForSearchPage) {
        this.jobAnnouncementInfoForSearchPage = jobAnnouncementInfoForSearchPage;
    }

    @Override
    public FieldDocument execute(FieldDocument field) {
        final Map<String, Object> metadata = field.getMetadata();

        if (metadata == null) {
            System.out.println("Metadata can't be null while making search page info for job announcement");
            throw new InvalidMetadataException("");
        }

        if (Objects.equals(currentParentField.getName(), "Country")) {
            final String submittedValue = metadata.get("submitted_value").toString();
            if (!metadata.containsKey("submitted_value")) {
                System.out.println("Invalid submission while trying to get submitted value for making search page info of job announcement");
                throw new InvalidSubmissionException();
            }
            this.jobAnnouncementInfoForSearchPage.setCountry(submittedValue);
        } else if (Objects.equals(currentParentField.getName(), "City")) {
            if (metadata.isEmpty()) {
                jobAnnouncementInfoForSearchPage.setCity("City is not specified");
            } else if (metadata.containsKey("submitted_value")) {
                final String submittedValue = metadata.get("submitted_value").toString();
                this.jobAnnouncementInfoForSearchPage.setCity(submittedValue);
            }
        } else if (Objects.equals(currentParentField.getName(), "Job type")) {
            final String submittedValue = metadata.get("submitted_value").toString();
            if (!metadata.containsKey("submitted_value")) {
                System.out.println("Invalid submission while trying to get submitted value for making search page info of job announcement");
                throw new InvalidSubmissionException();
            }
            this.jobAnnouncementInfoForSearchPage.setJobType(submittedValue);
        } else if (Objects.equals(currentParentField.getName(), "Description")) {
            final String submittedValue = metadata.get("submitted_value").toString();
            if (!metadata.containsKey("submitted_value")) {
                System.out.println("Invalid submission while trying to get submitted value for making search page info of job announcement");
                throw new InvalidSubmissionException();
            }
            this.jobAnnouncementInfoForSearchPage.setJobDescription(submittedValue);
        } else if (Objects.equals(currentParentField.getName(), "Responsibilities")) {
            if (metadata.isEmpty()) {
                jobAnnouncementInfoForSearchPage.setJobResponsibilities("Responsibilities is not specified");
            } else if (metadata.containsKey("submitted_value")) {
                final String submittedValue = metadata.get("submitted_value").toString();
                this.jobAnnouncementInfoForSearchPage.setJobResponsibilities(submittedValue);
            }
        }

        return field;
    }

    @Override
    public boolean needParentField() { return true; }

    @Override
    public void setCurrentParentField(final FieldDocument field) { this.currentParentField = field; }
}
