export const FIELDS = [{
        name: "First name",
        key: "firstname",
    },
    {
        name: "Last name",
        key: "lastname",
    },
    {
        name: "Email",
        key: "email",
    },
    {
        name: "Password",
        isPassword: true,
        key: "password",
    },
    {
        name: "Confirm password",
        isPassword: true,
        key: "confirmPassowrd",
    },
];
export const FIELDS_COMPANY = [{ name: "Company name", ...FIELDS }];