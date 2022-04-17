package com.talenty.validation;

import com.mongodb.BasicDBList;
import com.talenty.domain.dto.user.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.domain.mongo.CVTemplateDocument;
import com.talenty.exceptions.*;
import com.talenty.logical_executors.CleanUpMetadataExecutor;
import com.talenty.logical_executors.SectionContainerFieldsTypesValidationExecutor;
import com.talenty.logical_executors.SubmittedFieldValueValidationExecutor;
import com.talenty.logical_executors.executor.Executor;
import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.lookups.v1.PhoneNumber;
import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.util.*;
import java.util.regex.Pattern;

public class ValidationChecker {

    private static final List<String> COUNTRIES = new ArrayList<>(Arrays.asList("Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe", "Palestine"));
    private static final Pattern EMAIL_REGEX = Pattern.compile("^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    private static final Pattern COMPANY_NAME_REGEX = Pattern.compile("^[a-zA-Z]([a-zA-Z0-9.-_,]|[- @.#&!])*$");
    private static final Pattern NAME_REGEX = Pattern.compile("^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\\.?)( [IVXLCDM]+)?$");
    private static final Pattern PASSWORD_REGEX = Pattern.compile("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");
    private static final Pattern DATE_REGEX = Pattern.compile("^\\d{2}?[/]\\d{2}?[/]\\d{4}$");
    private static final Pattern SALARY_REGEX = Pattern.compile("\\d*\\.?\\d+$");
    private static final Pattern PHONE_NUMBER_REGEX = Pattern.compile("[+]\\d{1,17}$");
    private static final Pattern URL_REGEX = Pattern.compile("^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]");

    static {
        Twilio.init("AC237081575f7fa8e68cab48cbe22cb671", "9ed7c87ae1a51f514d496d631930f4ed");
    }

    public static boolean assertSubmittedFieldIsValid(final FieldDocument submittedField, final FieldDocument parentField) {
        // we are sure, that 'submitted_value' exists if required. Checked by RequiredFieldValidationExecutor.
        final String submittedValue = (String) submittedField.getMetadata().get("submitted_value").toString();
        final String type = (String) parentField.getMetadata().get("type");
        final Map<String, Object> parentMetadata = parentField.getMetadata();

        if (parentMetadata.containsKey("values")) {
            final ArrayList<String> values = (ArrayList<String>) parentMetadata.get("values");
            if (values.contains(submittedValue)) return true;
        }

        switch (type) {

            case "phone_number": {
                assertPhoneNumberIsValid(submittedValue);
                break;
            }

            case "email": {
                assertLengthIsValid(submittedField, parentField);
                assertEmailIsValid(submittedValue);
                break;
            }

            case "add_photo": {
                System.out.println("add_photo");
                break;
            }

            case "date":
            case "deadline": {
                // TODO edit deadline logic deadline > currentDate
                assertDateIsValid(submittedValue);
                break;
            }

            case "salary": {
                assertLengthIsValid(submittedField, parentField);
                assertSalaryisValid(submittedValue);
                break;
            }

            // Value types (types which must always contain [values])
            case "simple_evaluate_bar":
            case "language_evaluate_bar": {
                System.out.printf("Invalid submission of Type '%s', sumbitted value '%s'\n", type, submittedValue);
                throw new InvalidEvaluateBarException();
            }
            case "language": {
                System.out.printf("Invalid submission of Type '%s', sumbitted value '%s'\n", type, submittedValue);
                throw new InvalidLanguageTypeException();
            }
            case "professional_skill": {
                System.out.printf("Invalid submission of Type '%s', sumbitted value '%s'\n", type, submittedValue);
                throw new InvalidProfessionalSkillTypeException();
            }
            case "personal_skill": {
                System.out.printf("Invalid submission of Type '%s', sumbitted value '%s'\n", type, submittedValue);
                throw new InvalidPersonalSkillTypeException();
            }
            case "currency": {
                System.out.printf("Invalid submission of Type '%s', sumbitted value '%s'\n", type, submittedValue);
                throw new InvalidCurrencyException();
            }
            case "gender": {
                System.out.printf("Invalid submission of Type '%s', sumbitted value '%s'\n", type, submittedValue);
                throw new InvalidGenderTypeException();
            }
            case "employment_terms": {
                System.out.printf("Invalid submission of Type '%s', sumbitted value '%s'\n", type, submittedValue);
                throw new InvalidEmploymentTypeException();
            }
            case "job_type": {
                System.out.printf("Invalid submission of Type '%s', sumbitted value '%s'\n", type, submittedValue);
                throw new InvalidJobTypeException();
            }
            case "job_category": {
                System.out.printf("Invalid submission of Type '%s', sumbitted value '%s'\n", type, submittedValue);
                throw new InvalidJobCategoryException();
            }
            case "candidate_level": {
                System.out.printf("Invalid submission of Type '%s', sumbitted value '%s'\n", type, submittedValue);
                throw new InvalidCandidateLevelException();
            }
            case "salary_type": {
                System.out.printf("Invalid submission of Type '%s', sumbitted value '%s'\n", type, submittedValue);
                throw new InvalidSalaryTypeException();
            }

            case "city":
            case "title":
            case "special_name": {
                assertLengthIsValid(submittedField, parentField);
                assertNameIsValid(submittedValue);
                break;
            }

            case "country": {
                assertCountryIsValid(submittedValue);
                break;
            }

            case "url":
            case "social_link":
                assertUrlIsValid(submittedValue);
            case "text":
            case "address":
            case "description": {
                assertLengthIsValid(submittedField, parentField);
                break;
            }

            case "military_id":
            case "current_date":
            case "driving_license": {
                assertSingleChoiceFieldIsValid(submittedValue);
                break;
            }

            default: {
                System.out.printf("No such type '%s'\n", type);
                throw new NoSuchTypeException();
            }
        }
        return true;
    }

    public static boolean assertPhoneNumberIsValid(final String phoneNumber) {
        if (!PHONE_NUMBER_REGEX.matcher(phoneNumber).matches()) {
            System.out.printf("Incorrect phone number format for '%s'\n", phoneNumber);
            throw new InvalidPhoneNumberException();
        }
        try {
            PhoneNumber.fetcher(new com.twilio.type.PhoneNumber(phoneNumber)).fetch();
        } catch (final ApiException e) {
            System.out.printf("Incorrect phone number for '%s'\n", phoneNumber);
            throw new InvalidPhoneNumberException();
        }
        return true;
    }

    public static boolean assertDetailsAreValid(final HrRegisterRequestDetails details) {
        return assertEmailIsValid(details.getEmail()) &&
                assertCompanyNameIsValid(details.getCompanyName()) &&
                assertNameIsValid(makeFullName(details.getFirstName(), details.getLastName())) &&
                assertPasswordIsValid(details.getPassword()) &&
                assertPasswordsAreEqual(details.getPassword(), details.getConfirmPassword());
    }

    public static boolean assertDetailsAreValid(final JobSeekerRegisterRequestDetails details) {
        return assertEmailIsValid(details.getEmail()) &&
                assertNameIsValid(makeFullName(details.getFirstName(), details.getLastName())) &&
                assertPasswordIsValid(details.getPassword()) &&
                assertPasswordsAreEqual(details.getPassword(), details.getConfirmPassword());
    }

    public static void assertCvTemplateSectionsNamesAreUnique(final CVTemplateDocument cvTemplate) {
        final Set<String> nameSet = new HashSet<>();

        final List<FieldDocument> fields = cvTemplate.getFields();
        for (final FieldDocument field : fields) {
            nameSet.add(field.getName().replaceAll(" ", ""));
        }

        if (nameSet.size() != fields.size()) {
            System.out.println("Duplicate section names");
            throw new DuplicateSectionNameException();
        }
    }

    public static boolean assertPasswordIsValid(final String password) {
        if (!PASSWORD_REGEX.matcher(password).matches()) {
            System.out.println("Invalid password format");
            throw new InvalidPasswordException();
        }
        return true;
    }

    public static boolean assertPasswordsAreEqual(final String password, final String confirmPassword) {
        if (!Objects.equals(password, confirmPassword)) {
            System.out.println("Passwords miss match");
            throw new PasswordsDoNotMatchException();
        }
        return true;
    }

    private static boolean assertSingleChoiceFieldIsValid(final String value) {
        if (value == null || "true".equals(value) || "false".equals(value)) return true;
        System.out.printf("Invalid single choice field for value '%s'\n", value);
        throw new InvalidSingleChoiceFieldException();
    }

    private static void assertSalaryisValid(final String salary) {
        if (!SALARY_REGEX.matcher(salary).matches()) {
            System.out.printf("Salary does not contain only numbers for value '%s'\n", salary);
            throw new InvalidSalaryException();
        }
    }

    private static boolean assertDateIsValid(final String date) {
        if (!DATE_REGEX.matcher(date).matches()) {
            System.out.printf("Invalid date format for date '%s'\n", date);
            throw new InvalidDateFormatException();
        }
        final String[] DMY = date.split("/");
        try {
            LocalDate.of(
                    Integer.parseInt(DMY[2]),
                    Integer.parseInt(DMY[1]),
                    Integer.parseInt(DMY[0])
            );
        } catch (final Exception e) {
            System.out.printf("Invalid date for date '%s'\n", date);
            throw new InvalidDateFormatException();
        }
        return true;
    }

    private static boolean assertUrlIsValid(final String value) {
        if (!URL_REGEX.matcher(value).matches()) {
            System.out.printf("The url '%s' is not valid\n", value);
            throw new InvalidUrlException();
        }
        return true;
    }

    private static boolean assertEmailIsValid(final String email) {
        if (!EMAIL_REGEX.matcher(email).matches()) {
            System.out.println("Email format exception for email '%s'!\n");
            throw new InvalidEmailException();
        }
        return true;
    }

    private static boolean assertCompanyNameIsValid(final String companyName) {
        if (!COMPANY_NAME_REGEX.matcher(companyName).matches()) {
            System.out.printf("Invalid company name for '%s'\n", companyName);
            throw new InvalidCompanyNameException();
        }
        return true;
    }

    private static boolean assertNameIsValid(final String name) {
        if (!NAME_REGEX.matcher(name).matches()) {
            System.out.printf("Name format exception, for name '%s'\n", name);
            throw new InvalidUserNameException();
        }
        return true;
    }

    private static boolean assertCountryIsValid(final String country) {
        if (!COUNTRIES.contains(country)) {
            System.out.printf("Invalid country '%s'", country);
            throw new InvalidCountryException();
        }
        return true;
    }

    private static String makeFullName(final String firstName, final String lastname) {
        return firstName.replace(" ", "")
                + " "
                + lastname.replace(" ", "");
    }

    private static boolean assertLengthIsValid(final FieldDocument submittedField, final FieldDocument parentField) {
        if (!parentField.getMetadata().containsKey("maxLength")) return true;

        final String value = (String) submittedField.getMetadata().get("submitted_value");
        final double maxLength = (Double) parentField.getMetadata().get("maxLength");

        if (value.length() > maxLength) {
            System.out.printf("Submitted Field size is bigger than expected. Field '%s', given size '%s', expected size '%s'\n",
                    parentField,
                    value.length(),
                    maxLength);
            throw new InvalidFieldLengthException();
        }

        return true;
    }

    // Considering both, field and section validation
    public static void assertDeletedFieldIsValid(final FieldDocument parentField) {
        if (!parentField.getMetadata().containsKey("type")) {
            System.out.println("Field must contain 'type' key");
            throw new InvalidFieldException();
        }

        if (!parentField.getMetadata().containsKey("deletable")) {
            System.out.println("Field must contain 'deletable' key");
            throw new InvalidFieldException();
        }

        if (!((Boolean) parentField.getMetadata().get("deletable"))) {
            System.out.println("Not deleteable field can`t be deleted");
            throw new InvalidFieldException();
        }
    }

    // Considering both, field and section validation
    public static void assertNewFieldIsValid(final FieldDocument newField) {
        if (!newField.getMetadata().containsKey("type")) {
            System.out.println("Field must contain 'type' key");
            throw new InvalidFieldException();
        }

        if (Objects.equals(newField.getMetadata().get("type"), "section") && (newField.getFields() == null || newField.getFields().size() == 0)) {
            System.out.println("Section can't be empty (at least one field is required)");
            throw new InvalidSectionException();
        } else if (newField.getFields() != null) {
            return;
        }

        if (!Objects.equals(newField.getMetadata().get("type"), "simple_input")) {
            System.out.println("New field`s type can only be 'simple_input'");
            throw new InvalidFieldException();
        }
    }

    public static void assertSectionContainerIsValid(final FieldDocument tempChildField, final FieldDocument parent) {
        final List<FieldDocument> childFields = tempChildField.getFields();
        final List<FieldDocument> parentFields = parent.getFields();
        if (childFields.size() != parentFields.size()) {
            System.out.println("Section container must contain same fields as parent section container");
            throw new InvalidSectionContainerFieldsSize();
        }

        Executor.getInstance()
                .setChildFields(childFields)
                .setParentFields(parentFields)
                .executeLogic(
                        new SectionContainerFieldsTypesValidationExecutor(),
                        new SubmittedFieldValueValidationExecutor(),
                        new CleanUpMetadataExecutor(true, "submitted_value", "type")
                );

    }

}
