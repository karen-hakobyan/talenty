let ObjectId = () => Math.random().toString()
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