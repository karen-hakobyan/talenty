// noinspection JSUnresolvedFunction
let systemTemplate = {
    _id: ObjectId(),
    system: true,
    name: "System Template",
    fields: [
        {
            _id: ObjectId(),
            name: "Personal Info",
            metadata: {
                type: "section",
                editable: false,
                deletable: false,
                required: true,
                display: "fold"
            },
            fields: [
                {
                    _id: ObjectId(),
                    name: "First name",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: false,
                        deletable: false,
                        required: true
                    }
                },
                {
                    _id: ObjectId(),
                    name: "Last name",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: false,
                        deletable: false,
                        required: true
                    }
                },
                {
                    _id: ObjectId(),
                    name: "Gender",
                    metadata: {
                        type: "gender",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                },
                {
                    _id: ObjectId(),
                    name: "Date of birth",
                    metadata: {
                        type: "section",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true
                    },
                    fields: [
                        {
                            _id: ObjectId(),
                            name: "Day",
                            metadata: {
                                type: "day",
                                editable: false,
                                required_editable: false,
                                deletable: false,
                                required: true
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Month",
                            metadata: {
                                type: "month",
                                editable: false,
                                required_editable: false,
                                deletable: false,
                                required: true
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Year",
                            metadata: {
                                type: "year",
                                editable: false,
                                required_editable: false,
                                deletable: false,
                                required: true
                            }
                        }
                    ]
                },
                {
                    _id: ObjectId(),
                    name: "Phone Number",
                    metadata: {
                        type: "phone_number",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                },
                {
                    _id: ObjectId(),
                    name: "Email",
                    metadata: {
                        type: "email",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                },
                {
                    _id: ObjectId(),
                    name: "Social Media",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: true,
                        required: false
                    },
                    fields: [
                        {
                            _id: ObjectId(),
                            name: "Facebook",
                            metadata: {
                                type: "social_link",
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Linkedin",
                            metadata: {
                                type: "social_link",
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: true
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Twitter",
                            metadata: {
                                type: "social_link",
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Instagram",
                            metadata: {
                                type: "social_link",
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Youtube",
                            metadata: {
                                type: "social_link",
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Behance",
                            metadata: {
                                type: "social_link",
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Dribbble",
                            metadata: {
                                type: "social_link",
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Github",
                            metadata: {
                                type: "social_link",
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Custom link",
                            metadata: {
                                type: "social_link",
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false
                            }
                        }
                    ]
                },
                {
                    _id: ObjectId(),
                    name: "Country",
                    metadata: {
                        type: "country",
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: false
                    }
                },
                {
                    _id: ObjectId(),
                    name: "City",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: false
                    }
                },
                {
                    _id: ObjectId(),
                    name: "Address",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: false
                    }
                },
                {
                    _id: ObjectId(),
                    name: "Salary",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: true,
                        required: false
                    },
                    fields: [
                        {
                            _id: ObjectId(),
                            name: "Expected Salary",
                            metadata: {
                                type: "expected_salary",
                                editable: false,
                                required_editable: true,
                                deletable: false
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Salary type",
                            metadata: {
                                type: "salary_type",
                                editable: false,
                                required_editable: true,
                                deletable: false
                            }
                        }
                    ]
                },
                {
                    _id: ObjectId(),
                    name: "Add photo",
                    metadata: {
                        type: "photo",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true
                    }
                },
                {
                    _id: ObjectId(),
                    name: "Military ID",
                    metadata: {
                        type: "military_id",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                },
                {
                    _id: ObjectId(),
                    name: "Driving license",
                    metadata: {
                        type: "driving_license",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                }
            ]
        },
        {
            _id: ObjectId(),
            name: "Additional information",
            metadata: {
                type: "section",
                editable: false,
                deletable: false,
                required: true,
                display: "fold"
            },
            fields: [
                {
                    _id: ObjectId(),
                    name: "Description",
                    metadata: {
                        type: "description",
                        maxLength: 1000,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                }
            ]
        }
    ]
}

// noinspection JSUnresolvedVariable
db.templates.insert(systemTemplate);
