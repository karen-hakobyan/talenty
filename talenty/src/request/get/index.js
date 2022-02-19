import {GET_TEMPLATES, instance} from "../../constants/requests";

export const getUrls = {
    getTemplates: GET_TEMPLATES,
};

export const globalDataSetter = ({
                                     stateSetter,
                                     urlKey,
                                     errorAction = () => {
                                     },
                                 }) => {
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
