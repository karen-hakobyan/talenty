package com.talenty.validation;

import com.talenty.domain.dto.user.hr.HrRegisterRequestDetails;
import com.talenty.domain.dto.user.jobseeker.JobSeekerRegisterRequestDetails;
import com.talenty.domain.mongo.FieldDocument;
import com.talenty.domain.mongo.TemplateDocument;
import com.talenty.exceptions.*;
import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.lookups.v1.PhoneNumber;

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
            System.out.println("Incorrect phone number!");
            throw new InvalidPhoneNumberException();
        }
    }

    public static boolean assertDetailsAreValid(final HrRegisterRequestDetails details) {
        return assertEmailIsValid(details.getEmail()) &&
                assertCompanyNameIsValid(details.getCompanyName()) &&
                assertNameIsValid(
                        details.getFirstName().replace(" ", "")
                                + " "
                                + details.getLastName().replace(" ", "")
                ) &&
                assertPasswordIsValid(details.getPassword()) &&
                assertPasswordsAreEqual(details.getPassword(), details.getConfirmPassword());
    }

    public static boolean assertDetailsAreValid(final JobSeekerRegisterRequestDetails details) {
        return assertEmailIsValid(details.getEmail()) &&
                assertNameIsValid(
                        details.getFirstName().replace(" ", "")
                                + " "
                                + details.getLastName().replace(" ", "")
                ) &&
                assertPasswordIsValid(details.getPassword()) &&
                assertPasswordsAreEqual(details.getPassword(), details.getConfirmPassword());
    }

    public static boolean assertSubmittedSectionIsValid(final FieldDocument section) {
        final Map<String, Object> sectionMetadata = section.getMetadata();
        if (sectionMetadata.containsKey("selected_values") && sectionMetadata.get("selected_values").equals("only_one")) {
            int temp = 0;
            for (final FieldDocument field : section.getFields()) {
                if (field.getMetadata().containsKey("submitted_value")) {
                    if (++temp > 1) throw new InvalidSectionException();
                }
            }
            if (temp == 1) {
                return true;
            }
            if (section.getMetadata().containsKey("required")) {
                if ((boolean) section.getMetadata().get("required")) {
                    throw new InvalidSectionException();
                }
            }
        }
        return true;
    }

    public static boolean assertSubmittedFieldIsValid(final FieldDocument submittedField, final FieldDocument parentField) {
        final String submittedValue = (String) submittedField.getMetadata().get("submitted_value");
        final String type = (String) parentField.getMetadata().get("type");

        final Map<String, Object> parentMetadata = parentField.getMetadata();
        if (parentMetadata.containsKey("values")) {
            final List<String> values = (List<String>) parentMetadata.get("values");
            if (values.contains(submittedValue)) {
                return true;
            }
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
                    throw new InvalidSalaryException();
                }
                break;
            }

            case "professional_skill":
                throw new InvalidProfessionalSkillTypeException();
            case "personal_skill":
                throw new InvalidPersonalSkillTypeException();
            case "salary_type":
                throw new InvalidSalaryTypeException();
            case "gender":
                throw new InvalidGenderTypeException();

            case "city":
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
                assertUrlIsValid(submittedValue);
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

    private static boolean assertUrlIsValid(final String value) {
        if (!URL_REGEX.matcher(value).matches()) {
            System.out.printf("The url: %s is not valid!", value);
            throw new InvalidUrlException();
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
                    parentField,
                    value.length(),
                    maxLength
            );
            System.out.println(cause);
            throw new InvalidFieldLengthException(cause);
        }

        return true;
    }

    private static boolean assertEmailIsValid(final String email) {
        if (!EMAIL_REGEX.matcher(email).matches()) {
            System.out.println("Email format exception!");
            throw new InvalidEmailException();
        }
        return true;
    }

    private static boolean assertCompanyNameIsValid(final String companyName) {
        if (!COMPANY_NAME_REGEX.matcher(companyName).matches()) {
            System.out.println("Company name format exception!");
            throw new InvalidCompanyNameException();
        }
        return true;
    }

    private static boolean assertNameIsValid(final String name) {
        if (!NAME_REGEX.matcher(name).matches()) {
            System.out.println("Name format exception!");
            throw new InvalidUserNameException();
        }
        return true;
    }

    private static boolean assertCountryIsValid(final String country) {
        if (!COUNTRIES.contains(country))
            throw new InvalidCountryException();
        return true;
    }

    public static void asserTemplateSectionsNamesAreUnique(final TemplateDocument template) {
        final Set<String> nameSet = new HashSet<>();

        final List<FieldDocument> fields = template.getFields();
        for (final FieldDocument field : fields) {
            nameSet.add(field.getName().replaceAll(" ", ""));
        }

        if (nameSet.size() != fields.size())
            throw new DuplicateSectionNameException();
    }

    public static void assertTemplateSectionIsValid(final FieldDocument section, final TemplateDocument parentTemplate) {
        final String status = section.getMetadata().get("template.section.type.status").toString();

        if (status == null) {
            //TODO sovorakan fielderi check
            return;
        }

        switch (status) {
            case "new":
                assertNewSectionIsValid(section);
                break;
            case "deleted":
                assertDeletedSectionIsValid(section, parentTemplate);
                break;
        }

    }

    private static void assertEditedSectionIsValid(final FieldDocument section, final TemplateDocument parentTemplate) {

    }

    private static void assertDeletedSectionIsValid(final FieldDocument section, final TemplateDocument parentTemplate) {
        for (final FieldDocument parentSection : parentTemplate.getFields()) {
            if (Objects.equals(parentSection.getId(), section.getId())) {
                if(parentSection.getMetadata().containsKey("deletable")) {
                    if((boolean) parentSection.getMetadata().get("deletable")) {
                        return;
                    }
                }
            }
        }
        throw new InvalidSectionException();
    }

    private static void assertNewSectionIsValid(final FieldDocument section) {
        // TODO new section check (fields types check, only type input)
    }

}
