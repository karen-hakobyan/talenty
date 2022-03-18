db.job_announcements.drop()

let jobAnnouncement = {
    _id: ObjectId(),
    system: true,
    name: "System Job Announcement",
    fields: [
        {
            _id: ObjectId(),
            name: "General Information",
            metadata: {
                type: "section",
                deletable: false,
                editable: true,
                display: "fold",
            },
            fields: [
                {
                    _id: ObjectId(),
                    name: "Title",
                    metadata: {
                        type: "title",
                        maxLength: 100,
                        deletable: false,
                        required: true,
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Collection",
                    metadata: {
                        type: "grid_section",
                        editable: false,
                        deletable: true,
                    },
                    fields: [
                        {
                            _id: ObjectId(),
                            name: "Employment terms",
                            metadata: {
                                type: "employment_terms",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "Job type",
                            metadata: {
                                type: "job_type",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "Job Category",
                            metadata: {
                                type: "job_category",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "Candidate level",
                            metadata: {
                                type: "candidate_level",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "Country",
                            metadata: {
                                type: "country",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "City",
                            metadata: {
                                type: "city",
                                deletable: false,
                                required: false,
                            },
                        },
                    ],
                },
                {
                    _id: ObjectId(),
                    name: "Salary",
                    metadata: {
                        type: "section",
                        deletable: false,
                        required: false,
                    },
                    fields: [
                        {
                            _id: ObjectId(),
                            name: "Type",
                            metadata: {
                                type: "salary_type",
                                deletable: false,
                                required: false,
                                values: ["Net", "Gross"],
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "From",
                            metadata: {
                                type: "salary",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "To",
                            metadata: {
                                type: "salary",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "Currency",
                            metadata: {
                                type: "currency",
                                deletable: false,
                                required: false,
                            },
                        },
                    ],
                },
                {
                    _id: ObjectId(),
                    name: "Deadline",
                    metadata: {
                        type: "deadline",
                        maxLength: 100,
                        deletable: false,
                        required: true,
                    },
                },
            ],
        },
        {
            _id: ObjectId(),
            name: "Vacancy details",
            metadata: {
                type: "section",
                deletable: false,
                editable: true,
                display: "fold",
            },
            fields: [
                {
                    _id: ObjectId(),
                    name: "Description",
                    metadata: {
                        type: "description",
                        maxLength: 1000,
                        deletable: false,
                        required: true,
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Responsibilities",
                    metadata: {
                        type: "description",
                        maxLength: 1000,
                        deletable: false,
                        required: false,
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Required qualifications",
                    metadata: {
                        type: "description",
                        maxLength: 1000,
                        deletable: false,
                        required: false,
                    },
                },
            ],
        },
        {
            _id: ObjectId(),
            name: "Skills",
            metadata: {
                type: "section",
                deletable: true,
                editable: true,
                display: "fold",
            },
            fields: [
                {
                    _id: ObjectId(),
                    name: "Professional skills",
                    metadata: {
                        type: "professional_skill",
                        deletable: false,
                        required: false,
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Personal skills",
                    metadata: {
                        type: "personal_skill",
                        deletable: false,
                        required: false,
                    },
                },
            ],
        },
    ],
};

db.job_announcements.insert(jobAnnouncement);