import axios from "axios";
import { GET_TEMPLATES } from "../../constants/requests";

export const getUrls = {
  getTemplates: GET_TEMPLATES,
};

export const globalDataSetter = ({
  stateSetter,
  urlKey,
  errorAction = () => {},
}) => {
  axios
    .get(getUrls[urlKey])
    .then((res) => {
      stateSetter(res.data);
    })
    .catch((error) => {
      console.log(error);
      errorAction();
    });
};
