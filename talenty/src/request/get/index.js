import { GET_TEMPLATES, instance } from "../../constants/requests";
import { getJwt } from "../../components/dashboard/helper";

export const getUrls = {
    getTemplates: GET_TEMPLATES,
};

export const globalDataSetter = ({
    stateSetter,
    urlKey,
    errorAction = () => {},
}) => {
    instance.defaults.headers = { Authorization: `Bearer ${getJwt()}` }
    instance
        .get(getUrls[urlKey])
        .then((res) => {
            stateSetter(res.data);
        })
        .catch((error) => {
            console.log(error);
            errorAction();
        });
};