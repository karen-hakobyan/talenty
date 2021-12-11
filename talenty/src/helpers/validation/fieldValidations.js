// EMAIL_REGEX = Pattern.compile("^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
// COMPANY_NAME_REGEX = Pattern.compile("^[a-zA-Z]([a-zA-Z0-9.-_,]|[- @.#&!])*$");
// NAME_REGEX = Pattern.compile("^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\\.?)( [IVXLCDM]+)?$");
// PASSWORD_REGEX = Pattern.compile("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");
// java pattern for email https://emailregex.com/
export const companyNameValid = (comp) =>
  /^[a-zA-Z]([a-zA-Z0-9.-_,]|[- @.#&!])*$/.test(comp);

export const nameValid = (name) =>
  /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)( [IVXLCDM]+)?$/.test(name);

export const emailValid = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

export const passValid = (pass) =>
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(pass);
