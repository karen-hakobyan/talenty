package com.talenty.validation;

import com.talenty.domain.dto.user.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.exceptions.*;
import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.lookups.v1.PhoneNumber;

import java.time.LocalDate;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Pattern;

public class ValidationChecker {

    private static final Pattern EMAIL_REGEX = Pattern.compile("^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    private static final Pattern COMPANY_NAME_REGEX = Pattern.compile("^[a-zA-Z]([a-zA-Z0-9.-_,]|[- @.#&!])*$");
    private static final Pattern NAME_REGEX = Pattern.compile("^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\\.?)( [IVXLCDM]+)?$");
    private static final Pattern PASSWORD_REGEX = Pattern.compile("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");
    private static final Pattern DATE_REGEX = Pattern.compile("^\\d{2}?[/]\\d{2}?[/]\\d{4}$");
    private static final Pattern SALARY_REGEX = Pattern.compile("\\d*\\.?\\d+$");
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

    public static boolean assertSubmittedFieldIsValid(final FieldDocument submittedField, final FieldDocument parentField) {
        final String submittedValue = (String) submittedField.getMetadata().get("submitted_value");
        final String type = (String) parentField.getMetadata().get("type");
        switch (type) {

            case "phone_number": {
                assertPhoneNumberIsValid(submittedValue);
                break;
            }

            case "email": {
                assertLengthIsValid(submittedField, parentField);
                isEmailValid(submittedValue);
                break;
            }

            case "add_photo": {
                System.out.println("add_photo");
                break;
            }

            case "date": {
                if (!DATE_REGEX.matcher(submittedValue).matches()) {
                    System.out.println("Invalid date format!");
                    throw new InvalidDateFormatException();
                }
                final String[] DMY = submittedValue.split("/");
                try {
                    LocalDate.of(
                            Integer.parseInt(DMY[2]),
                            Integer.parseInt(DMY[1]),
                            Integer.parseInt(DMY[0])
                    );
                } catch (final Exception e) {
                    System.out.println("Invalid date!");
                    throw new InvalidDateFormatException();
                }
                break;
            }

            case "expected_salary": {
                assertLengthIsValid(submittedField, parentField);
                if (!SALARY_REGEX.matcher(submittedValue).matches()) {
                    System.out.println("Salary must contain only numbers!");
                    throw new InvalidDateFormatException();
                }
                break;
            }

            case "salary_type":
            case "gender": {
                System.out.println("admin check");
                break;
            }

            case "special_name":
                assertLengthIsValid(submittedField, parentField);
            case "country":
            case "city": {
                isNameValid(submittedValue);
                break;
            }

            case "url":
            case "text":
            case "address":
            case "description":
            case "social_link": {
                assertLengthIsValid(submittedField, parentField);
                break;
            }

            case "percentage":
            case "military_id":
            case "current_date":
            case "language_level":
            case "driving_license": {
                if (submittedValue != null && !submittedValue.equals("selected")) {
                    System.out.printf("%s should be selected/unselected or nothing!", type);
                    throw new InvalidPercentageValueException();
                }
                break;
            }

            default:
                System.out.println("No such type");
        }
        return true;
    }

    private static boolean assertLengthIsValid(final FieldDocument submittedField, final FieldDocument parentField) {
        if (!parentField.getMetadata().containsKey("maxLength")) return true;

        final String value = (String) submittedField.getMetadata().get("submitted_value");
        final double maxLength = (Double) parentField.getMetadata().get("maxLength");

        if (value.length() > maxLength) {
            final String cause = String.format(
                    "Submitted Field size is bigger than expected. Field: %s, given size: %s, expected size: %s",
                    submittedField,
                    value.length(),
                    maxLength
            );
            System.out.println(cause);
            throw new InvalidFieldLengthException(cause);
        }

        return true;
    }

    private static boolean isEmailValid(final String email) {
        if (!EMAIL_REGEX.matcher(email).matches()) {
            System.out.println("Email format exception!");
            throw new InvalidEmailException();
        }
        return true;
    }

    private static boolean isCompanyNameValid(final String companyName) {
        if (!COMPANY_NAME_REGEX.matcher(companyName).matches()) {
            System.out.println("Company name format exception!");
            throw new InvalidCompanyNameException();
        }
        return true;
    }

    private static boolean isNameValid(final String name) {
        if (!NAME_REGEX.matcher(name).matches()) {
            System.out.println("Name format exception!");
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
        if (!PHONE_NUMBER_REGEX.matcher(phoneNumber).matches()) {
            System.out.println("Incorrect phone number format!");
            throw new InvalidPhoneNumberException();
        }
        try {
            PhoneNumber.fetcher(new com.twilio.type.PhoneNumber(phoneNumber)).fetch();
            return true;
        } catch (final ApiException e) {
            System.out.println("Incorrect phone number format!");
            throw new InvalidPhoneNumberException();
        }
    }

}