package com.talenty.validation;

import com.talenty.domain.dto.hr.HrRegisterRequestDetails;
import com.talenty.exceptions.*;

import java.util.Objects;
import java.util.regex.Pattern;

public class ValidationChecker {

    private static final Pattern EMAIL_REGEX = Pattern.compile("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/");
    private static final Pattern COMPANY_NAME_REGEX = Pattern.compile("/^[a-zA-Z]([a-zA-Z0-9.-_,]|[- @.#&!])*$/");
    private static final Pattern NAME_REGEX = Pattern.compile("^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\\.?)( [IVXLCDM]+)?$");
    private static final Pattern PASSWORD_REGEX = Pattern.compile("/(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/");

    public static boolean areDetailsValid(final HrRegisterRequestDetails details) {
        return isEmailValid(details.getEmail()) &&
                isCompanyNameValid(details.getCompanyName()) &&
                isNameValid(
                        details.getFirstname().replace(" ", "")
                                + " "
                                + details.getLastname().replace(" ", "")
                ) &&
                isPasswordValid(details.getPassword()) &&
                arePasswordsEqual(details.getPassword(), details.getConfirmPassword());
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

    private static boolean isPasswordValid(final String password) {
        if (!PASSWORD_REGEX.matcher(password).matches()) {
            throw new InvalidPasswordException();
        }
        return true;
    }

    private static boolean arePasswordsEqual(final String password, final String confirmPassword) {
        if (!Objects.equals(password, confirmPassword)) {
            throw new PasswordsDoNotMatchException();
        }
        return true;
    }

}
