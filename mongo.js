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
            _id: ObjectIc(),
            name: "Education and Training",
            metadata: {
                type: "section",
                editable: false,
                deletable: false,
                required: true,
                display: "fold"
            },
            fields: [
                {
                    _id: ObjectIc(),
                    name: "Education",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: false,
                        required: true
                    },
                    fields: [
                        {
                            _id: ObjectId(),
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
                            _id: ObjectId(),
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
                            _id: ObjectId(),
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
                            _id: ObjectId(),
                            name: "From/To(Date) or Still Studying",
                            metadata: {
                                type: "date",
                                editable: false,
                                required_editable: false,
                                deletable: true,
                                required: false
                            }
                        },
                        {
                            _id: ObjectId(),
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
                }
            ]
        },
        {
            _id: ObjectId(),
            name: "Work Experience",
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
                    name: "Work",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: false,
                        required: true
                    },
                    fields: [
                        {
                            _id: ObjectId(),
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
                            _id: ObjectId(),
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
                            _id: ObjectId(),
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
                            _id: ObjectId(),
                            name: "From/To(Date) or Still Studying",
                            metadata: {
                                type: "date",
                                editable: false,
                                required_editable: true,
                                deletable: true,
                                required: false
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Job details",
                            metadata: {
                                type: "description",
                                editable: false,
                                required_editable: true,
                                deletable: true,
                                required: false
                            }
                        }
                    ]
                }
            ]
        },
        {
            _id: ObjectId(),
            name: "Professional skills",
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
                    name: "Profession skill",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: false,
                        required: true
                    },
                    fields: [
                        {
                            _id: ObjectId(),
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
                            _id: ObjectId(),
                            name: "Evaluate bar",
                            metadata: {
                                type: "section",
                                editable: false,
                                required_editable: true,
                                deletable: true,
                                required: false
                            },
                            fields: [
                                {
                                    _id: ObjectId(),
                                    name: "25%",
                                    metadata: {
                                        type: "percentage",
                                        value: "25%"
                                    }
                                },
                                {
                                    _id: ObjectId(),
                                    name: "50%",
                                    metadata: {
                                        type: "percentage",
                                        value: "50%"
                                    }
                                },
                                {
                                    _id: ObjectId(),
                                    name: "75%",
                                    metadata: {
                                        type: "percentage",
                                        value: "75%"
                                    }
                                },
                                {
                                    _id: ObjectId(),
                                    name: "100%",
                                    metadata: {
                                        type: "percentage",
                                        value: "100%"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            _id: ObjectId(),
            name: "Personal skills",
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
                    name: "Personal skill",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: false,
                        required: true
                    },
                    fields: [
                        {
                            _id: ObjectId(),
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
                            _id: ObjectId(),
                            name: "Evaluate bar",
                            metadata: {
                                type: "section",
                                editable: false,
                                required_editable: true,
                                deletable: true,
                                required: false
                            },
                            fields: [
                                {
                                    _id: ObjectId(),
                                    name: "25%",
                                    metadata: {
                                        type: "percentage",
                                        value: "25%"
                                    }
                                },
                                {
                                    _id: ObjectId(),
                                    name: "50%",
                                    metadata: {
                                        type: "percentage",
                                        value: "50%"
                                    }
                                },
                                {
                                    _id: ObjectId(),
                                    name: "75%",
                                    metadata: {
                                        type: "percentage",
                                        value: "75%"
                                    }
                                },
                                {
                                    _id: ObjectId(),
                                    name: "100%",
                                    metadata: {
                                        type: "percentage",
                                        value: "100%"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            _id: ObjectId(),
            name: "Languages",
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
                    name: "Language",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: false,
                        required: true
                    },
                    fields: [
                        {
                            _id: ObjectId(),
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
                            _id: ObjectId(),
                            name: "Evaluate bar",
                            metadata: {
                                type: "section",
                                editable: false,
                                required_editable: true,
                                deletable: true,
                                required: false
                            },
                            fields: [
                                {
                                    _id: ObjectId(),
                                    name: "Beginner",
                                    metadata: {
                                        type: "text",
                                        value: "Beginner"
                                    }
                                },
                                {
                                    _id: ObjectId(),
                                    name: "Advanced",
                                    metadata: {
                                        type: "text",
                                        value: "Advanced"
                                    }
                                },
                                {
                                    _id: ObjectId(),
                                    name: "Proficiency",
                                    metadata: {
                                        type: "text",
                                        value: "Proficiency"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            _id: ObjectId(),
            name: "Summary",
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
                    name: "Descritpion",
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

        },
        {
            _id: ObjectiD(),
            name: "Interests and Hobbies",
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
                    name: "Interests",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: false,
                        required: true
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
        },
        {
            _id: ObjectId(),
            name: "Projects/Products",
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
                    name: "Projects",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: false,
                        required: true
                    },
                    fields: [
                        {
                            _id: ObjectId(),
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
                        },
                        {
                            _id: ObjctId(),
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
                            _id: ObjectId(),
                            name: "Start-End date",
                            metadata: {
                                type: "date",
                                editable: false,
                                required_editable: true,
                                deletable: true,
                                required: false
                            }
                        }
                    ]
                }
            ]
        },
        {
            _id: ObjectId(),
            name: "Publications",
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
                    name: "Articles Name",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: false,
                        required: true
                    },
                    fields: [
                        {
                            _id: ObjectId(),
                            name: "Article Name",
                            metadata: {
                                type: "url",
                                editable: false,
                                required_editable: true,
                                deletable: true,
                                required: true
                            }
                        }
                    ]
                },
                {
                    _id: ObjectId(),
                    name: "Books Name",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: false,
                        required: true
                    },
                    fields: [
                        {
                            _id: ObjectId(),
                            name: "Book Name",
                            metadata: {
                                type: "url",
                                editable: false,
                                required_editable: true,
                                deletable: true,
                                required: false
                            }
                        }
                    ]
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
