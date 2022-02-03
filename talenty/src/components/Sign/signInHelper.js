import { LOGIN } from "../../constants/requests";

export const FIELD = [{
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

export const request =
    ({ axios, setDialogInfo }) =>
    (data) => {
        axios
            .post(LOGIN, data)
            .then((response) => {
                setDialogInfo({ open: true, text: "Welcome" });
                console.log(response);
            })
            .catch((err) => {
                console.log({...err });
                setDialogInfo({
                    open: true,
                    text: "Please, check your email or password once again. The email or password is incorrect.",
                });
            });
    };

export const submittion = ({ handleSubmit, setDialogInfo }) => {
    console.log("mtav");
};