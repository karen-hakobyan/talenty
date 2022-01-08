import com.talenty.validation.ValidationChecker;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestValidationChecker {

    @Test
    public void testValidatorChecker() {
        assertTrue(ValidationChecker.assertPhoneNumberIsValid("+37491425103"));

        assertTrue(ValidationChecker.assertPhoneNumberIsValid("+4917670876926"));
        assertTrue(ValidationChecker.assertPhoneNumberIsValid("+4917632134684"));
        assertTrue(ValidationChecker.assertPhoneNumberIsValid("+4917656626859"));
    }

}
