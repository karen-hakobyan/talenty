import {createSlice} from "@reduxjs/toolkit";

const initialState = [{
    name: "Company name",
    value: "",
    inputName: "companyName",
},
    {
        name: "First name",
        value: "",
        inputName: "firstName",
    },
    {
        name: "Last name",
        value: "",
        inputName: "lastName",
    },
    {
        name: "Email",
        value: "",
        inputName: "email",
    },
    {
        name: "Password",
        value: "",
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
        onChangeAction: (state, {payload: {inputName, value}}) => {
            const editedInput = state.find((item) => item.inputName === inputName);
            editedInput.value = value;
        },
    },
});

export const {onChangeAction} = signUpSlice.actions;
export default signUpSlice.reducer;