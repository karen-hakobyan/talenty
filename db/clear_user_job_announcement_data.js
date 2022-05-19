let users = db.users.find({})

users.forEach(user => {
    if (user.role === "ROLE_HR_ADMIN") {
        db.users.update(
            user,
            {
                $set: {"job_announcements": []  }
            }
        )
    }
})