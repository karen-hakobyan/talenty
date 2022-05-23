import {instance, JOB_SEEKER_APPLY_IN_PROGRESS} from "../../constants/requests";
import {ERROR_MESSAGE} from "../../helpers/ERROR_MESSAGE";

export const applyInProgress = (setOpen, jobAnnouncementId) => {
    instance.post(JOB_SEEKER_APPLY_IN_PROGRESS, {jobAnnouncementId}).then((response) => {
        setOpen(true)
    }).catch(err => {
        const message = {...err}.response.data.message
        // case where attached cv was not applied and Job Seeker also does not have CV
        if (ERROR_MESSAGE.JOB_SEEKER_SHOULD_HAVE_CV === message) {
            setOpen(true)
        }
    })
}