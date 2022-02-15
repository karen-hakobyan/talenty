import { getJwt } from "../components/dashboard/helper";

export const parseJWt = () => {
  let jwt = getJwt();
  return jwt ? JSON.parse(atob(jwt.split(".")[1])) : {};
};
