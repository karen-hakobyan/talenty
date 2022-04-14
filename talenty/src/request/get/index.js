import {All_TEMPLATES, GET_EDITED_USER_CV, GET_TEMPLATES, instance, TEMPLATE_BY_ID} from "../../constants/requests";
import {getJwt} from "../../components/dashboard/helper";

export const getUrls = {
    getTemplates: GET_TEMPLATES,
    templateList: All_TEMPLATES,
    templateById: TEMPLATE_BY_ID,
    userEditedCV: GET_EDITED_USER_CV,
};
