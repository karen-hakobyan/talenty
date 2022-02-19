
export const FIELD = [
    {
        objKey: "email",
        label: "Email",
        error: {
            pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "The email is invalid",
            },
            required: "The field is Required",
        },
    },
    {
        objKey: "password",
        label: "Password",
        isPassword: "true",
        error: {
            required: "The field is Required",
        },
    },
];
