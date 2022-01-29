export const FIELDS = [{
        name: "First name",
        key: "firstName",
    },
    {
        name: "Last name",
        key: "lastName",
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
        key: "confirmPassword",
    },
];
export const FIELDS_COMPANY = [
    { name: "Company name", key: "companyName" },
    ...FIELDS,
];