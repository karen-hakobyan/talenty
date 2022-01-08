package com.talenty.validation;

import com.talenty.domain.dto.user.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.*;
import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.lookups.v1.PhoneNumber;

import java.util.Map;
import java.util.Objects;
import java.util.regex.Pattern;

public class ValidationChecker {

    private static final Pattern EMAIL_REGEX = Pattern.compile("^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    private static final Pattern COMPANY_NAME_REGEX = Pattern.compile("^[a-zA-Z]([a-zA-Z0-9.-_,]|[- @.#&!])*$");
    private static final Pattern NAME_REGEX = Pattern.compile("^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\\.?)( [IVXLCDM]+)?$");
    private static final Pattern PASSWORD_REGEX = Pattern.compile("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");
    private static final Pattern DATE_REGEX = Pattern.compile("^\\d{2}?[/]\\d{2}?[/]\\d{4}$");
    private static final Pattern SALARY_REGEX = Pattern.compile("^\\d+\\.\\d+$");
    private static final Pattern PHONE_NUMBER_REGEX = Pattern.compile("[+]\\d{1,17}$");

    static {
        Twilio.init("AC237081575f7fa8e68cab48cbe22cb671", "9ed7c87ae1a51f514d496d631930f4ed");
    }

    public static boolean assertDetailsAreValid(final HrRegisterRequestDetails details) {
        return isEmailValid(details.getEmail()) &&
                isCompanyNameValid(details.getCompanyName()) &&
                isNameValid(
                        details.getFirstName().replace(" ", "")
                                + " "
                                + details.getLastName().replace(" ", "")
                ) &&
                assertPasswordIsValid(details.getPassword()) &&
                assertPasswordsAreEqual(details.getPassword(), details.getConfirmPassword());
    }

    public static boolean assertDetailsAreValid(final JobSeekerRegisterRequestDetails details) {
        return isEmailValid(details.getEmail()) &&
                isNameValid(
                        details.getFirstName().replace(" ", "")
                                + " "
                                + details.getLastName().replace(" ", "")
                ) &&
                assertPasswordIsValid(details.getPassword()) &&
                assertPasswordsAreEqual(details.getPassword(), details.getConfirmPassword());
    }

    public static boolean assertSectionIsValid(final FieldDocument section) {
        final Map<String, Object> sectionMetadata = section.getMetadata();
        if (sectionMetadata.containsKey("selected_values") && sectionMetadata.get("selected_values").equals("only_one")) {
            int temp = 0;
            for (final FieldDocument field : section.getFields()) {
                if (field.getMetadata().containsKey("submitted_value")) {
                    if (++temp > 1) throw new InvalidSectionException();
                }
            }
        }
        return true;
    }

    public static boolean assertSubmittedFieldIsValid(final Map<String, Object> submittedMetadata, final Map<String, Object> parentMetadata) {
        final Object submittedValue = submittedMetadata.get("submitted_value");
        switch ((String) parentMetadata.get("type")) {

            case "phone_number": {
                assertPhoneNumberIsValid((String) submittedValue);
                break;
            }

            case "email": {
                assertLengthIsValid(submittedMetadata, parentMetadata);
                isEmailValid((String) submittedValue);
                break;
            }

            case "add_photo": {
                System.out.println("add_photo");
                break;
            }

            case "date": {
                break;
            }

            case "expected_salary": {
                assertLengthIsValid(submittedMetadata, parentMetadata);
                if (!SALARY_REGEX.matcher((String) submittedValue).matches())
                    throw new InvalidDateFormatException();
                break;
            }

            case "salary_type":
            case "gender": {
                System.out.println("admin check");
                break;
            }

            case "special_name":
                assertLengthIsValid(submittedMetadata, parentMetadata);
            case "country":
            case "city": {
                isNameValid((String) submittedValue);
                break;
            }

            case "url":
            case "text":
            case "address":
            case "description":
            case "social_link": {
                assertLengthIsValid(submittedMetadata, parentMetadata);
                break;
            }

            case "percentage":
            case "military_id":
            case "current_date":
            case "language_level":
            case "driving_license": {
                if (submittedValue != null && !submittedValue.equals("selected"))
                    throw new InvalidPercentageValueException();
                break;
            }

            default:
                System.out.println("No such type");
        }
        return true;
    }

    private static boolean assertLengthIsValid(final Map<String, Object> submittedMetadata, final Map<String, Object> parentMetadata) {
        final String value = (String) submittedMetadata.get("submitted_value");
        final double maxLength = (double) parentMetadata.get("maxLength");

        if (value.length() > maxLength) {
            throw new InvalidFieldLengthException();
        }
        return true;
    }

    private static boolean isEmailValid(final String email) {
        if (!EMAIL_REGEX.matcher(email).matches()) {
            throw new InvalidEmailException();
        }
        return true;
    }

    private static boolean isCompanyNameValid(final String companyName) {
        if (!COMPANY_NAME_REGEX.matcher(companyName).matches()) {
            throw new InvalidCompanyNameException();
        }
        return true;
    }

    private static boolean isNameValid(final String name) {
        if (!NAME_REGEX.matcher(name).matches()) {
            throw new InvalidUserNameException();
        }
        return true;
    }

    public static boolean assertPasswordIsValid(final String password) {
        if (!PASSWORD_REGEX.matcher(password).matches()) {
            throw new InvalidPasswordException();
        }
        return true;
    }

    public static boolean assertPasswordsAreEqual(final String password, final String confirmPassword) {
        if (!Objects.equals(password, confirmPassword)) {
            throw new PasswordsDoNotMatchException();
        }
        return true;
    }

    public static boolean assertPhoneNumberIsValid(final String phoneNumber) {
        if (!PHONE_NUMBER_REGEX.matcher(phoneNumber).matches()) throw new InvalidPhoneNumberException();
        try {
            PhoneNumber.fetcher(new com.twilio.type.PhoneNumber(phoneNumber)).fetch();
            return true;
        } catch (final ApiException e) {
            throw new InvalidPhoneNumberException();
        }
    }

}