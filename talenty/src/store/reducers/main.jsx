// noinspection JSUnresolvedFunction
let systemTemplate = {
    system: true,
    name: "System Template",
    fields: [
        {
            name: "Personal Info",
            metadata: {
                type: "section",
                deletable: false,
                display: "fold"
            },
            fields: [{
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
                name: "Gender",
                metadata: {
                    type: "gender",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: true
                }
            },
            {
                name: "Date of birth",
                metadata: {
                    type: "section",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: true
                },
                fields: [{
                    name: "Day",
                    metadata: {
                        type: "day",
                        editable: false,
                        deletable: false
                    }
                },
                {
                    name: "Month",
                    metadata: {
                        type: "month",
                        editable: false,
                        deletable: false
                    }
                },
                {
                    name: "Year",
                    metadata: {
                        type: "year",
                        editable: false,
                        deletable: false
                    }
                }
                ]
            },
            {
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
                name: "Social media links",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: true
                },
                fields: [{
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
                    name: "Behance",
                    metadata: {
                        type: "social_link",
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: true
                    }
                },
                {
                    name: "Dribbble",
                    metadata: {
                        type: "social_link",
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: true
                    }
                },
                {
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
                name: "Country",
                metadata: {
                    type: "country",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: true
                }
            },
            {
                name: "City",
                metadata: {
                    type: "text",
                    maxLength: 100,
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: true
                }
            },
            {
                name: "Address",
                metadata: {
                    type: "text",
                    maxLength: 100,
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false
                }
            },
            {
                name: "Salary",
                metadata: {
                    type: "section",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: true
                },
                fields: [{
                    name: "Expected Salary",
                    metadata: {
                        type: "expected_salary",
                        editable: false,
                        deletable: false
                    }
                },
                {
                    name: "Salary type",
                    metadata: {
                        type: "salary_type",
                        editable: false,
                        deletable: false
                    }
                }
                ]
            },
            {
                name: "Add photo",
                metadata: {
                    type: "add_photo",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: true
                }
            },
            {
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
            name: "Education and Training",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold"
            },
            fields: [{
                name: "Education and Training section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false
                },
                fields: [{
                    name: "University/Organization",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                },
                {
                    name: "Location",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: false,
                        deletable: true,
                        required: false
                    }
                },
                {
                    name: "Degree/Specialization",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: false,
                        deletable: true,
                        required: false
                    }
                },
                {
                    name: "From/to",
                    metadata: {
                        type: "section",
                        editable: false,
                        required_editable: false,
                        deletable: true,
                        required: false
                    },
                    fields: [{
                        name: "From",
                        metadata: {
                            type: "date",
                            editable: false,
                            deletable: false
                        }
                    },
                    {
                        name: "To",
                        metadata: {
                            type: "date",
                            editable: false,
                            deletable: false
                        }
                    }
                    ]
                },
                {
                    name: "Education details",
                    metadata: {
                        type: "description",
                        maxLength: 1000,
                        editable: false,
                        required_editable: false,
                        deletable: true,
                        required: false
                    }
                }
                ]
            }]
        },
        {
            name: "Work Experience",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold"
            },
            fields: [{
                name: "Work Experience section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false
                },
                fields: [{
                    name: "Company",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true
                    }
                },
                {
                    name: "Location",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                },
                {
                    name: "Position",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                },
                {
                    name: "From/to",
                    metadata: {
                        type: "section",
                        editable: false,
                        required_editable: false,
                        deletable: true,
                        required: false
                    },
                    fields: [{
                        name: "From",
                        metadata: {
                            type: "date",
                            editable: false,
                            deletable: false
                        }
                    },
                    {
                        name: "To",
                        metadata: {
                            type: "date",
                            editable: false,
                            deletable: false
                        }
                    }
                    ]
                },
                {
                    name: "Job details",
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
            }]
        },
        {
            name: "Professional skills",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold"
            },
            fields: [{
                name: "Professional skill section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false
                },
                fields: [{
                    name: "Skill",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true
                    }
                },
                {
                    name: "Evaluate bar",
                    metadata: {
                        type: "section",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    },
                    fields: [{
                        name: "25%",
                        metadata: {
                            type: "percentage",
                            value: "25%"
                        }
                    },
                    {
                        name: "50%",
                        metadata: {
                            type: "percentage",
                            value: "50%"
                        }
                    },
                    {
                        name: "75%",
                        metadata: {
                            type: "percentage",
                            value: "75%"
                        }
                    },
                    {
                        name: "100%",
                        metadata: {
                            type: "percentage",
                            value: "100%"
                        }
                    }
                    ]
                }
                ]
            }]
        },
        {
            name: "Personal skills",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold"
            },
            fields: [{
                name: "Personal skill section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false
                },
                fields: [{
                    name: "Skill",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true
                    }
                },
                {
                    name: "Evaluate bar",
                    metadata: {
                        type: "section",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    },
                    fields: [{
                        name: "25%",
                        metadata: {
                            type: "percentage",
                            value: "25%"
                        }
                    },
                    {
                        name: "50%",
                        metadata: {
                            type: "percentage",
                            value: "50%"
                        }
                    },
                    {
                        name: "75%",
                        metadata: {
                            type: "percentage",
                            value: "75%"
                        }
                    },
                    {
                        name: "100%",
                        metadata: {
                            type: "percentage",
                            value: "100%"
                        }
                    }
                    ]
                }
                ]
            }]
        },
        {
            name: "Languages",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold"
            },
            fields: [{
                name: "Language section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false
                },
                fields: [{
                    name: "Language",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true
                    }
                },
                {
                    name: "Evaluate bar",
                    metadata: {
                        type: "section",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    },
                    fields: [{
                        name: "Beginner",
                        metadata: {
                            type: "language_level",
                            value: "Beginner"
                        }
                    },
                    {
                        name: "Advanced",
                        metadata: {
                            type: "language_level",
                            value: "Advanced"
                        }
                    },
                    {
                        name: "Proficiency",
                        metadata: {
                            type: "language_level",
                            value: "Proficiency"
                        }
                    }
                    ]
                }
                ]
            }]
        },
        {
            name: "Summary",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold"
            },
            fields: [{
                name: "Description",
                metadata: {
                    type: "description",
                    maxLength: 1000,
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false
                }
            }]

        },
        {
            name: "Interests and Hobbies",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold"
            },
            fields: [{
                name: "Interest and Hobby section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false
                },
                fields: [{
                    name: "Description",
                    metadata: {
                        type: "description",
                        maxLength: 1000,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                }]
            }]
        },
        {
            name: "Projects/Products",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold"
            },
            fields: [{
                name: "Project/Product section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false
                },
                fields: [{
                    name: "Projects/Products",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true
                    }
                },
                {
                    name: "Description",
                    metadata: {
                        type: "description",
                        maxLength: 1000,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                },
                {
                    name: "URL",
                    metadata: {
                        type: "url",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                },
                {
                    name: "Start-End",
                    metadata: {
                        type: "section",
                        editable: false,
                        required_editable: false,
                        deletable: true,
                        required: false
                    },
                    fields: [{
                        name: "Start",
                        metadata: {
                            type: "date",
                            editable: false,
                            deletable: false
                        }
                    },
                    {
                        name: "End",
                        metadata: {
                            type: "date",
                            editable: false,
                            deletable: false
                        }
                    }
                    ]
                },
                ]
            }]
        },
        {
            name: "Publications",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold"
            },
            fields: [{
                name: "Article section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false
                },
                fields: [{
                    name: "Article Name",
                    metadata: {
                        type: "url",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true
                    }
                }]
            },
            {
                name: "Book section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false
                },
                fields: [{
                    name: "Book Name",
                    metadata: {
                        type: "url",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false
                    }
                }]
            }
            ]
        },
        {
            name: "Additional information",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold"
            },
            fields: [{
                name: "Description",
                metadata: {
                    type: "description",
                    maxLength: 1000,
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false
                }
            }]
        }
    ]
}



function main(state = systemTemplate, action) {
    switch (action.type) {
        case 'test':
            return {
                ...state,

            }
            break;

        default: return state
    }
}
export default main