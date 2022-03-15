let system_template = db.templates.find({"system": true})[0]
let system_template_id = system_template._id + ""

let new_object = {}
new_object[system_template_id] = system_template.name

let users = db.users.find({})

users.forEach(user => {
    if (user.role === "ROLE_HR_ADMIN" || user.role === "ROLE_HR") {
        db.users.update(
            user,
            {$set: {"templates": new_object}}
        )
    } else if (user.role === "ROLE_JOB_SEEKER") {
        db.users.update(
            user,
            {$unset: {"templates": 1}}
        )
    }

})