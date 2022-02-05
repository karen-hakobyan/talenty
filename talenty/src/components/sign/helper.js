export const FIELDS = (watch) => [{
        name: "First name",
        key: "firstName",
        error: {
            required: "This field is required",
            maxLength: { value: 50, message: "max length should be 50." },
            pattern: {
                value: /^[A-Z]/,
                message: "First letter should be uppercase",
            },
        },
    },
    {
        name: "Last name",
        key: "lastName",
        error: {
            maxLength: { value: 50, message: "max length should be 50." },
            required: "This field is required",
            pattern: {
                value: /^[A-Z]/,
                message: "First letter should be uppercased",
            },
        },
    },
    {
        name: "Email",
        key: "email",
        error: {
            required: "This field is required",
            pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "The email is invalid",
            },
        },
    },
    {
        name: "Password",
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
        isPassword: true,
        key: "confirmPassword",
        error: {
            validate: (value) => {
                let pass = watch("password");
                return value === pass || "Passwords are not same";
            },
        },
    },
];

export const FIELDS_COMPANY = (watch) => [{
        name: "Company name",
        key: "companyName",
        error: {
            required: "This field is required",
            maxLength: { value: 100, message: "Max length for company name is 100" },
        },
    },
    ...FIELDS(watch),
];
export const changeButtonInformation = [{ text: "Sign up as a company", isCompanyState: true }, { text: "Sign up as a jobseeker", isCompanyState: false }]