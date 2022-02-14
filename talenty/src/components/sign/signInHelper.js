import { LOGIN } from "../../constants/requests";

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

export const request =
  ({ axios, setDialogInfo, isChecked, navigate, route }) =>
  (data) => {
    axios
      .post(LOGIN, data)
      .then((response) => {
        let jwt = response.data.jwtToken;
        storageSetter(isChecked, jwt);
        navigate(route);
      })
      .catch((err) => {
        console.log({ ...err });
        setDialogInfo({
          open: true,
          text: "Please, check your email or password once again. The email or password is incorrect.",
        });
      });
  };

function storageSetter(isChecked, data) {
  if (isChecked) {
    localStorage.setItem("jwt", data);
  } else {
    sessionStorage.setItem("jwt", data);
  }
}
