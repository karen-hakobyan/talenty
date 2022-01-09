import com.talenty.domain.mongo.FieldDocument;
import com.talenty.validation.ValidationChecker;
import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestValidationChecker {

    @Test
    public void testValidatorChecker() {
        assertTrue(ValidationChecker.assertPhoneNumberIsValid("+37491425103"));

        assertTrue(ValidationChecker.assertPhoneNumberIsValid("+4917670876926"));
        assertTrue(ValidationChecker.assertPhoneNumberIsValid("+4917632134684"));
        assertTrue(ValidationChecker.assertPhoneNumberIsValid("+4917656626859"));

        final FieldDocument a = new FieldDocument();
        final FieldDocument b = new FieldDocument();
        a.setMetadata(Collections.singletonMap("submitted_value", "1/2/2022"));
        b.setMetadata(Collections.singletonMap("type", "date"));

        assertTrue(ValidationChecker.assertSubmittedFieldIsValid(a, b));

    }

    @Test
    public void dateValidation() {

        final FieldDocument a = new FieldDocument();
        final FieldDocument b = new FieldDocument();
        a.setMetadata(Collections.singletonMap("submitted_value", "29/02/2020"));
        b.setMetadata(Collections.singletonMap("type", "date"));

        assertTrue(ValidationChecker.assertSubmittedFieldIsValid(a, b));

    }

}
