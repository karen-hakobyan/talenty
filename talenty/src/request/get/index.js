import {All_TEMPLATES, GET_TEMPLATES, instance, TEMPLATE_BY_ID} from "../../constants/requests";
import { getJwt } from "../../components/dashboard/helper";

export const getUrls = {
    getTemplates: GET_TEMPLATES,
    templateList: All_TEMPLATES,
    templateById: TEMPLATE_BY_ID,
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