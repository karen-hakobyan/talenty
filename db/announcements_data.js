db.job_announcements.drop()

let jobAnnouncement = {
    _id: ObjectId(),
    system: true,
    name: "System Job Announcement",
    // status: "CONFIRMED",
    status: "PENDING",
    attachedCvTemplateId: "test",
    fields: [{
            _id: ObjectId(),
            name: "General Information",
            metadata: {
                type: "section",
                deletable: false,
                editable: true,
                display: "fold",
            },
            fields: [{
                    _id: ObjectId(),
                    name: "Title",
                    metadata: {
                        type: "title",
                        placeholder: "Title",
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
                    fields: [{
                            _id: ObjectId(),
                            name: "Employment terms",
                            metadata: {
                                placeholder: "Employment terms",
                                type: "employment_terms",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "Job type",
                            metadata: {
                                placeholder: "Job type",
                                type: "job_type",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "Job Category",
                            metadata: {
                                placeholder: "Job Category",
                                type: "job_category",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "Candidate level",
                            metadata: {
                                placeholder: "Candidate level",
                                type: "candidate_level",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "Country",
                            metadata: {
                                placeholder: "Country",
                                type: "country",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            _id: ObjectId(),
                            name: "City",
                            metadata: {
                                placeholder: "City",
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
                    fields: [{
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
                            placeholder: "From",
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
                                placeholder: "To",
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
                        placeholder: "Deadline",
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
            fields: [{
                    _id: ObjectId(),
                    name: "Description",
                    metadata: {
                        placeholder: "Description",
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
                        placeholder: "Responsibilities",
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
                        placeholder: "Required qualifications",
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
            fields: [{
                    _id: ObjectId(),
                    metadata: {
                        placeholder: "Professional skills",
                        type: "professional_skill",
                        deletable: false,
                        required: false,
                    },
                },
                {
                    _id: ObjectId(),
                    name: "Personal skills",
                    metadata: {
                        placeholder: "Professional skills",
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