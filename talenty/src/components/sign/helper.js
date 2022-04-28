export const FIELDS = (watch) => [{
        name: "First name",
        placeholder: "John",
        key: "firstName",
        error: {
            required: "This field is required",
            maxLength: { value: 50, message: "Max length for first name" },
            pattern: {
                value: /^[A-Z]/,
                message: "First letter should be uppercase",
            },
        },
    },
    {
        name: "Last name",
        placeholder: "Smith",
        key: "lastName",
        error: {
            maxLength: { value: 50, message: "Max length for last name" },
            required: "This field is required",
            pattern: {
                value: /^[A-Z]/,
                message: "First letter should be uppercased",
            },
        },
    },
    {
        name: "Email",
        placeholder: "abcde@gmail.com",
        key: "email",
        error: {
            required: "This field is required",
            maxLength: { value: 50, message: "Max length for email" },
            pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "The email is invalid",
            },
        },
    },
    {
        name: "Password",
        placeholder: "Pabc123!",
        isPassword: true,
        key: "password",
        error: {
            required: "The field is Required",
            minLength: {
                value: 8,
                message: "Password should contain min 8, max 12 characters",
            },
            maxLength: {
                value: 12,
                message: "Password should contain min 8, max 12 characters",
            },
            pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/,
                message: "Password should contain one uppercase and symbol",
            },
        },
    },
    {
        name: "Confirm password",
        placeholder: "Pabc123!",
        isPassword: true,
        key: "confirmPassword",
        error: {
            required: "The field is Required",
            validate: (value) => {
                let pass = watch("password");
                return value === pass || "Passwords are not same";
            },
        },
    },
];
export const FIELD_SIGN_IN = [{
        objKey: "email",
        placeholder: "abcde@gmail.com",
        label: "Email",
        error: {
            pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "The email is invalid",
            },
            maxLength: { value: 50, message: "Max length for email" },
        },
    },
    {
        objKey: "password",
        label: "Password",
        placeholder: "Pabc123!",
        isPassword: "true",
        error: {
            required: "The field is Required",
            minLength: {
                value: 8,
                message: "Password should contain min 8, max 12 characters",
            },
            maxLength: {
                value: 12,
                message: "Password should contain min 8, max 12 characters",
            },
        },
    },
];

export const FIELDS_COMPANY = (watch) => [{
        name: "Company name",
        placeholder: "XXX LLC",
        key: "companyName",
        error: {
            required: "This field is required",
            maxLength: { value: 100, message: "Max length for company name" },
        },
    },
    ...FIELDS(watch),
];

export const FIELD_EMAIL = [{
    name: "Email",
    placeholder: "abcde@gmail.com",
    key: "email",
    error: {
        required: "This field is required",
        pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "The email is invalid",
        },
    },
}];

export const FIELD_RESET_PASSWORD = (watch) => [{
        name: "Password",
        placeholder: "Pabc123!",
        isPassword: true,
        key: "password",
        error: {
            required: "The field is Required",
            minLength: {
                value: 8,
                message: "Password should contain min 8, max 12 characters",
            },
            maxLength: {
                value: 12,
                message: "Password should contain min 8, max 12 characters",
            },
            pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/,
                message: "Password should contain one uppercase and symbol",
            },
        },
    },
    {
        name: "Confirm password",
        placeholder: "Pabc123!",
        isPassword: true,
        key: "confirmPassword",
        error: {
            required: "The field is Required",
            validate: (value) => {
                let pass = watch("password");
                return value === pass || "Passwords are not same";
            },
        },
    },
]

export const changeButtonInformation = [{
    text: "Sign up as a company",
    isCompanyState: true
}, { text: "Sign up as a jobseeker", isCompanyState: false }]