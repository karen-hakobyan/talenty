import { All_TEMPLATES, GET_EDITED_USER_CV, GET_TEMPLATES, TEMPLATE_BY_ID } from "../../constants/requests";

export const getUrls = {
    getTemplates: GET_TEMPLATES,
    templateList: All_TEMPLATES,
    templateById: TEMPLATE_BY_ID,
    userEditedCV: GET_EDITED_USER_CV,
};