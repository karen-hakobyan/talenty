let system_template = db.templates.find({"system": true})[0]
let system_template_id = system_template._id + ""

let new_object = {}
new_object[system_template_id] = system_template.name

let users = db.users.find({})

users.forEach(user => {
    db.users.update(
        user,
        {$unset: {"templates": 1}}
    )
})