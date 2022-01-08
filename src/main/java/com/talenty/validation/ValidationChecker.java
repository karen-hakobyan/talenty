package com.talenty.validation;

import com.talenty.domain.dto.user.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.exceptions.*;

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

    public static boolean assertSubmittedFieldIsValid(final Map<String, Object> submittedMetadata, final Map<String, Object> parentMetadata) {
        switch ((String) parentMetadata.get("type")) {

            case "special_name": {
                assertLengthIsValid(submittedMetadata, parentMetadata);
                isNameValid((String) submittedMetadata.get("submitted_value"));
                break;
            }
            case "gender": {
                System.out.println("gender");
                break;
            }

            case "phone_number": {
                System.out.println("phone_number");
                break;
            }

            case "email": {
                assertLengthIsValid(submittedMetadata, parentMetadata);
                isEmailValid((String) submittedMetadata.get("submitted_value"));
                break;
            }

            case "expected_salary": {
                assertLengthIsValid(submittedMetadata, parentMetadata);
                final String value = (String) submittedMetadata.get("submitted_value");
                if (!SALARY_REGEX.matcher(value).matches()) {
                    throw new InvalidDateFormatException();
                }
                break;
            }

            case "url":
            case "description":
            case "text":
            case "address":
            case "social_link": {
                assertLengthIsValid(submittedMetadata, parentMetadata);
                break;
            }

            case "country": {
                System.out.println("country");
                break;
            }

            case "city": {
                System.out.println("city");
                break;
            }

            case "salary_type": {
                System.out.println("salary_type");
                break;
            }

            case "add_photo": {
                System.out.println("add_photo");
                break;
            }

            case "current_date":
            case "military_id":
            case "driving_license": {
                break;
            }

            case "date": {
                final String value = (String) submittedMetadata.get("submitted_value");
                if (!DATE_REGEX.matcher(value).matches()) {
                    throw new InvalidDateFormatException();
                }
                break;
            }

            case "language_level":
            case "percentage": {
                final Object percentage = submittedMetadata.get("submitted_value");
                if (percentage != null && !percentage.equals("selected")) {
                    throw new InvalidPercentageValueException();
                }
                break;
            }

            default:
                System.out.println("No such type");
        }
        return true;
    }

    private static boolean assertLengthIsValid(final Map<String, Object> submittedMetadata, final Map<String, Object> parentMetadata) {
        final String value = (String) submittedMetadata.get("submitted_value");
        final int maxLength = (int) parentMetadata.get("maxLength");

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

}