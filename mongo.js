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
                        deletable: false,
                        required: true
                    }
                },
                {
                    _id: ObjectId(),
                    name: "Gender",
                    metadata: {
                        type: "text",
                        maxLength: 100,
                        editable: false,
                        deletable: true,
                        required: false,
                        values: ["MALE", "FEMALE"]
                    }
                },
                {
                    _id: ObjectId(),
                    name: "Social Media",
                    metadata: {
                        "type": "section",
                        "editable": false,
                        "deletable": true,
                        "required": false
                    },
                    fields: [
                        {
                            _id: ObjectId(),
                            name: "Facebook",
                            metadata: {
                                "type": "social_link",
                                "editable": false,
                                "deletable": false,
                                "required": false
                            }
                        },
                        {
                            _id: ObjectId(),
                            name: "Linkedin",
                            metadata: {
                                "type": "social_link",
                                "editable": false,
                                "deletable": false,
                                "required": false
                            }
                        }
                    ]
                },
                {
                    _id: ObjectId(),
                    name: "Expected Salary",
                    metadata: {
                        type: "text",
                        maxlength: 20,
                        editable: false,
                        deletable: false,
                        required: true
                    }
                }
            ]
        }
    ]
}

// noinspection JSUnresolvedVariable
db.templates.insert(systemTemplate);
