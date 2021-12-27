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
            case "text": {
                System.out.println("text");
                break;
            }

            case "gender": {
                System.out.println("gender");
                break;
            }

            case "day": {
                System.out.println("day");
                break;
            }

            case "month": {
                System.out.println("month");
                break;
            }

            case "year": {
                System.out.println("year");
                break;
            }

            case "phone_number": {
                System.out.println("phone_number");
                break;
            }

            case "email": {
                System.out.println("email");
                break;
            }

            case "social_link": {
                System.out.println("social_link");
                break;
            }

            case "country": {
                System.out.println("country");
                break;
            }

            case "expected_salary": {
                System.out.println("expected_salary");
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

            case "military_id": {
                System.out.println("military_id");
                break;
            }

            case "driving_license": {
                System.out.println("driving_license");
                break;
            }

            case "date": {
                System.out.println("date");
                break;
            }

            case "percentage": {
                System.out.println("percentage");
                break;
            }

            case "language_level": {
                System.out.println("language_level");
                break;
            }

            case "description": {
                System.out.println("description");
                break;
            }

            case "url": {
                System.out.println("url");
                break;
            }

            default:
                System.out.println("No such type");
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