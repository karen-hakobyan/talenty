let users = db.users.find({})

users.forEach(user => {
    if (user.role === "ROLE_HR_ADMIN") {
        db.users.update(
            user,
            {
                $set: {"cv_templates": {}}
            }
        )
    }

    if (user.role === "ROLE_JOB_SEEKER") {
        db.users.update(
            user,
            {
                $unset: {"cvTemplateId": ""}
            }
        )
    }

})