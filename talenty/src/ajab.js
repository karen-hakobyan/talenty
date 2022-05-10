let ObjectId = () => Math.random().toString().substring(2)
export let jobAnnouncementAjab = {
    id: ObjectId(),
    system: true,
    name: "System Job Announcement",
    fields: [{
            id: ObjectId(),
            name: "General Information",
            metadata: {
                type: "section",
                deletable: false,
                editable: true,
                display: "fold",
            },
            fields: [{
                    id: ObjectId(),
                    name: "Title",
                    metadata: {
                        type: "title",
                        maxLength: 100,
                        deletable: false,
                        required: true,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Collection",
                    metadata: {
                        type: "grid_section",
                        editable: false,
                        deletable: true,
                    },
                    fields: [{
                            id: ObjectId(),
                            name: "Employment terms",
                            metadata: {
                                type: "employment_terms",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Job type",
                            metadata: {
                                type: "job_type",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Job Category",
                            metadata: {
                                type: "job_category",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Candidate level",
                            metadata: {
                                type: "candidate_level",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Country",
                            metadata: {
                                type: "country",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
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
                    id: ObjectId(),
                    name: "Salary",
                    metadata: {
                        type: "section",
                        deletable: false,
                        required: false,
                    },
                    fields: [{
                            id: ObjectId(),
                            name: "Type",
                            metadata: {
                                type: "salary_type",
                                deletable: false,
                                required: false,
                                values: ["Net", "Gross"],
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "From",
                            metadata: {
                                type: "salary",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "To",
                            metadata: {
                                type: "salary",
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
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
                    id: ObjectId(),
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
            id: ObjectId(),
            name: "Vacancy details",
            metadata: {
                type: "section",
                deletable: false,
                editable: true,
                display: "fold",
            },
            fields: [{
                    id: ObjectId(),
                    name: "Description",
                    metadata: {
                        type: "description",
                        maxLength: 1000,
                        deletable: false,
                        required: true,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Responsibilities",
                    metadata: {
                        type: "description",
                        maxLength: 1000,
                        deletable: false,
                        required: false,
                    },
                },
                {
                    id: ObjectId(),
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
            id: ObjectId(),
            name: "Skills",
            metadata: {
                type: "section",
                deletable: true,
                editable: true,
                display: "fold",
            },
            fields: [{
                    id: ObjectId(),
                    name: "Professional skills",
                    metadata: {
                        type: "professional_skill",
                        deletable: false,
                        required: false,
                    },
                },
                {
                    id: ObjectId(),
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


const systemCompanyAjab = {
    id: ObjectId(),
    name: "System Company",
    fields: [{
            id: ObjectId(),
            name: "Details",
            fields: [{
                    id: ObjectId(),
                    name: "Legal Form",
                    metadata: {
                        type: "legal_form",
                        placeholder: "-Select-"
                    }
                },
                {
                    id: ObjectId(),
                    name: "Industry",
                    metadata: {
                        type: "industry",
                        placeholder: "-Select-"
                    }
                },
                {
                    i: ObjectId(),
                    nam: "Founded",
                    metadat: {
                        typ: "date"
                    }
                },
                {
                    id: ObjectId(),
                    name: "Number of employees",
                    metadata: {
                        type: "number_of_employees"
                    }
                }
            ],
            metadata: {
                type: "section",
                display: "fold"
            }
        },
        {
            id: ObjectId(),
            name: "Contacts",
            fields: [{
                    id: ObjectId(),
                    name: "Address",
                    metadata: {
                        type: "address",
                        placeholder: "Address"
                    }
                },
                {
                    id: ObjectId(),
                    name: "Phone",
                    metadata: {
                        type: "phone_number",
                        placeholder: "+374 77 123 456"
                    }
                },
                {
                    id: ObjectId(),
                    name: "Email",
                    metadata: {
                        type: "email",
                        placeholder: "Email"
                    }
                },
                {
                    id: ObjectId(),
                    name: "Website",
                    metadata: {
                        type: "website",
                        placeholder: "Website"
                    }
                }
            ],
            metadata: {
                type: "section",
                display: "fold"
            }
        },
        {
            id: ObjectId(),
            name: "About Company",
            fields: [{
                id: "62798db13ac8ce5e18b8fd06",
                name: null,
                metadata: {
                    type: "description",
                    placeholder: "Write a text"
                }
            }],
            metadata: {
                type: "section",
                display: "fold"
            }
        },
        {
            id: ObjectId(),
            name: "Products",
            fields: [{
                    id: ObjectId(),
                    name: "Product name",
                    metadata: {
                        type: "product_name",
                        placeholder: "Product name"
                    }
                },
                {
                    id: ObjectId(),
                    name: "Product link",
                    metadata: {
                        type: "product_link",
                        placeholder: "Product link"
                    }
                }
            ],
            metadata: {
                type: "section",
                display: "fold"
            }
        },
        {
            id: ObjectId(),
            name: "Branches",
            fields: [{
                    id: "62798db13ac8ce5e18b8fd0b",
                    name: null,
                    metadata: {
                        type: "country",
                        placeholder: "-Country-"
                    }
                },
                {
                    id: ObjectId(),
                    name: null,
                    metadata: {
                        type: "city",
                        placeholder: "City"
                    }
                },
                {
                    id: ObjectId(),
                    name: null,
                    metadata: {
                        type: "number_of_employees_100",
                        placeholder: "Number of employees 100"
                    }
                }
            ],
            metadata: {
                type: "section",
                display: "fold"
            }
        },
        {
            id: ObjectId(),
            name: "Additional information",
            fields: [{
                id: "62798db13ac8ce5e18b8fd0f",
                name: null,
                metadata: {
                    type: "description",
                    placeholder: "Write a text"
                }
            }],
            metadata: {
                type: "section",
                display: "fold"
            }
        },
        {
            id: ObjectId(),
            name: "Benefits",
            fields: [{
                id: ObjectId(),
                name: null,
                metadata: {
                    type: "",
                    placeholder: ""
                }
            }],
            metadata: {
                type: "section",
                display: "fold"
            }
        }
    ],
    metadata: {
        editable: true
    }
}

const dataList = (data) => {
    let newData = []
    let section = {
        id: ObjectId(),
        metadata: {
            type: "gridSection",
        },
        fields: [],
    }
    data.fields.forEach(el => {
        console.log(el);
        if (el.name === "Details" || el.name === "Contacts") {
            if (newData.length === 0) {
                section.fields.push(el)
                newData.push(section)
            } else {
                console.log(newData[0]);
                newData[0].fields.push(el)
            }
        }
        if (el.name === "Products" || el.name === "Branches") {
            console.log(el.name);
            newData.push({
                ...el,
                metadata: {
                    ...el.metadata,
                    type: "sectionContainer"
                }
            })
        } else {
            console.log(el);
            newData.push(el)
        }
    })
    console.log(newData, "data")
    return (data)
}