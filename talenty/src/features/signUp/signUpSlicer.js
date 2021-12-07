import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
        name: "Company name",
        value: "",
        errMsg: "Company name is incorrect",
        inputName: "companyName",
    },
    {
        name: "First name",
        value: "",
        errMsg: "Name is incorrect",
        inputName: "firstName",
    },
    {
        name: "Last name",
        value: "",
        errMsg: "Surname is incorrect",
        inputName: "lastName",
    },
    {
        name: "Email",
        value: "",
        errMsg: "Your email is incorrect",
        inputName: "email",
    },
    {
        name: "Password",
        value: "",
        errMsg: "Your password is incorrect",
        inputName: "password",
    },
    {
        name: "Confirm password",
        value: "",
        inputName: "confirmPassword",
    },
];

export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        onChangeAction: (state, { payload: { inputName, value } }) => {
            const editedInput = state.find((item) => item.inputName === inputName);
            editedInput.value = value;
        },
    },
});

export const { onChangeAction } = signUpSlice.actions;
export default signUpSlice.reducer;