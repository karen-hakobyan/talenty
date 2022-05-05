package com.talenty.logical_executors;

import com.talenty.domain.dto.JobAnnouncementBasicInfo;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.InvalidSubmissionException;
import org.springframework.jmx.export.metadata.InvalidMetadataException;

import java.util.Map;
import java.util.Objects;

public class MakeBasicJobAnnouncementInformationExecutor implements LogicExecutor {

    private FieldDocument currentParentField;
    private final JobAnnouncementBasicInfo jobAnnouncementBasicInfo;

    public MakeBasicJobAnnouncementInformationExecutor(final JobAnnouncementBasicInfo jobAnnouncementBasicInfo) {
        this.jobAnnouncementBasicInfo = jobAnnouncementBasicInfo;
    }

    @Override
    public FieldDocument execute(final FieldDocument field) {
        final Map<String, Object> metadata = field.getMetadata();

        if (metadata == null) {
            System.out.println("Metadata can't be null while making basic info for job announcement");
            throw new InvalidMetadataException("");
        }

        if (Objects.equals(currentParentField.getName(), "Deadline")) {
            if (!metadata.containsKey("submitted_value")) {
                System.out.println("Invalid submission while trying to get submitted value for making basic info of job announcement");
                throw new InvalidSubmissionException();
            }
            final String submittedValue = metadata.get("submitted_value").toString();
            this.jobAnnouncementBasicInfo.setDeadline(submittedValue);
        } else if (Objects.equals(currentParentField.getName(), "Country")) {
            if (!metadata.containsKey("submitted_value")) {
                System.out.println("Invalid submission while trying to get submitted value for making basic info of job announcement");
                throw new InvalidSubmissionException();
            }
            final String submittedValue = metadata.get("submitted_value").toString();
            this.jobAnnouncementBasicInfo.setCountry(submittedValue);
        }

        return field;
    }


    @Override
    public boolean needParentField() {
        return true;
    }

    @Override
    public void setCurrentParentField(final FieldDocument field) {
        this.currentParentField = field;
    }

}
