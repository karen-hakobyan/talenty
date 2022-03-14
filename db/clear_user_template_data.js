let system_template_id = db.templates.find({"system": true})[0]._id + ""
let new_templates = []
new_templates.push(system_template_id)

let users = db.users.find({})

users.forEach(user => {
    db.users.update(
        user,
        {$set: {"templates": new_templates}}
    )
})