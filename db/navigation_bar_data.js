db.navigation_bar.drop()

let navigationBar = {
    _id: ObjectId(),
    name: "Navigation Bar",
    system: true,
    fields: [
        {
            _id: ObjectId(),
            name: "Dashboard",
            metadata: {
                type: "dashboard",
                display: "fold",
            }
        },
        {
            _id: ObjectId(),
            name: "Applications list",
            metadata: {
                type: "applications_list",
                display: "fold",
            },
            fields: [
                {
                    _id: ObjectId(),
                    name: "Applicants",
                    metadata: {
                        type: "applicants",
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Offer",
                    metadata: {
                        type: "offer",
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Rejected",
                    metadata: {
                        type: "rejected",
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Archive",
                    metadata: {
                        type: "archive",
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Groups",
                    metadata: {
                        type: "groups",
                    },
                },
            ],
        },
        {
            _id: ObjectId(),
            name: "Job announcements",
            metadata: {
                type: "job_announcements",
                display: "fold",
            },
            fields: [
                {
                    _id: ObjectId(),
                    name: "Add new job",
                    metadata: {
                        type: "add_new_job",
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Pending",
                    metadata: {
                        type: "pending",
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Current jobs",
                    metadata: {
                        type: "current_jobs",
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Closed jobs",
                    metadata: {
                        type: "closed_jobs",
                    },
                },
            ],
        },
        {
            _id: ObjectId(),
            name: "Email templates",
            metadata: {
                type: "email_templates",
                display: "fold",
            }
        },
        {
            _id: ObjectId(),
            name: "Search",
            metadata: {
                type: "search",
                display: "fold",
            },
            fields: [
                {
                    _id: ObjectId(),
                    name: "Internal",
                    metadata: {
                        type: "internal",
                    },
                },
                {
                    _id: ObjectId(),
                    name: "External",
                    metadata: {
                        type: "external",
                    },
                },
            ],
        },
        {
            _id: ObjectId(),
            name: "CV template",
            metadata: {
                type: "cv_template",
                display: "fold",
            },
            fields: [
                {
                    _id: ObjectId(),
                    name: "Create new CV",
                    metadata: {
                        type: "create_new_cv",
                    },
                },
            ],
        },
        {
            _id: ObjectId(),
            name: "User management",
            metadata: {
                type: "user_management",
                display: "fold",
            },
            fields: [
                {
                    _id: ObjectId(),
                    name: "Add user",
                    metadata: {
                        type: "add_user",
                    },
                },
                {
                    _id: ObjectId(),
                    name: "All users",
                    metadata: {
                        type: "all_users",
                    },
                },
            ],
        },
    ],
};

db.navigation_bar.insert(navigationBar);