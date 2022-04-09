let system_cv_template = db.cv_templates.find({"system": true})[0]
let system_cv_template_id = system_cv_template._id + ""

let new_object = {}
new_object[system_cv_template_id] = system_cv_template.name

let users = db.users.find({})

users.forEach(user => {
    if(user.role === "ROLE_HR_ADMIN") {
        db.users.update(
            user,
            {
                $set: {"cv_templates": new_object}
            }
        )
    }

})